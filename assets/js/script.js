
var startLocation = "austin, tx";
var endLocation = "houston,tx";
var bingKey = "ArTyrXsq6UDCs9vBFWRd04jO4H8q8Zbf4lhLg8yC8ECyRdGwOn2GVd50DKlIaRWD";
var tmKey = "19BJY9J622QFAQDhJQIFYeYXQPjGUQHU";
var postalCode = "11217";
var now = moment().format();
var futureDate = moment().add(10, "day").format();
var latLong = "30.2672,-97.7431";
var radius = 10;
var today = new Date(); 

document.getElementById("start").setAttribute("value",moment(today).format("YYYY-MM-DD"));
document.getElementById("end").setAttribute("value",moment(today).format("YYYY-MM-DD"));

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



var findVenues = function (latLong, tmKey, radius) {
    var tmUrl = "https://app.ticketmaster.com/discovery/v2/venues.json?latlong=" + latLong +
        "&radius=" + radius + "&startDateTime=" + now + "&endDateTime+" + futureDate + "&apikey=" + tmKey;
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
}

getDirections(startLocation, endLocation, bingKey)
findVenues(latLong, tmKey, radius)