//var app = angular.module("myApp", ["ngRoute"]);
//var app = angular.module("myApp", []);



//var app = angular.module('myApp', ['ui.router']);


angular.module('myApp', ['ui.router', 'ngFileUpload']);

var app = angular.module('myApp');

app.run(function($rootScope) {
	$rootScope.$on("$stateChangeError", console.log.bind(console));
  });

app.config(function($stateProvider, $urlRouterProvider) {

	//$urlRouterProvider.when('/', '/home');	
    $urlRouterProvider.otherwise('/');

    $stateProvider


	.state('root', {
		// url: '/default', - no url needed at all, but could be
		//url:'/',
		abstract: true,
		views:{
			'@' : { 
				templateUrl: '/views/main.html',
				controller: 'mainController',
			},
	
			'header@root': {
				templateUrl: '/views/header.html',
				controller: function($scope){}
			},
			'studentsList@root': {
				templateUrl: '/views/studentsList.html',
				controller: 'StudentsController'
			},
			'coursesList@root': {
				templateUrl: '/views/coursesList.html',
				controller: 'CoursesController2'
			},
			// 'dynamic@root':{
			// 	templateUrl: '/views/test.html',
			// 	controller: 'mainController'
			// }
			
		}
	})

	// resolve: {
	// 	userIsOk: ['$http', '$rootScope', function($http, $rootScope){
	// 		return $http.post('/login', $rootScope.user).then(function(response){
	// 			console.log(response.data);
	// 			return response.data;
	// 		})
	// 	}]
	// }

	.state('root.dynamic', {
		//abstract: true,
		//parent: 'root',
		url:'/',
		views: {
			'' : { 
				templateUrl: '/views/dynamicZone.html',
				//controller: 'mainController',
			},
			// 'dynamic2@root.dynamic':{
			// 	templateUrl: '/views/testdinamic2.html',				
			// },
			'dynamic@root': {
				templateUrl: '/views/testdynamic.html',				
			},

		}
	})

	.state('root.dynamic.test7',{
		//parent: 'root.dynamic',
		url:'/test78',
		views: {
			'dynamic2@root.dynamic':{
				templateUrl: '/views/test5.html',				
			},

		}
	})

	.state('test6', {
		parent: 'root.dynamic',
		url:'/test6',
		views: {
			'dynamic2@root.dynamic' : { 
				templateUrl: '/views/test5.html',
				//controller: 'mainController',
			}
		}
	
	})

	.state('root.dynamic.test5', {
		url:'/test5',
		views: {
			'dynamic@root' : { 
				templateUrl: '/views/test5.html',
				//controller: 'mainController',
			}
		}
		//templateUrl: '/views/test4.html'		

	})

	// .state('root.test2', {
	// 	url:'/test2',
	// 	templateUrl: '/views/test2.html',
	// })

	.state('root.test3', {
		url:'/test3',
		views: {
			'' : { 
				templateUrl: '/views/test2.html',
				//controller: 'mainController',
			},
			'dynamic' : { 
				templateUrl: '/views/test3.html',
				//controller: 'mainController',
			}
		}
	})

	.state('root.login', {
		url:'/users/login',
		templateUrl: '/views/login.html',
		controller: 'UserAuthenticatation'
	})

	// .state('root.test', {
	// 	url: '/test2',
	// 	templateUrl: '/views/testView.html',
	// 	controller: 'testController',
	// 	resolve: {
	// 		promiseObj:  function($http, $rootScope){
	// 			// $http returns a promise for the url data
	// 			return $http({method: 'POST', data:$rootScope.user, url: '/login2'});
	// 		 },
	// 	  }
	// })

	.state('root.courseDetails', {
		url: '/course/:courseId',
		templateUrl: '/views/courseDetails.html',
		controller: 'CoursesController2'
	})

	.state('root.courseEdit', {
		url: '/course/:courseId/edit',
		templateUrl: '/views/courseEdit.html',
		controller: 'CoursesController2'
	})

	.state('root.studentDetails',{
		url:'/student/:studentId',
		templateUrl: '/views/studentDetails.html',
		controller: 'StudentsController'	
	})

	.state('root.studentEdit', {
		url: '/student/:studentId/edit',
		controller: 'StudentsController',
		templateUrl: '/views/studentEdit.html',								
		// resolve: {
		// 	checkUserA: $scope.checkUser($location, $rootScope)
		// }
	})

	// .state('root.studentEdit', {
		
	// 	url: '/student/:studentId/edit',
	// 	templateUrl: '/views/studentEdit.html',
	// 	controller: 'StudentsController'
	// })

	.state('root.newStudent', {
		url: '/student/new',
		templateUrl: '/views/studentEdit.html',
		controller: 'StudentsController'		
	})

	// .state('root.home', {
	// 	url: '/',
	// 	'dynamicZone@root':{
	// 		templateUrl: '/views/login.html',
	// 		controller: function($scope){}
	// 	}
	// })

	// .state('root.testViews',{
	// 	url:'/testviews',
	// 	views:{
	
	// 		'dynamicZone@testViews': {
	// 			templateUrl: '/views/testView.html',
	// 			parent: 'root.dynamicZone',
	// 			controller: function($scope){}

	// 		}
	// 	}
	// })
	


});

