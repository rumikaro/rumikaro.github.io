var myApp = angular.module('myApp');
console.log('TestView activated');

myApp.controller('TestView', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('TestView loaded...');

	$scope.testAngularController = 'test success!!!!'
	
}]);