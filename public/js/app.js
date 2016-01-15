(function(){

	var app = angular.module('app', ['ui.router']);

	app.constant('moment', moment);
	
	app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("list");

	$stateProvider
	   	.state('list', {
	    	url: "/list?page",
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