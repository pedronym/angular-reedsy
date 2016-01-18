(function(){

	var app = angular.module('app', ['ui.router']);

	app.constant('moment', moment);
	
	app.filter('fromNow', ['moment', function(moment) {
		return function(value) {
			return moment(value).fromNow();
		}
	}]);

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