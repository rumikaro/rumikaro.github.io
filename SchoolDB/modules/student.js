const mongoose = require('mongoose');
const express = require('express');

//var app = express();
var router = express.Router;
var Student = require('../models/studentModel');



module.exports = {
    test: console.log('students module activated!'),

    createTest: function(callback, db, studentObj){

    },

    create: function(db, studentObj){
        var item = new Student(studentObj);
        //save student to students collection
        item.save(function (err) {
          if (err) return handleError(err);
          // saved!
          ////check if item was added
        //   Student.findOne({}, function (err, student) {
        //     if (err) return handleError(err);
        //     console.log(student); // Space Ghost is a talk show host.
        //   })
          console.log('added document to collection');
        });
    },

    update: function(db, oldData, newData){
      
      oldData.student_name = newData.student_name || oldData.student_name;
      oldData.student_phone = newData.student_phone || oldData.student_phone;
      oldData.student_email = newData.student_email || oldData.student_email;
      oldData.student_image = newData.student_image || oldData.student_image;

      console.log('update module activated');
    },

    //////////להמשיך מכאן....//////////
    findAll: function(db){
      // get all the users
      Student.find({}, function(err, students) {
        if (err) throw err;

        // object of all the users
        console.log(students);
        return students;
      });
    }
    
}

//var Students = mongoose.model('students', StudentsSchema) 
// module.exports = {
//     selectall: function(){
//         var query = 'show documents';
//     }
// };