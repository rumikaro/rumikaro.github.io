const http = require('http');
const fs =require('fs');
const express = require('express');
//const connect = require('connect');
const mongoose = require('mongoose');

var app = express();


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/schooldb';
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;
//var SchoolSchema = require('./modules/schema');
//console.log(SchoolSchema);

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Compile model from schema
// var Student = mongoose.model('Student', SchoolSchema);
// var Course = mongoose.model('Course', SchoolSchema);
// var Admin = mongoose.model('Admin', SchoolSchema);

var Student = require('./models/studentModel');
var Course = require('./models/courseModel');
var Admin = require('./models/adminModel');

var studentM = require('./modules/student');

//console.log('Student model:');
//console.log(Student);

//Test Callback
app.get('/student/testcallbak', function(req, res){
    studentM.createTest(function(err, students){
        if(err){
            throw err;
        }
        res.send(students);
    });
});


//Create
app.get('/student/insert/test', function(req, res){
  var demoStudent = {"student_name" : "Jane Austen", "student_phone" : "054-26569845", "student_email" : "jane@blabla.com", "student_image" : "uploads/janeausten.jpg" };
  studentM.test;
  studentM.create(db, demoStudent);
  //console.log(JSON.parse(demoStudent));
  res.write('morning');
  res.write(JSON.stringify(demoStudent));
  res.end();
})

//Update
app.get('/student/update/test', function(req, res){
  var demoStudent = {"student_name" : "Justin Timberlake", "student_phone" : "054-26569845", "student_email" : "juston@blabla.com", "student_image" : "uploads/janeausten.jpg" };
  var itemId = '59e9090fde121509b0cc4588'
  studentM.test;
  Student.findById(itemId, function(err, student){  
    // Handle any possible database errors
    if (err) {
        console.log('Error: item was not found.');      
        res.status(500).send(err);
        //res.send(err);
    } else {
        // Update each attribute with any possible attribute that may have been submitted in the body of the request
        // If that attribute isn't in the request body, default back to whatever it was before.
        studentM.update(db, student, demoStudent);

        // Save the updated document back to the database
        student.save(function(err, student){
            if (err) {
                console.log('Error in saving');
                res.status(500).send(err);
            }
            console.log('finished - sending data');
            res.send(student);
        });
    }
  });

});

//Read All
app.get('/students', function(req, res){
    console.log('read module activated');  
    
    Student.find({}, function(err, students) {
        if (err){
            throw err;
            res.send(err);
        } 
    
        // object of all the users
        //console.log(students);
        res.send(students);
    });
});

//Read One
app.get('/students/:id', function(req, res){
    console.log('read one activated')
    var id = req.params.id;   
    Student.findById(id, function(err, student) {
        console.log('find by id activated')        
        if (err) throw err;
      
        // object of the user
        res.send(student);
    }); 
});
//app.get('/student/:details/:id')

// app.get('/', function(req, res){
//     res.end('what\'s up?');
// });
// var api = require('./api/routes');
// app.use('/api', api);

//create server 
app.listen(4040, function(){
    console.log('listening to port 4040');
});
// // http.createServer(function (req, res) {
// //     res.writeHead(200, {'Content-Type': 'text/html'});
// //     res.end('Hello World!');
// // }).listen(4040);