


//Variables
//Diane - Changed start/end Date names, Added eventType
var startLocation = "SanAntonio,TX";
var endLocation = "houston,tx";
var bingKey = "ArTyrXsq6UDCs9vBFWRd04jO4H8q8Zbf4lhLg8yC8ECyRdGwOn2GVd50DKlIaRWD";
var tmKey = "19BJY9J622QFAQDhJQIFYeYXQPjGUQHU";
var postalCode = "11217";
var latLong = "30.2672,-97.7431";
var today = new Date();

//Set the Form Date to Today Date
document.getElementById("start").setAttribute("value", moment(today).format("YYYY-MM-DD"));
document.getElementById("end").setAttribute("value", moment(today).format("YYYY-MM-DD"));

var directionsEl = document.querySelector("#directions-section");
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
submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    //Saves user input into locat & global variables
    var streetAddress = streetAddressInput.value;
    var city = cityInput.vaule;
    var state = stateInput.value;
    var radius = radiusInput.value;
    //var unitOfMesurment = unitInput.value; //Dont need? we are in the USA
    var startDate = startDateInput.value;
    var endDate = endDateInput.value;
    //eventType = eventTypeInput.value; //DONT SEE MATCHING ITEM ON FORM

    //Forms Start locations based on user input
    startLocation = streetAddress + ", " + city + ", " + state;
    console.log("start locatio " + startLocation);

    //Converts Starting Location to API Readable format
    var startURL = startLocation.replace(/ /g, '%20');

    //Converts Address to latitude & longitude

    var positionStackKey = "5a8b007419bd2956c0662898bcf2606b"
    var positionStackURL = "http://api.positionstack.com/v1/forward?access_key=" + positionStackKey + "&query=" + startURL;

    fetch(positionStackURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    latLong = data['data'][0]['latitude'] + "," + data['data'][0]['longitude'];

                })

            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to latlong API");
        });

    //Calls findEvents
    findEvents(latLong, tmKey, radius);
});







var getDirections = function (startLocation, endLocation, bingKey) {
    // format the bing api url
    var directionArray = [];
    var bingUrl = "http://dev.virtualearth.net/REST/v1/Routes?wayPoint.1=" + startLocation + "&waypoint.2=" + endLocation +
        "&key=" + bingKey;


    // make a get request to url
    fetch(bingUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {
                    var directionsList = (data['resourceSets'][0]['resources'][0]['routeLegs'][0]['itineraryItems'])

                    for (i = 0; i < directionsList.length; i++) {
                        directionArray.push(directionsList[i]['instruction']['text'])

                    }

                    for (var i = 0; i < directionArray.length; i++) {
                        var listItemEl = document.createElement("li");
                        listItemEl.textContent = directionArray[i];
                        directionsEl.appendChild(listItemEl);

                    }
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

    var tmUrl = "https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&size=20&classificationName=music&latlong=" + latLong +
        "&radius=" + radius + "&apikey=" + tmKey;
    var eventObjList = [];



    console.log(tmUrl)


    fetch(tmUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    eventInfo = data['_embedded']['events'];
                    for (var i = 0; i < eventInfo.length; i++) {
                        var eventObj = {
                            'artist name': eventInfo[i]['name'],
                            'venue name': eventInfo[i]['_embedded']['venues'][0]['name'],
                            'date': eventInfo[i]['dates']['start']['localDate'],
                            'url': eventInfo[i]['url'],
                            'address': eventInfo[i]['_embedded']['venues'][0]['address']['line1'] + ' ' +
                                eventInfo[i]['_embedded']['venues'][0]['city']['name'] + ' ' +
                                eventInfo[i]['_embedded']['venues'][0]['state']['stateCode']

                        }
                        eventObjList.push(eventObj)
                    }

                })
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to TicketMaster");
        });
};





