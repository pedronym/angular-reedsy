'use strict'

var ListController = function($http, $stateParams){

	$http.get('/data/books.json')
	.then(function (books) {
		this.books = books.data;
	}.bind(this));

	$http.get('/data/getpage?page=' + ($stateParams.page || 1))
	.then(function (pages) {
		this.currentPage = 0;
		this.page = pages.data;
	}.bind(this));

	$http.get('/data/pages')
	.then(function (pages) {
		this.pages = pages.data;
	}.bind(this));

	$http.get('/data/categories')
	.then(function (categories) {
		this.categories = categories.data;
	}.bind(this));

	$http.get('/data/genres')
	.then(function (genres) {
		this.genres = genres.data;
	}.bind(this));

	this.gotoPage = function(value) {
		$http.get('/data/getpage?page=' + ($stateParams.page || 1))
		.then(function (page) {
			this.currentPage = value;
			this.page = page.data;
		}.bind(this));
	};

	this.nextPage = function() {
		if(this.currentPage < this.pages.length)
			this.currentPage++ ;
		
		return this.currentPage;
	};

	this.previousPage = function() {
		if(this.currentPage > 0)
			this.currentPage-- ;
		
		return this.currentPage;
	};
};

angular.module('app')
	.controller('ListController', ListController)
	.filter('filterByName', function() {
		return function(input, search) {
			if (!search || search.length === 0) {
				return input;
			}

			return input.filter(function(element) {
				return element.name.toLowerCase().indexOf(search) !== -1 ||
						element.author.name.toLowerCase().indexOf(search) !== -1;
			});
		};
	})
	.filter('fromNow', ['moment', function(moment) {
		return function(value) {
			return moment(value).fromNow();
		}
	}]);