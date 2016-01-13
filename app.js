var express = require('express'),
	app 	= express(),
	fs		= require('fs'),
	path	= require('path');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/data/books.json', function (req, res) {
	res.status(200).json(path.join(__dirname+'/public/data/books.json'));
});

app.get('/data/book/:id', function(req, res) {
	var books = JSON.parse(fs.readFileSync('public/data/books.json'));

	var book = books.filter(function(book) {
		return book.id === req.params.id;
	});

	res.status(200).json(book[0]);
});

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
  console.log('Server running on port 3000.');
});