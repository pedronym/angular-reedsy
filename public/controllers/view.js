'use strict';

var ViewController = function($stateParams, $http) {
	var id = $stateParams.id;

	$http.get('/data/book/' + id)
		.then(function(book) {
			this.book = book.data;
		})
		.catch(function(error) {
			console.log(error);
		});
};

ViewController.$inject = ['$stateParams', '$http'];

angular.module('app').controller('ViewController', ViewController);