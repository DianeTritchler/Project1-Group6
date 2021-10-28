
var startLocation = "austin,tx";
var endLocation = "houston,tx";
var bingKey = "ArTyrXsq6UDCs9vBFWRd04jO4H8q8Zbf4lhLg8yC8ECyRdGwOn2GVd50DKlIaRWD";
var tmKey = "19BJY9J622QFAQDhJQIFYeYXQPjGUQHU";
var postalCode = "11217";
var now = moment().format();
var futureDate = moment().add(10, "day").format();
var latLong = "30.2672,-97.7431";
var radius = 10;
var directionsEl = document.querySelector("#directions-section")

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
                    //console.log(directionArray)
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
    fetch(tmUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    eventInfo = data['_embedded']['events'];
                    for (var i = 0; i < eventInfo.length; i++) {
                        var eventObj = {
                            'name': eventInfo[i]['name'],
                            'date': eventInfo[i]['dates']['start']['localDate'],
                            'url': eventInfo[i]['url'],
                            'address': eventInfo[i]['_embedded']['venues'][0]['address']['line1'] + ' ' +
                                eventInfo[i]['_embedded']['venues'][0]['city']['name'] + ' ' +
                                eventInfo[i]['_embedded']['venues'][0]['state']['stateCode']

                        }
                        eventObjList.push(eventObj)
                    }
                    console.log(eventObjList)
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
findEvents(latLong, tmKey, radius)