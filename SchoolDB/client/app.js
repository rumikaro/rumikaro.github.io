//var app = angular.module("myApp", ["ngRoute"]);
//var app = angular.module("myApp", []);



//var app = angular.module('myApp', ['ui.router']);


angular.module('myApp', ['ui.router', 'ngFileUpload']);

var app = angular.module('myApp');

app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('/', '/home');	
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
				controller: 'mainController'
			},
			'studentsList@root': {
				templateUrl: '/views/studentsList.html',
				controller: 'StudentsController'
			},
			'coursesList@root': {
				templateUrl: '/views/coursesList.html',
				controller: 'CoursesController2'
			},
			// 'dynamicZone@root':{
			// 	templateUrl: '/views/test.html',
			// 	controller: 'mainController'
			// }
			
		}
	})


	.state('root.home', {
		//abstract: true,
		url:'/home',
		templateUrl:'/views/home.html',
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}

			}
		}
		
	})

	.state('root.login', {
		url:'/users/login',
		templateUrl: '/views/login.html',
		controller: 'UserAuthenticatation'
	})

	.state('root.notAuthorized', {
		url:'/permission-error',
		templateUrl: '/views/errorUserNotAutorized.html',
		//controller: 'UserAuthenticatation'
	})

	.state('root.userRegistration',{
		url:'/adminstration/users',
		views:{
			'studentsList@root': {
				templateUrl: '/views/usersList.html',
				controller: 'AdminstratorController'
			},
			'coursesList@root': {
				template: '',
				//controller: 'CoursesController2'
			},
			'':{
				templateUrl: '/views/userEdit.html',
				controller: 'AdminstratorController'				
			}
		}
	})


	.state('root.userEdit',{
		url:'/adminstration/users/:userId',
		views:{
			'studentsList@root': {
				templateUrl: '/views/usersList.html',
				controller: 'AdminstratorController'
			},
			'coursesList@root': {
				template: '',
				//controller: 'CoursesController2'
			},
			'':{
				templateUrl: '/views/userEdit.html',
				controller: 'AdminstratorController'				
			}
		}
	})

	.state('root.test', {
		url: '/test2',
		templateUrl: '/views/testView.html',
		controller: 'testController',
		resolve: {
			promiseObj:  function($http, $rootScope){
				// $http returns a promise for the url data
				// return $http({method: 'POST', data:$rootScope.user, url: '/login2'});
			 },
		  }
	})

	.state('root.courseDetails', {
		url: '/course/:courseId',
		templateUrl: '/views/courseDetails.html',
		controller: 'CoursesController2',
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}
			}
		}
	})

	.state('root.courseEdit', {
		url: '/course/:courseId/edit',
		templateUrl: '/views/courseEdit.html',
		controller: 'CoursesController2',
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}else if(!(userCheck.user.role == 'manager' || userCheck.user.role == 'owner')){
					$location.path('/permission-error');
				}
			}
		}
	})

	.state('root.studentDetails',{
		url:'/student/:studentId',
		templateUrl: '/views/studentDetails.html',
		controller: 'StudentsController',
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}
			}
		}	
	})

	.state('root.studentEdit', {
		url: '/student/:studentId/edit',
		controller: 'StudentsController',
		templateUrl: '/views/studentEdit.html',	
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}
			}	
		}						
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
		controller: 'StudentsController',
		resolve: {
			userDetails: function($http, $location, $stateParams, $rootScope, appMemory){
				var userCheck = appMemory.get();
				if (!(userCheck.success == true)){
					$location.path('/users/login');
				}
			}	
		}		
	})

	// .state('root.home', {
	// 	url: '/',
	// 	'dynamicZone@root':{
	// 		templateUrl: '/views/login.html',
	// 		controller: function($scope){}
	// 	}
	// })

	


});


app.factory('appMemory', function($rootScope) {
	var savedData = {}
	function set(data) {
	  savedData = data;
	}
	function get() {
	 return savedData;
	}
   
	return {
	 set: set,
	 get: get
	}
   
});

app.service('checkUser', function($location, $http) {
    this.general = function ($location, $http) {
        var user = {
			username: 'jeff',
			password: '12345'
		}
		$http.post('/login', user).then(function(response){
			if(response.data.success == false){
				$location.path('/users/login');
			}
		})
    }
});


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
	//$rootScope.user = {}
}]);

