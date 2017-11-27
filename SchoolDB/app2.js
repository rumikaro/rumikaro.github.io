const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
//const formidable = require('express-formidable');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//require modules
var Student = require('./models/students');
var Course = require('./models/courses');
var StudentsInCourse = require('./models/studentsInCourse');
var User = require('./models/users')
var imageUpload = require('./models/imageUpload');


//Init app
const app = express();



app.use(express.static(path.join(__dirname, '/client')));
//app.use(express.static(__dirname+'/client'));
//app.use('/uploads', express.static(__dirname + '/client'));
//app.use('/css', express.static(__dirname + '/client'));

// Bodyparser init
app.use(bodyParser.json());


//Multer init
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/')
    },
    filename: function (req, file, cb) {
		cb(null, file.originalname+ '-' + Date.now()+'.jpg')
		//cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });




// Connect to Mongoose
var mongoDB = 'mongodb://127.0.0.1/schooldb';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;


// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// Passport init
app.use(passport.initialize());
app.use(passport.session());


// db.query(sql,function(err,data){
//    if(data.length>0){
// 	  req.session.username = req.params.username;
// 	  req.session.password = req.params.password;
// 	  res.send(data); 
// 	}
// });



// Register
app.get('/register', function(req, res){
	res.send('register screen')
	//res.render('register');
});

// Register User
app.post('/register', function(req, res){
	//var name = req.body.name;
	//console.log(req);
	var username = req.body.username;	
	var email = req.body.email;
	var password = req.body.password;
	var role = req.body.role;
	var phone = req.body.phone;

	console.log(username, email, password, role, phone);
	//var password2 = req.body.password2;

	// Validation
	// req.checkBody('name', 'Name is required').notEmpty();
	// req.checkBody('email', 'Email is required').notEmpty();
	// req.checkBody('email', 'Email is not valid').isEmail();
	// req.checkBody('username', 'Username is required').notEmpty();
	// req.checkBody('password', 'Password is required').notEmpty();
	//req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	//var errors = req.validationErrors();
	var errors = false;

	if(errors){
		res.json({success: false, error: errors});
		// res.render('register',{
		// 	errors:errors
		// });
	} else {
		console.log('user is ok');

		var newUser = new User({
			username: username,
			password: password,
			email:email,
			phone: phone,
			role: role
			
		});

		User.createUser(newUser, function(err, user){
			//console.log(newUser);
			if(err) throw err;
			console.log(user);
		});

		console.log('You are registered and can now login');

		res.json({success: true, user:{role: newUser.role}});
		//res.redirect('/users/login');
	}
});


passport.use(new LocalStrategy(
	function(username, password, done) {
	console.log('local strategy activated...');
	User.getUserByUsername(username, function(err, user){
		if(err){
			//res.json({success: false});
			throw err;
		} 
		if(!user){
			//res.json({success: false, error:'Unknown User'});
			console.log('unknown user');
			return done(null, false, {message: 'Unknown User'});
		}
  
		User.comparePassword(password, user.password, function(err, isMatch){
			if(err){
				console.log('error: ' + err);
				//res.json({success: false, error: err});
				throw err;
			} 
			if(isMatch){
				 return done(null, user);
			} else {
				console.log('Invalid password');
				//res.json({success: false, error: 'Invalid password'});
				return done(null, false, {message: 'Invalid password'});
			 }
		});
	});
}));
  
passport.serializeUser(function(user, done) {
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});
  

app.post('/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  if (err) { 
		  return next(err); 
		}
	  if (!user) {
		   //return res.redirect('/login'); 
		   return res.json({success: false, error: err})
		}
	  req.logIn(user, function(err) {
			if (err) {
				return next(err); 
			}
		//return res.redirect('/users/' + user.username);
		return res.json({success: true, user: {username: user.username, role: user.role}})
		
	  });
	})(req, res, next);
});




app.post('/login2', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
	  if (err) { 
		  return next(err); 
		}
	  if (!user) {
		   //return res.redirect('/login'); 
		   return res.send(false)
		}
	  req.logIn(user, function(err) {
			if (err) {
				return next(err); 
			}
		//return res.redirect('/users/' + user.username);
		return res.send(true)
		
	  });
	})(req, res, next);
});
  
app.get('/logout', function(req, res){
	  req.logout();
  
	  console.log('You are logged out');
		//send success message to client
		res.json({success: true});
	  //res.redirect('/users/login');
});
  



// app.post('/login',
// passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login'}),
// function(req, res) {
//   res.redirect('/');
// });

// app.get('/logout', function(req, res){
//   req.logout();

//   //req.flash('success_msg', 'You are logged out');
//   console.log("logged out");

//   res.redirect('/users/login');
// });


//image upload
app.post('/multer', upload.single('file'));
app.use('/imageupload', imageUpload);


app.get('/', (req, res) => {
	res.send('Please use /api/students or /api/courses');
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.json({success: false});
		//res.json({success:true, user:{user: user.role}});
	}
}


app.get('/api/users', (req, res) => {
	User.getAllUsers((err, usersDetails) => {
		if(err){
			throw err;
		}
		//console.log(studentDetails); // test if api works
		//console.log(usersDetails);
		res.json(usersDetails);
	});
});


