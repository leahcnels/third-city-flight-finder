var apiKey = require('./../.env').apiKey;

Trip = function(origin, departureDate) {
  this.origin = origin;
  this.departureDate = departureDate;
  this.tripResults = [];
};

allTrips = [];
Trip.prototype.getTrips = function(origin, departureDate) {
  var self = this;
  $.get('http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=' + origin + '&departure_date=' + departureDate + '&apikey=' + apiKey).then(function(response) {
    for (i=0; i<response.results.length; i++) {
      self.tripResults.push(response.results[i]);
    }
    allTrips.push(self);
    self.listTrips();
  });
};

Trip.prototype.listTrips = function() {
  var self = this;
  this.tripResults.forEach(function(trip) {
    $("#tripList").prepend('<li>' + self.origin + " to " + trip.destination + " $" + trip.price + '</li>');
  });
  this.compareTrips();
};

Trip.prototype.compareTrips = function() {
  for (i=0; i<allTrips[0].tripResults.length; i++) {
    for (j=0; j<allTrips[1].tripResults.length; j++) {
      if (allTrips[0].tripResults[i].destination === allTrips[1].tripResults[j].destination) {
        var averagePrice = ((parseInt(allTrips[0].tripResults[i].price) + parseInt(allTrips[1].tripResults[j].price)) / 2);
        $("#compare").append('<li>$' + parseInt(averagePrice) + " " + allTrips[0].tripResults[i].destination + '</li>');
      }
    }
  }
};

exports.tripModule = Trip;
