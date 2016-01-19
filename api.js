'use strict';

var fs    = require('fs'),
	_	  = require('lodash'),
	model = require('./public/data/books');

module.exports = {

	// Returns the books.json file //
	getAll: function() {
		return model;
	},

	// Returns four books with the same category or genre //
	getRelated: function(bookId){
		var shuffled = _.shuffle(this.getAll()),
			selectedBook = this.getBookById(bookId)[0];

		function findRelated(selectedBook, limit){
			var booksFound = 0;
			var relatedBooks = [];
			var relatedBook = shuffled.filter(function(book) {
				if(book.genre.name === selectedBook.genre.name || book.genre.category === selectedBook.genre.category){
					if(booksFound < limit && book.id != selectedBook.id){
						relatedBooks.push(book);
						booksFound++;
					} else {
						return relatedBooks;
					}
				}
			});
			return relatedBooks;
		};

		return findRelated(selectedBook, 4);
	},

	// Returns the book with the matching id by searching the books.json file //
	getBookById: function(bookId){
		var match = this.getAll().filter(function(book) {
			if(book.id === bookId){
				return book;
			}
		});

		return match;
	},

	// Retrieves all categories inside the books.json file and adds them to an array //
	getCategories: function(){
		var categories = [];

		this.getAll().filter(function(book) {
			if(categories.indexOf(book.genre.category) === -1){
				categories.push(book.genre.category);
			}
		});

		categories.sort();
		return categories;
	},

	// Retrieves all genres which match the category passed in a book //
	getCategoryGenres: function(categoryName){
		if(categoryName === 'null'){
			return this.getGenres();
		}

		var genres = [];

		this.getAll().filter(function(book) {
			if(book.genre.category === categoryName && genres.indexOf(book.genre.name) < 0){
				genres.push(book.genre.name);
			}
		});

		genres.sort();
		return genres;
	},

	// Retrieves all categories which match the genre passed in a book //
	getGenreCategories: function(genreName){
		if(genreName === 'null'){
			return this.getCategories();
		}

		var categories = [];

		this.getAll().filter(function(book) {
			if(book.genre.name === genreName && categories.indexOf(book.genre.category) < 0){
				categories.push(book.genre.category);
			}
		});

		categories.sort();
		return categories;
	},

	// Retrieves all genres inside the books.json file and adds them to an array //
	getGenres: function(){
		var genres = [];

		this.getAll().filter(function(book) {
			if(genres.indexOf(book.genre.name) === -1){
				genres.push(book.genre.name);
			}
		});

		genres.sort();
		return genres;
	}
}
