var ListController = function($http){

	$http.get('/data/books.json')
	.then(function (books) {
		this.books = books.data;
	}.bind(this));

	$http.get('/data/categories')
	.then(function (categories) {
		this.categories = categories.data;
	}.bind(this));

	$http.get('/data/genres')
	.then(function (genres) {
		this.genres = genres.data;
	}.bind(this));
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