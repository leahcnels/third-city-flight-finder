var apiKey = require('./../.env').apiKey;

Trip = function(origin, departureDate) {
  this.origin = origin;
  this.departureDate = departureDate;
  this.tripResults = [];
};

Trip.prototype.listTrips = function() {
  var self = this;
  this.tripResults.forEach(function(trip) {
    $("#tripList").append('<li>' + self.origin + " to " + trip.destination + " $" + trip.price + '</li>');
  });
};

Trip.prototype.getTrips = function(origin, departureDate) {
  var self = this;
  $.get('http://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?origin=' + origin + '&departure_date=' + departureDate + '&apikey=' + apiKey).then(function(response) {
    for (i=0; i<response.results.length; i++) {
      self.tripResults.push(response.results[i]);
    }
    console.log("inside got trips", self.tripResults.length);
    self.listTrips();
  });
};

Trip.prototype.compareTrips = function(otherTrip) {
  pricesArray = [];
  for (i=0; i < this.tripResults.length; i++) {
    for (j=0; j < otherTrip.tripResults.length; j++) {
      if (this.tripResults[i].destination === otherTrip.tripResults[j].destination) {
        pricesArray.push(this.tripResults[i].destination + ":" + ((parseInt(this.tripResults[i].price) + parseInt(otherTrip.tripResults[j].price)) / 2));
      }
    }
  }
  pricesArray.forEach(function(price) {
    $("#compare").append('<li>' + price + '</li>');
  });
};

exports.tripModule = Trip;