app.controller('UserAuthenticatation', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'appMemory', function($rootScope, $scope, $http, $location, $stateParams, appMemory){
	//var username = $scope.user.username;
	//var password = $scope.user.password;
	
	$scope.showActivationMessage = function(){
		console.log('authenticateUser controller activated');
	}

	$scope.authenticateUser = function(){
		//console.log($scope.user);
		$rootScope.userData = $scope.user;
		
		console.log('authenticateUser activated');
		$http.post('/login', $rootScope.userData).success(function(response){
			//$stateParams.user = response.user;
			console.log('user logged in successfuly');
			console.log(response);
			$rootScope.user.username = response.user.username;
			$rootScope.user.role = response.user.role;
			$rootScope.user.isLoggedIn = true;
			appMemory.set(response);
			//pass user to homepage if user logged in successfuly success
			if(response.success == true){
				$location.path('/');
			}
			
			//window.location.href='#/courses';
			//$location.path('/course/' + courseId);	//show course details screen				
		});
	}
}]);

app.controller('mainController', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'appMemory', function($rootScope, $scope, $http, $location, $stateParams, appMemory){
	// var vm = this;
	// $rootScope.userIsOk = userIsOk;



	$scope.showUserData = function(){
		var userData = appMemory.get();
		if(userData.success == true){
			$rootScope.user.role = userData.user.role;
			$rootScope.user.username = userData.user.username;
			$rootScope.user.isLoggedIn = true;
		}
	}


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


app.controller('AdminstratorController', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'Upload', 'appMemory', function($rootScope, $scope, $http, $location, $stateParams, Upload, appMemory){
	$scope.getUsers = function(){
		$http.get('/api/users').success(function(response){
			console.log('controller getCourses activated');
			$scope.allUsers = response;			
			//$scope.courses = response;
		});
	};

	$scope.showUserEdit = function(userId){
		//var courseId = x._id;
		console.log('id:' + userId );
		$location.path('/adminstration/users/' + userId);		
	}

	//get details of a selected student
	$scope.getUserDetails = function(){
		$scope.userForEdit = {
			_id: null,
			username: null,
			image: null,
			phone: null,
			email: null,
			password: null
		};

		var id = $stateParams.userId;
		console.log(id);

		//if id exists, get student data from server
		if (id){
			$http.get('/api/users/'+id).success(function(response){
				
				//create a student object
				$scope.userForEdit = {
					_id: $stateParams.userId,
					username: response.username,
					image: response.image,
					phone: response.phone,
					email: response.email,
					password: response.password,
					role: response.role
				};
				console.log($scope.userForEdit);

			});

		}
	}

	//saveStudent checks if student is new or exists
	$scope.saveUser = function(){
		var id = $stateParams.userId;		
		if (id == undefined){
			$scope.createUser();
		}
		else{
			$scope.updateUser()
		}
	}

	$scope.updateUser = function(){
		var id = $stateParams.userId;
	
		$http.put('/api/users/'+id, $scope.userForEdit).success(function(response){
			//window.location.href='#/students';
			$scope.getUsers() //update students list			
			//$location.path('/user/' + id);	//return to student details screen
			$location.path('/adminstration/users');	
		});
		//update course registrations for student
		// $http.put('/api/students/'+id+'/courses', $scope.student).success(function(response){
		// 	window.location.href='#/students';
		// });
	}
	

		////FILE UPLOAD////
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
			$scope.userForEdit.image=response.path;
		}).error(console.log('error'));
	
	};
	
}])	


// app.controller('headerController', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'appMemory', function($rootScope, $scope, $http, $location, $stateParams, appMemory){
// 	var userData = appMemory.get();
// 	$rootScope.user.role = userData.user.role;
// 	$rootScope.user.username = userData.user.username;

// }])

app.controller('CoursesController2', ['$rootScope', '$scope', '$http', '$location', '$stateParams', 'Upload', 'appMemory', function($rootScope, $scope, $http, $location, $stateParams, Upload, appMemory){
	console.log('CoursesController loaded...');
	
	$rootScope.user = {
		username: null,
		role: null,
		isLoggedIn: false
	}

	$scope.testScope = 'module works!';

	$scope.initInfoPage = function(){
		$scope.getCourseDetails();
		$scope.getUserData();
	}

	$scope.getUserData = function(){
		var userData = appMemory.get();
		if(userData.success == true){
			$rootScope.user.role = userData.user.role;
			$rootScope.user.username = userData.user.username;
			$rootScope.user.isLoggedIn = true;
		}
	}

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

// var checkUser = function($http, $location){
// 	var user = {
// 		username: 'jeff',
// 		password: '12345'
// 	}
// 	$http.post('/login', user).then(function(response){
// 		if(response.data.success == false){
// 			$location.path('/users/login');
// 		}
// 	})
// };





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
