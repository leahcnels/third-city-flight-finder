var Trip = require('./../js/trip.js').tripModule;
var apiKey = require('./../.env').apiKey;

$(function() {
  $('#submit-trip').click(function(event) {
    event.preventDefault();
    var origin = $('#origin').val();
    var departureDate = $('#departure-date').val();
    var newTrip = new Trip(origin, departureDate);
    newTrip.getTrips(origin, departureDate);
    newTrip.tripResults.forEach(function(trip) {
      $("#showPrice").append('<li>' + trip.destination + " $" + trip.price + '</li>')
    });
  });
});
