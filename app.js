var express = require('express'),
	app 	= express(),
	fs		= require('fs'),
	_ 		= require('lodash'),
	path	= require('path');

app.use(express.static('public'));

// Initial Route - Serves the index.html file //
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Returns the books.json file //
app.get('/data/books.json', function (req, res) {
	res.status(200).json(path.join(__dirname+'/public/data/books.json'));
});

app.get('/data/pages', function(req, res){
	var books = JSON.parse(fs.readFileSync('public/data/books.json'));
	var pages = _.chunk(books, 12);
	res.status(200).send(pages);
});

// Returns the book with the matching id by searching the books.json file //
app.get('/data/book/:id', function(req, res) {
	var books = JSON.parse(fs.readFileSync('public/data/books.json'));

	var book = books.filter(function(book) {
		return book.id === req.params.id;
	});

	res.status(200).json(book[0]);
});

// Retrieves all categories inside the books.json file and adds them to an array //
app.get('/data/categories', function(req, res) {
	var books = JSON.parse(fs.readFileSync('public/data/books.json'));
	var categories = [];

	books.filter(function(book) {
		if(categories.indexOf(book.genre.category) === -1){
			categories.push(book.genre.category);
		}
	});

	categories.sort();
	res.status(200).send(categories);
});

// Retrieves all genres inside the books.json file and adds them to an array //
app.get('/data/genres', function(req, res) {
	var books = JSON.parse(fs.readFileSync('public/data/books.json'));
	var genres = [];

	books.filter(function(book) {
		if(genres.indexOf(book.genre.name) === -1){
			genres.push(book.genre.name);
		}
	});

	genres.sort();
	res.status(200).send(genres);
});

app.listen(3000, function () {
  console.log('Reedsys Angular - Running on port 3000.');
});