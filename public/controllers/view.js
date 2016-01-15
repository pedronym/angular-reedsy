'use strict';

var ViewController = function($stateParams, $http) {
	var id = $stateParams.id;

	$http.get('/data/book/' + id)
	.then(function(book) {
		this.book = book.data[0];
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	});

	$http.get('/data/book/related/' + id)
	.then(function(related) {
		this.related = related.data;
	}.bind(this))
	.catch(function(error) {
		console.log(error);
	});
};

angular.module('app').controller('ViewController', ViewController);