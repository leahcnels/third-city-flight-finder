var apiKey = require('./../.env').apiKey;

Trip = function(origin, departureDate) {
  this.origin = origin;
  this.departureDate = departureDate;
  this.tripResults = [];
};

resultsArray = [];
Trip.prototype.getTrips = function(origin, departureDate) {
  $.get('http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=' + origin + '&departure_date=' + departureDate + '&apikey=' + apiKey).then(function(response) {
    for (i=0; i<response.results.length; i++) {
      resultsArray.push(response.results[i]);
    }
  }).fail(function(error) {
    $('.showPrice').text(error.responseJSON.message);
  });
  this.tripResults = resultsArray;
};

exports.tripModule = Trip;