app.get('/api/users/:_id', (req, res) => {
	console.log('get user from server by id');
	User.getUserById(req.params._id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});

app.delete('/api/users/:_id', (req, res) => {
	var id = req.params._id;
	User.removeUser(id, (err, user) => {
		if(err){
			throw err;
		}
		res.json(user);
	});
});



app.put('/api/users/:userId', (req, res) => {	
	var id = req.params.userId;
	//console.log('id:' + id);
	var user = req.body;
	//console.log('student:');
	console.log(user);
	User.updateUser(id, user, {}, (err, user) => {
		if(err){
			throw err;
		}
		//res.json(student);
	});

	res.json(user);
	
});


app.get('/api/students', (req, res) => {
	Student.getStudents((err, studentDetails) => {
		if(err){
			throw err;
		}
		//console.log(studentDetails); // test if api works
		//console.log(student);
		res.json(studentDetails);
	});
});

app.get('/api/students/:_id', (req, res) => {
	console.log('get student from server by id');
	Student.getStudentById(req.params._id, (err, student) => {
		if(err){
			throw err;
		}
		res.json(student);
	});
});

app.get('/api/students/:_id/courses', (req, res) => {
	StudentsInCourse.getCoursesByStudentId(req.params._id, (err, registrations) => {
		if(err){
			throw err;
		}
		//console.log(registrations)
		//extract value of property "coursee" from each item
		var courses = registrations.map(function(a) {return a.course;});		
		console.log(courses);
		res.json(courses);
	});
});

app.post('/api/students', (req, res) => {
	console.log('request body: ')
	console.log(req.body);
	var student = new Student(req.body);	
	//var student = req.body;
	//console.log('request body: ' + student);
	Student.addStudent(student, (err, student) => {
		if(err){
			throw err;
		}
		res.json(student);
	});
});

app.put('/api/students/:_id', (req, res) => {	
	var id = req.params._id;
	//console.log('id:' + id);
	var student = req.body;
	//console.log('student:');
	console.log(student);
	Student.updateStudent(id, student, {}, (err, student) => {
		if(err){
			throw err;
		}
		//res.json(student);
	});

	//delete previous registrations for student
	StudentsInCourse.deleteAllStudentRegistrations(id);

	//update course registrations for student
	var courseList = student.courses;
	//console.log(courseList);
	for (let i=0; i<courseList.length; i++){
		courseId = courseList[i];
		//console.log(courseId);

		//
		StudentsInCourse.registerStudentsInCourseById(id, courseId);		
	}
		
	//StudentsInCourse.registerStudentsInCourse(id, student.courses);
	res.json(student);
	
});





// app.get('/api/student/:_id/courses/pupulatetest', (req, res) => {
// 	StudentsInCourse.getCoursesByStudentIdShowDetails(req.params._id, (err, courses) => {
// 		if(err){
// 			throw err;
// 		}
// 		res.json(courses);
// 	});
// });

app.delete('/api/students/:_id', (req, res) => {
	var id = req.params._id;
	Student.removeStudent(id, (err, student) => {
		if(err){
			throw err;
		}
		res.json(student);
	});
});


//Courses API
//send list of all courses
app.get('/api/courses', (req, res) => {
	Course.getCourses((err, course) => {
		if(err){
			throw err;
		}
		//console.log(course); //Test if api works

		// var responseJson = {
		// 	id: course._id,
		// 	name: course.name,
		// 	image: course.image,
		// 	description: course.description
		// }
		res.json(course);
	});
});

//get details of a specific course
app.get('/api/courses/:_id', (req, res) => {
	var courseId = req.params._id;
	console.log(courseId)
	Course.getCourseById(req.params._id, (err, course) => {
		if(err){
			throw err;
		}
		console.log(course);
		res.json(course);
	});
});

app.get('/api/course/:_id/students', (req, res) => {
	// StudentsInCourse.getCoursesByStudentId(req.params._id, (err, registrations) => {
	// 	if(err){
	// 		throw err;
	// 	}
	// 	console.log(registrations)
	// 	//extract value of property "coursee" from each item
	// 	var courses = registrations.map(function(a) {return a.course;});		
	// 	console.log(courses);
	// 	res.json(courses);
	// });

	StudentsInCourse.getStudentsByCourseId(req.params._id, (err, registrations) => {
		if(err){
			throw err;
		}
		//console.log(registrations);
		//extract value of property "student" from each item
		var students = registrations.map(function(a) {return a.student;});		
		//console.log(students);
		res.json(students);
	});
});



app.post('/api/courses', (req, res) => {
	console.log('request body: ')
	console.log(req.body);
	var course = new Course(req.body);	
	//var course = req.body;
	//console.log('request body: ' + course);
	Course.addCourse(course, (err, course) => {
		if(err){
			throw err;
		}
		res.json(course);
	});
});

app.put('/api/courses/:_id', (req, res) => {	
	//var courseResponse = {};	
	var id = req.params._id;
	console.log('id:' + id);
	var course = req.body;
	console.log('request: ');
	console.log(course);
	Course.updateCourse(id, course, {}, (err, course) => {
		if(err){
			throw err;
		}
		res.json(course);
	});
});

app.delete('/api/courses/:_id', (req, res) => {
	var id = req.params._id;
	Course.removeCourse(id, (err, course) => {
		if(err){
			throw err;
		}
		res.json(course);
	});
});


app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');