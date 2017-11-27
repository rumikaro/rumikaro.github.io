// var myApp = angular.module('myApp',['ngRoute']);

var myApp = angular.module('helloworld', ['ui.router']);

myApp.config(['$stateProvider', function($stateProvider, $urlRouteProvider){
	$stateProvider
	.state('header', {
		template: '/views/header.html'
	})


}]);

// myApp.config(function($routeProvider){
// 	$routeProvider.when('/', {
// 		controller:'Main',
// 		templateUrl: 'views/test.html'
// 	})
// 	.when('/books', {
// 		controller:'BooksController',
// 		templateUrl: 'views/books.html'
// 	})
// 	.when('/books/details/:id',{
// 		controller:'BooksController',
// 		templateUrl: 'views/book_details.html'
// 	})
// 	.when('/books/add',{
// 		controller:'BooksController',
// 		templateUrl: 'views/add_book.html'
// 	})
// 	.when('/books/edit/:id',{
// 		controller:'BooksController',
// 		templateUrl: 'views/edit_book.html'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	});
// });