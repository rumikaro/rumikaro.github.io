var app = angular.module("myApp", []);

app.controller("mainController", function($scope, $http) {
    $scope.testScope = "angular working";
    
    //get all courses
    $scope.getCourses = function(){
        console.log('controller getCourses activated');        
        $http.get('/api/courses').success(function(response){
            $scope.courses = response;
        });
    };

    //get all students
    $scope.getStudents = function(){
        console.log('controller getStudents activated');        
        $http.get('/api/students').success(function(response){
            $scope.students = response;
        });
    };

	$scope.addCourse = function(){
		console.log($scope.course);
		$http.post('/api/courses/', $scope.course).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.updateBook = function(){
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}

	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	}
});




// myApp.config(function($routeProvider){
// 	$routeProvider.when('/', {
// 		controller:'CoursesController',
// 		templateUrl: 'views/courses.html'
// 	})
// 	.when('/courses', {
// 		controller:'CoursesController',
// 		templateUrl: 'views/courses.html'
// 	})
// 	.when('/courses/details/:id',{
// 		controller:'CoursesController',
// 		templateUrl: 'views/course_details.html'
// 	})
// 	.when('/courses/add',{
// 		controller:'CoursesController',
// 		templateUrl: 'views/add_course.html'
// 	})
// 	.when('/courses/edit/:id',{
// 		controller:'CoursesController',
// 		templateUrl: 'views/edit_course.html'
// 	})
// 	.otherwise({
// 		redirectTo: '/'
// 	});
// });