// app.service('checkUser', function($location, $rootScope) {
	
// 	$http.post('/login', $rootScope.user).success(function(response){
// 		console.log(response);
// 		//$scope.course = response;
// 		//create a student object
// 		if(response.success == false){
// 			$location.path('/user/login');						
// 		}


// 	});
		
	
// });

app.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;
	
			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

app.controller('testController', ['$scope', '$http', function($scope, $http){
	$scope.testControllerVar = 'hello to you!';
	$rootScope.user = {}
}]);

app.controller('UserAuthenticatation', ['$rootScope', '$scope', '$http', '$location', '$stateParams', function($rootScope, $scope, $http, $location, $stateParams){
	//var username = $scope.user.username;
	//var password = $scope.user.password;
	
	$scope.showActivationMessage = function(){
		console.log('authenticateUser controller activated');
	}

	$scope.authenticateUser = function(){
		console.log($scope.user);
		console.log('authenticateUser activated');
		$http.post('/login', $scope.user).success(function(response){
			console.log('user logged in successfuly');
			console.log(response);
			//window.location.href='#/courses';
			//$location.path('/course/' + courseId);	//show course details screen				
		});
	}
}]);

app.controller('mainController', ['$rootScope', '$scope', '$http', '$location', '$stateParams', function($rootScope, $scope, $http, $location, $stateParams){
	// var vm = this;
	// $rootScope.userIsOk = userIsOk;

	$scope.goto = function(path){
		console.log(path);
		$location.path(path);
	};
	//redirect to course details page 
	$scope.showCourseDetails = function(courseId){
		//var courseId = x._id;
		console.log('id:' + courseId );
		$location.path('/course/' + courseId);		
	}

	$scope.showStudentDetails = function(studentId){
		//var courseId = x._id;
		console.log('id:' + studentId );
		$location.path('/student/' + studentId);		
	}

	$scope.showNewStudentScreen = function(){
		$location.path('/student/new');				
	}
	// $rootScope.imageUpload() = function(){
	// 	$http.post('/upload').success(function(response){
	// 		console.log('image uploaded')
	// 	});
	// }
}])

app.controller('CoursesController2', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'Upload', function($rootScope, $scope, $http, $location, $stateParams, Upload){
	console.log('CoursesController loaded...');

	$scope.testScope = 'module works!';

	$scope.getCourses = function(){
		$http.get('/api/courses').success(function(response){
			console.log('controller getCourses activated');
			$rootScope.allCourses = response;			
			//$scope.courses = response;
		});
	};

	$scope.getCourseDetails = function(){
		var id = $stateParams.courseId
		//var id = $routeParams.id;
		$http.get('/api/courses/'+id).success(function(response){
			//$scope.course = response;
			//create a student object
			$scope.course = {
				_id: $stateParams.courseId,
				name: response.name,
				image: response.image,
				description: response.description,
				students: []
			};
			console.log($scope.course);

		});
	};

	$scope.getCourseRegistrations = function(){
		var id = $stateParams.courseId		
		//get registrations for current course
		$http.get('/api/course/' + id + '/students').success(function(response){
			$scope.courseRegistrations = response;
			$scope.numberOfStudentsInCourse = response.length;
			console.log($scope.courseRegistrations);
		});
	}

	$scope.addCourse = function(){
		console.log($scope.course);
		$http.post('/api/courses/', $scope.course).success(function(response){
			//window.location.href='#/courses';
			$location.path('/course/' + courseId);	//show course details screen				
		});
	};

	$scope.showCourseEdit = function(courseId){
		//var courseId = x._id;
		//var id = $stateParams.courseId;
		//var courseId = course._id;				
		console.log('id:' + courseId );
		$location.path('/course/' + courseId + '/edit');		
	}

	$scope.updateCourse = function(){

		///
		// var id = $stateParams.studentId;
		// console.log($scope.courseSelectionList);
		// var selectedCourses = $filter('filter')($scope.courseSelectionList, {checked: true});
		// $scope.student.courses = selectedCourses;
		// console.log('student details:')
		// console.log($scope.student);
		// //update student details
		// $http.put('/api/students/'+id, $scope.student).success(function(response){
		// 	window.location.href='#/students';
		// });
		///

		var id = $stateParams.courseId;
		$http.put('/api/courses/'+id, $scope.course).success(function(response){
			//window.location.href='#/courses';
			$scope.getCourses(); //update courses list			
			$location.path('/course/' + id);	//return to course details screen				
			
		});
	};

	$scope.removeCourse = function(id){
		$http.delete('/api/courses/'+id).success(function(response){
			window.location.href='#/courses';
		});
	}

	////FILE UPLOAD////
	//FILE UPLOAD FUNCTIONS///////////////////////////////////////
	$scope.uploadCourseImage = function(files) {
		var fd = new FormData();
		//Take the first selected file
		fd.append("profileImage", files[0]);
		console.log(fd);
		$http.post('/imageupload', fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).success(function(response){
			console.log("image uploaded successfully");
			console.log(response.path); 
			$scope.course.image=response.path;
		}).error(console.log('error'));
	
	};
}]);

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//					STUDENT CONTROLLER
/////////////////////////////////////////////////////////////////////////////////////////////////////////

