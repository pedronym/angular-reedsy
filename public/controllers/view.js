'use strict';

// Define the controller for the view //
var ViewController = function($stateParams, $http) {
	
	// Retrieves the id passed in the url //
	var id = $stateParams.id;

	// Request the corresponding book data to the server //
	$http.get('/data/book/' + id)
	.then(function(result) {
		this.book = result.data[0];
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	});

	// Request 4 related books to the server //
	$http.get('/data/book/related/' + id)
	.then(function(related) {
		this.related = related.data;
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	});
};

// Attach the ViewController to the app instance //
angular.module('app').controller('ViewController', ViewController);