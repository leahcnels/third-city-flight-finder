var Trip = require('./../js/trip.js').tripModule;
var apiKey = require('./../.env').apiKey;

$(function() {
  $('#submit-trip').submit(function(event) {
    event.preventDefault();
    $("#tripOneList").empty();
    $("#tripTwoList").empty();
    var tripOneOrigin = $('#tripOneOrigin').val();
    var tripTwoOrigin = $('#tripTwoOrigin').val();
    var departureDate = $('#departureDate').val();
    var tripOne = new Trip(tripOneOrigin, departureDate);
    var tripTwo = new Trip(tripTwoOrigin, departureDate);
    tripOne.getTrips(tripOneOrigin, departureDate);
    tripTwo.getTrips(tripTwoOrigin, departureDate);
    tripOne.compareTrips(tripTwo);
  });
});
