//var myApp = angular.module('myApp');
var myApp = angular.module('myApp');


//myApp.controller('CourseController', ['$scope', function($scope){
	
myApp.controller('CoursesController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
	console.log('CoursesController loaded...');

	$scope.testScope = 'module works!';

	$scope.getCourses = function(){
		$http.get('/api/courses').success(function(response){
			console.log('controller getCourses activated');
			$scope.courses = response;
			
		});
	}

	$scope.getCourse = function(){
		var id = $routeParams.id;
		$http.get('/api/courses/'+id).success(function(response){
			$scope.course = response;
			
		});
	}

	$scope.addCourse = function(){
		console.log($scope.course);
		$http.post('/api/courses/', $scope.course).success(function(response){
			window.location.href='#/courses';
		});
	}

	$scope.updateCourse = function(){
		var id = $routeParams.id;
		$http.put('/api/courses/'+id, $scope.book).success(function(response){
			window.location.href='#/courses';
		});
	}

	$scope.removeCourse = function(id){
		$http.delete('/api/courses/'+id).success(function(response){
			window.location.href='#/courses';
		});
	}
}]);