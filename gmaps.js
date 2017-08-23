var latAvg;
var lngAvg;
var map;
var service;
var infowindow;
    var activity;

function findmidpoint() {
  latAvg = (parseFloat(document.getElementById("lat").getAttribute("value")) + parseFloat(document.getElementById("lat1").getAttribute("value")))/2;
  lngAvg = (parseFloat(document.getElementById("long").getAttribute("value")) + parseFloat(document.getElementById("long1").getAttribute("value")))/2;
  var midpoint = new google.maps.LatLng(latAvg, lngAvg);

  var marker3 = new google.maps.Marker({
    position: {lat: latAvg, lng: lngAvg},
    map: map,
    icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
  });

  map.setZoom(15);
  map.setCenter(marker3.getPosition());

  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);

  if (activity === "Restaurants") {
    service.nearbySearch({
    location: midpoint,
    radius: '500',
    type: ['restaurant']
      }, callback);
  } else if (activity === "Movies") {
    service.nearbySearch({
    location: midpoint,
    radius: '500',
    type: ['movie_theater']
      }, callback);
  } else if (activity === "Shopping") {
    console.log("shopping");
    service.nearbySearch({
    location: midpoint,
    radius: '500',
    type: ['clothing_store']
      }, callback);
  }


}

function callback(results, status, pagination) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
    if (pagination.haxNextPage) {
      var moreButton = document.getELementById("more");

      moreButton.addEventListener("click", function() {
        moreButton.disabled = true;
        pagination.nextPage();
      });
    }

  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;

  var placesList = document.getElementById("places");

  var bounds = new google.maps.LatLngBounds();

  // var image = {
  //   url: place.icon,
  //   size: new google.maps.Size(71, 71),
  //   origin: new google.maps.Point(0, 0),
  //   anchor: new google.maps.Point(17, 34),
  //   scaledSize: new google.maps.Size(25, 25)
  // }

  var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
  });

  placesList.innerHTML += "<li>" + place.name + "</li>";
  bounds.extend(place.geometry.location);
  //map.fitBounds(bounds);
}


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 40.7128, lng: -74.0059}
  });

  google.maps.event.addDomListener(window, 'load', initialize);
}

$(document).ready(function() {
$("#aboutpage").hide();
  $("#findmid").click(function() {
    $("#aboutpage").hide();
      $("#container").show();
      $("#title").show();
  });

  $("#about").click(function() {
      $("#container").hide();
      $("#aboutpage").show();
      $("#title").hide();
  });

    $("#activityButton").click(function() {
      activity = $('#activitySelect').find(":selected").text();
    });

});



