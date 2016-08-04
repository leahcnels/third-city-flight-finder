(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "DLsCz4euWMnUWA3rHC2f7amNR030WpjP";

},{}],2:[function(require,module,exports){
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
    $("#tripList").append('<li>' + self.origin + " to " + trip.destination + " $" + trip.price + '</li>');
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
  });

  $("#outbound").click(function(event) {
    $("#tripList").toggle();
  })
});

},{"./../.env":1,"./../js/trip.js":2}]},{},[3]);