app.controller('StudentsController', ['$rootScope','$scope', '$http', '$location', '$stateParams', '$filter', 'Upload', function($rootScope, $scope, $http, $location, $stateParams, $filter, Upload){
	console.log('StudentsController loaded...');

	//$scope.testScope = 'module StudentsController works!';
	$scope.checkUser = function($location, $rootScope) {
		
		$http.post('/login', $rootScope.user).success(function(response){
			console.log(response);
			//$scope.course = response;
			//create a student object
			if(response.success == false){
				$location.path('/user/login');						
			}
	
	
		});
			
		
	};

	//get all students from server
	$scope.getStudents = function(){
		$http.get('/api/students').success(function(response){
			console.log('controller getCourses activated');
			//$scope.students = response;
			$rootScope.allStudents = response;
		});
	}

	//get details of a selected student
	$scope.getStudentDetails = function(){
		$scope.student = {
			_id: null,
			name: null,
			image: null,
			phone: null,
			email: null,
			courses: []
		};

		var id = $stateParams.studentId;
		console.log(id);
		//create an empty student object if id doesnt exist
		// if (id == undefined){
		// 	$scope.student = {
		// 		_id: null,
		// 		name: null,
		// 		image: null,
		// 		phone: null,
		// 		email: null,
		// 		courses: []
		// 	};
		// }

		//if id exists, get student data from server
		if (id){
			$http.get('/api/students/'+id).success(function(response){
				
				//create a student object
				$scope.student = {
					_id: $stateParams.studentId,
					name: response.name,
					image: response.image,
					phone: response.phone,
					email: response.email,
					courses: []
				};
				console.log($scope.student);
				//$scope.getStudentRegistrations();
				//get courses registrations for student

				//$scope.getStudentRegistrations();

			});

			//get student registrations
			$http.get('/api/students/' + id + '/courses').success(function(response){
				let courseObjects = response;
				let courseIds = courseObjects.map(function(course) {return course._id;});
				$scope.student.courses = courseIds;
			});

		}
		

	}

	$scope.getStudentRegistrations = function(){
		var id = $stateParams.studentId;
		if(id){
			$http.get('/api/students/' + id + '/courses').success(function(response){
				let courseObjects = response;
				let courseIds = response.map(function(course) {return course._id;});
				$scope.student.courses = courseIds;
			});
		}		
	}

	//exists checks if an item exists in an array
	$scope.exists = function (item, list) {
		return list.indexOf(item) > -1;
	};

	//toggle adds an item to array if item is checked, and remove it from array if item is unchecked
	$scope.toggle = function (item, list) {
		var idx = list.indexOf(item);
		if (idx > -1) {
		  list.splice(idx, 1);
		}
		else {
		  list.push(item);
		}
	};
	// $scope.checkCourse = function(courseId){
	// 	let check = $scope.student.courses.find(courseId);
	// 	return check;
	// }

	$scope.checkCoursesForStudent = function(){
		var id = $stateParams.studentId;		
		//get registrations for current course
		$http.get('/api/students/' + id + '/courses').success(function(response){
			//var allCourses = $rootScope.allCourses;
			//var courseCheckbox = [];
			//get course list values for edit screen
			$scope.courseSelectionList = $rootScope.allCourses;
			console.log($scope.courseSelectionList);
			$scope.courseSelectionList.forEach(function(course) {
				let id = course._id;
				response.forEach(function(studentRegisterdCourse){
					if (course._id == studentRegisterdCourse.course){
						course.checked = true;						
					}
					
				});

			});
			// allCourses.forEach(function(response) {
			// 	courseCheckbox.push({
			// 		_id: this._id,
			// 		name: this.name,
			// 		checked: response.some(function(element, index, array){
			// 			element._id == this.id;
			// 		})
			// 	});
			// }, this);
			$scope.courseCheckbox = courseCheckbox;
		});
	}

	//get course registration of a selected stuent
	$scope.getStudentRegistrations = function(){
		var id = $stateParams.studentId		
		//get registrations for current course
		$http.get('/api/students/' + id + '/courses').success(function(response){
			$scope.studentRegistrations = response;
			//$scope.numberOfCoursesForStudent = response.length;
			//console.log($scope.courseRegistrations);
		});
	}

	//saveStudent checks if student is new or exists
	$scope.saveStudent = function(){
		var id = $stateParams.studentId;		
		if (id == undefined){
			$scope.addStudent();
		}
		else{
			$scope.updateStudent()
		}
	}

	//add new students to the database
	$scope.addStudent = function(){
		console.log($scope.student);
		$http.post('/api/students/', $scope.student).success(function(response){
			console.log('created a new student' + response._id);
			window.location.href='#/students';
		});
	}

	$scope.showStudentEdit = function(studentId){				
		//console.log('id:' + studentId );
		$location.path('/student/' + studentId + '/edit');	
	}


	$scope.updateStudent = function(){
		var id = $stateParams.studentId;
		//console.log($scope.courseSelectionList);
		//var selectedCourses = $filter('filter')($scope.courseSelectionList, {checked: true});
		//$scope.student.courses = selectedCourses;
		//console.log('student details:')
		//console.log($scope.student);
		//update student details
		$http.put('/api/students/'+id, $scope.student).success(function(response){
			//window.location.href='#/students';
			$scope.getStudents() //update students list			
			$location.path('/student/' + id);	//return to student details screen	
		});
		//update course registrations for student
		// $http.put('/api/students/'+id+'/courses', $scope.student).success(function(response){
		// 	window.location.href='#/students';
		// });
	}

	$scope.removeStudent = function(id){
		$http.delete('/api/students/'+id).success(function(response){
			window.location.href='#/students';
		});
	}

	//FILE UPLOAD FUNCTIONS///////////////////////////////////////
	$scope.uploadImage = function(files) {
		var fd = new FormData();
		//Take the first selected file
		fd.append("profileImage", files[0]);
		console.log(fd);
		$http.post('/imageupload', fd, {
			withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).success(function(response){
			console.log("image uploaded successfully");
			console.log(response.path); 
			$scope.student.image=response.path;
		}).error(console.log('error'));
	
	};

	// $scope.uploadFile = function(files) {
	// 	var fd = new FormData();
	// 	//Take the first selected file
	// 	fd.append("file", files[0]);
	
	// 	$http.post('/upload', fd, {
	// 		withCredentials: true,
	// 		headers: {'Content-Type': undefined },
	// 		transformRequest: angular.identity
	// 	}).success(console.log(' ...all right!... ')).error(console.log(' ...file upload not working... '));
	
	// };
	$scope.onFileSelect = function($files) {
		console.log('onFileSelect activated')
		Upload.upload({
		  url: '/upload',
		  file: $files,            
		}).progress(function(e) {
			console.log('in progress');
		}).then(function(data, status, headers, config) {
		  // file is uploaded successfully
		  console.log(data);
		});
	};

	$scope.uploadFile = function(){
		
		var file = $scope.myFile;
		//var uploadUrl = "/multer";
		var uploadUrl = "/imageupload";
		var fd = new FormData();
		//fd.append('file', file);
		fd.append('profileImage', file);

		$http.post(uploadUrl,fd, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined}
		})
		.success(function(response){
			console.log("image uploaded successfully");
			console.log(response.path); 
		})
		.error(function(err){
			console.log("error!! " + err);
		});
	};

}]);







// app.controller("mainController", function($scope, $http) {
//     $scope.testScope = "angular working";
    
//     //get all courses
//     $scope.getCourses = function(){
//         console.log('controller getCourses activated');        
//         $http.get('/api/courses').success(function(response){
//             $scope.courses = response;
//         });
//     };

//     //get all students
//     $scope.getStudents = function(){
//         console.log('controller getStudents activated');        
//         $http.get('/api/students').success(function(response){
//             $scope.students = response;
//         });
//     };

// 	$scope.addCourse = function(){
// 		console.log($scope.course);
// 		$http.post('/api/courses/', $scope.course).success(function(response){
// 			window.location.href='#/books';
// 		});
// 	}

// 	$scope.updateBook = function(){
// 		var id = $routeParams.id;
// 		$http.put('/api/books/'+id, $scope.book).success(function(response){
// 			window.location.href='#/books';
// 		});
// 	}

// 	$scope.removeBook = function(id){
// 		$http.delete('/api/books/'+id).success(function(response){
// 			window.location.href='#/books';
// 		});
// 	}
// });
