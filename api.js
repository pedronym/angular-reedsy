'use strict';

var fs    = require('fs'),
	_	  = require('lodash'),
	model = require('./public/data/books');

module.exports = {

	// Returns the books.json file //
	getAll: function() {
		return model;
	},

	// Returns three books with the same category or genre //
	getRelated: function(bookId){
		var relatedBooks = [];
		
		var selectedBook = this.getAll().filter(function(book) {
			if(book.id === bookId){
				return book;
			}
		});
		
		selectedBook = selectedBook[0];
		var shuffled = _.shuffle(model);

		function findRelated(selectedBook, limit){
			var booksFound = 0;
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

	getCategory: function(categoryName){
		var categories = [];

		this.getAll().filter(function(book) {
			if(categories.indexOf(book.genre.category) === -1 || book.genre.category === categoryName){
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
	},

	// Retrieves all pages evenly split in an array //
	getAllPages: function(){
		var chunked = _.chunk(this.getAll(), 12);
		return chunked;
	},

	// Retrieves a specific page from the chunked array //
	getPage: function(pageNumber){
		var chunked = _.chunk(this.getAll(), 12);
		return chunked[pageNumber];
	}
}
