'use strict'

// Define the controller for the List //
var ListController = function($http, $stateParams){

	// Calls a url that returns all the books from the json file //
	$http.get('/data/books.json')
	.then(function (result) {
		// Sets the books array to two variables //
		this.allBooks = result.data;
		this.books = result.data;

		// Use lodash to split the array into parts - 24 per page //
		this.pages = _.chunk(this.books, 24);
		this.allPages = this.pages;
	}.bind(this));

	// Calls a url that returns all the categories in each book //
	$http.get('/data/categories')
	.then(function (categories) {
		this.categories = categories.data;
	}.bind(this));

	// Calls a url that returns all the genres in each book //
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
		if(this.currentPage < this.pages.length -1){
			this.currentPage++;
		}
		console.log(this.currentPage, this.pages.length - 1);
	};

	// Goes back to the previous page //
	this.previousPage = function() {
		if(this.currentPage > 0){
			this.currentPage--;
		}
	};

	// Grabs a category and returns all genres that have the passed category in common //
	this.filterCategoryGenres = function(value) {
		
		// Empty the search field //
		document.querySelector('#search-books').value = '';

		// Checks to see a value actually exists //
		if(value !== null){
			
			// Saves the value inside a variable // 
			this.activeCategory = value;

			// For each book with the category passed in the value, get all genres that that book has //
			$http.get('/data/category/' + this.activeCategory)
			.then(function (genres) {
				this.genres = genres.data;
			}.bind(this));

			// Filters all the books to only have the ones that match the category //
			this.books = this.allBooks.filter(function(book){
				if(book.genre.category === value){
					return book;
				}
			}.bind(this));

			// Go back to the first page //
			this.gotoPage(0);

			// Split the array into parts for pagination //
			this.pages = _.chunk(this.books, 24);
		} else {
			// Clear the activeCategory //
			this.activeCategory = null;

			// Reset the pages to their initial condition //
			this.resetPages();

			// If there's no category value then revert the genres // 
			this.genres = this.allGenres;

			// Clear the genre select //
			document.querySelector('#filter-genres').selectedIndex = 0;
		}
	};

	// Grabs a genre and reverts the category alert to it's default state //
	this.filterGenresCategory = function(value) {

		// Clears the search field // 
		document.querySelector('#search-books').value = '';

		if(value !== null){

			// Filters all the books to only have the ones that match the genre //
			this.books = this.allBooks.filter(function(book){
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

			// Go back to the first page //
			this.gotoPage(0);

			// Split the array into parts for pagination //
			this.pages = _.chunk(this.books, 24);
		} else {
			// Reset the pages to their initial condition //
			this.resetPages();
		}
	};

	// Filters the book if the author or name matches the query in the search input //
	this.search = function(query){

		this.clearSelects();

		// Filter all books that the author name or book name match the query //
		this.books = this.allBooks.filter(function(book){
			if(book.author.name.toLowerCase().indexOf(query) !== -1 || book.name.toLowerCase().indexOf(query) !== -1){
				return book;
			}
		});

		// Go back to the first page //
		this.gotoPage(0);

		// Go the search //
		if(this.books.length > 0){
			this.pages = [this.books];
		} 

		// If the search field is cleared reset the pages //
		if(document.querySelector('#search-books').value.length < 1) {
			this.resetPages();
		}
	};

	// When the app starts go to the first page //
	this.init = function() {
		this.gotoPage(0);
	};

	// Resets the pagination, pages and books to their initial state //
	this.resetPages = function() {
		this.currentPage = 0;
		this.books = this.allBooks;
		this.pages = this.allPages;

		// Clear the genre select //
		document.querySelector('#filter-genres').selectedIndex = 0;
	};

	// Clear the category and genre selects //
	this.clearSelects = function() {
		document.querySelector('#filter-genres').selectedIndex = 0;
		document.querySelector('#filter-categories').selectedIndex = 0;
	}
};

// Attach the ListController to the app instance //
angular.module('app').controller('ListController', ListController);
	