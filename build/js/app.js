(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "DLsCz4euWMnUWA3rHC2f7amNR030WpjP";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../.env":1,"./../js/trip.js":2}]},{},[3]);
