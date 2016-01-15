var express = require('express'),
	app 	= express(),
	fs		= require('fs'),
	_ 		= require('lodash'),
	path	= require('path'),
	API		= require('./api.js');

app.use(express.static('public'));

// Initial Route - Serves the index.html file //
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/data/books.json', function (req, res) {
	res.status(200).json(API.getAll());
});

app.get('/data/getpage', function(req, res){
	res.status(200).send(API.getPage(req.query.page));
});

app.get('/data/pages', function(req, res){
	res.status(200).send(API.getAllPages());
});

app.get('/data/book/:id', function(req, res) {
	res.status(200).send(API.getBookById(req.params.id));
});

app.get('/data/categories', function(req, res) {
	res.status(200).send(API.getCategories());
});

app.get('/data/genres', function(req, res) {
	res.status(200).send(API.getGenres());
});

app.get('/data/book/related/:id', function(req, res) {
	res.status(200).send(API.getRelated(req.params.id));
});

app.get('/data/category/:name', function(req, res) {
	res.status(200).send(API.getCategory(req.params.name));
});

app.listen(3000, function () {
  console.log('Reedsys Angular - Running on port 3000');
});