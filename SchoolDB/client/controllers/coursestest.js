var app = angular.module('myApp', []);

app.controller('coursesTest', function($scope) {
    $scope.testScope = "angular working";

    $scope.getCourses = function(){
		$http.get('/api/courses').success(function(response){
			console.log('controller getCourses activated');
			$scope.courses = response;
        });
    };

});
