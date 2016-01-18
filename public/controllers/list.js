'use strict'

var ListController = function($http, $stateParams){

	this.currentPage = 0;
	/*this.activeCategory = '';
	this.activeGenre = '';*/

	$http.get('/data/books.json')
	.then(function (books) {
		this.allBooks = books.data;
		this.books = books.data;
	}.bind(this));

	$http.get('/data/pages')
	.then(function (pages) {
		this.allPages = pages.data;
		this.pages = pages.data;
	}.bind(this));

	$http.get('/data/categories')
	.then(function (categories) {
		this.categories = categories.data;
	}.bind(this));

	$http.get('/data/genres')
	.then(function (genres) {
		this.allGenres = genres.data;
		this.genres = genres.data;
	}.bind(this));

	// Advances the pagination to the page matching the value passed //
	this.gotoPage = function(value) {
		this.currentPage = value;
	};

	// Advances to the next page //
	this.nextPage = function() {
		if(this.currentPage < this.pages.length){
			this.currentPage++;
		}
	};

	// Goes back to the previous page //
	this.previousPage = function() {
		if(this.currentPage > 0){
			this.currentPage--;
		}
	};

	// Grabs a category and returns all genres that have that category in common //
	this.filterCategoryGenres = function(value) {
		if(value){

			this.activeCategory = value;

			$http.get('/data/category/' + this.activeCategory)
			.then(function (genres) {
				this.genres = genres.data;
			}.bind(this));

			document.querySelector('#search-books').value = '';
			document.querySelector('#filter-genres').selectedIndex = 0;

			this.books = this.allBooks;
			this.books = this.books.filter(function(book){
				if(book.genre.category === value){
					return book;
				}
			}.bind(this));

			this.currentPage = 0;
			console.log('Filtered', this.books.length, 'by category');
			this.pages = _.chunk(this.books, 24);
		} else {
			this.genres = this.allGenres;
			this.activeCategory = '';
			this.resetPages();
		}
	};

	// Grabs a genre and reverts the category alert to it's default state //
	this.filterGenresCategory = function(value) {
		if(value){
			console.log('Active Genre is', value, 'and Active Category is', this.activeCategory);

			this.activeGenre = value;
			document.querySelector('#search-books').value = '';

			this.books = this.allBooks;
			this.books = this.books.filter(function(book){
				if(book.genre.name === value){
					if(!this.activeCategory){
						return book;
					} else {
						if(this.activeCategory === book.genre.category){
							return book;
						}
					}
				}	
			}.bind(this));

			this.currentPage = 0;
			console.log('Filtered', this.books.length, 'by genre');
			this.pages = _.chunk(this.books, 24);
		} else {
			this.activeGenre = '';
			this.resetPages();
		}
	};

	// Filters the book if the author or name matches the query in the search input //
	this.search = function(query){
		if(query){
			this.books = this.books.filter(function(book){
				if(book.author.name.toLowerCase().indexOf(query) !== -1 || book.name.toLowerCase().indexOf(query) !== -1){
					return book;
				}
			});

			this.currentPage = 0;

			if(this.books.length > 0){
				this.pages = [];
				this.pages[0] = this.books;
			} 

			if(document.querySelector('#search-books').value.length < 2) {
				this.pages = this.allPages;
			}
		} else {
			this.resetPages();
		}
	};

	this.init = function() {
		this.gotoPage(0);
	};

	this.resetPages = function() {
		this.currentPage = 0;
		this.books = this.allBooks;
		this.pages = this.allPages;
	}
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
	});