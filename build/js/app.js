(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "DLsCz4euWMnUWA3rHC2f7amNR030WpjP";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/trip.js":2}]},{},[3]);
