
//Variables
//Diane - Changed start/end Date names, Added eventType
var startLocation = "San Antonio, TX";
var endLocation = "houston,tx";
var bingKey = "ArTyrXsq6UDCs9vBFWRd04jO4H8q8Zbf4lhLg8yC8ECyRdGwOn2GVd50DKlIaRWD";
var tmKey = "19BJY9J622QFAQDhJQIFYeYXQPjGUQHU";
var postalCode = "11217";
var startDate = moment().format();
var endDate = moment().add(10, "day").format();
var latLong = "30.2672,-97.7431";
var radius = 10;
var unitOfMesurment = "mi";
var eventType = "Music";

//Form Input/Button
//Diane - Need to make sure these ID's match HTML
var submitButton = document.querySelector("#submitBtn");
var streetAddressInput = document.querySelector("#streetAddress");
var cityInput = document.querySelector("#city");
var stateInput = document.querySelector("#state");
var radiusInput = document.querySelector("#mileage");
//var unitInput = document.querySelector("#unit"); // DONT SEE THIS ON THE FORM
var startDateInput = document.querySelector("#start");
var endDateInput = document.querySelector("#end");
//var eventTypeInput = document.querySelector("#event-type"); //DONT SEE THIS ON THE FORM


//Form Event Listener - Saves user input
submitButton.addEventListener("click",function(event){
    event.preventDefault();
    
    //Saves user input into locat & global variables
    var streetAdress = streetAddressInput.value;
    var city = cityInput.vaule;
    var state = stateInput.value;
    radius = radiusInput.value; 
    //unitOfMesurment = unitInput.value; //Dont need? we are in the USA
    startDate = startDateInput.value;
    endDate = endDateInput.value;
    //eventType = eventTypeInput.value; //DONT SEE MATCHING ITEM ON FORM

    //Forms Start locations based on user input
    startLocation = streetAdress + ", " + city + ", " + state;

    //Converts Address to latitude & longitude
    

    //Calls findEvents
    findEvents(latLong, tmKey, radius);
});


var getDirections = function (startLocation, endLocation, bingKey) {
    // format the bing api url
    var bingUrl = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=" + startLocation + "&waypoint.2=" + endLocation +
        "&key=" + bingKey;

    // make a get request to url
    fetch(bingUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    console.log(data['resourceSets'][0]['resources'][0])
                })

            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Bing");
        });
};



var findEvents = function (latLong, tmKey, radius) {
    var tmUrl = "https://app.ticketmaster.com/discovery/v2/venues.json?latlong=" + latLong +
       "&radius=" + radius + "&startDateTime=" + startDate + "&endDateTime+" + endDate + "&apikey=" + tmKey;

    console.log(tmUrl)

    fetch(tmUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    console.log(data['_embedded']['venues'])
                })

            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to TicketMaster");
        });
};



getDirections(startLocation, endLocation, bingKey);


