'use strict';

var ViewController = function($stateParams, $http) {
	var id = $stateParams.id;

	$http.get('/data/book/' + id)
		.then(function(book) {
			console.table(book.data);
			this.book = book.data;
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		});

	$http.get('/data/book/related/' + id)
		.then(function(related) {
			console.table(related.data);
			this.related = related.data;
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		});
};

ViewController.$inject = ['$stateParams', '$http'];

angular.module('app').controller('ViewController', ViewController);