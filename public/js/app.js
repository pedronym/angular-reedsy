(function(){

	// App Init //
	var app = angular.module('app', ['ui.router']);

	// Add moment.js alias to the app //
	app.constant('moment', moment);

	// Define fromNow custom filter //
	app.filter('fromNow', ['moment', function(moment) {
		return function(value) {
			return moment(value).fromNow();
		}
	}]);

	app.filter('filterByName', function() {
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

	// Configures the app's routes and states //
	app.config(function($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("list");

		$stateProvider
		   	.state('list', {
		    	url: "/list",
		     	controller: 'ListController',
		     	controllerAs: 'list',
		     	templateUrl: "views/list.html"
		   	})
		   	.state('view', {
		   		url: "/view/:id",
		   		controller: 'ViewController',
		   		controllerAs: 'view',
		   		templateUrl: "views/view.html"
		   });
	});
})();