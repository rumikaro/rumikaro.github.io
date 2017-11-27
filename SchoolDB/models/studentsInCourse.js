const mongoose = require('mongoose');
var Student = require('../models/students');
var Course = require('../models/courses');

var Schema =  mongoose.Schema;

// Genre Schema
const studentsInCourseSchema = mongoose.Schema({
	//_id: new Schema.Types.ObjectId,
    student: {type: mongoose.Schema.Types.ObjectId, ref:'Student'},
    course: {type: mongoose.Schema.Types.ObjectId, ref:'courses'}
});

const StudentsInCourse = module.exports = mongoose.model('registrations', studentsInCourseSchema);

module.exports.getCoursesByStudentId = (id, callback) => {
    StudentsInCourse.find({student: id})    
    .populate('course', '_id name image')
    //.populate('student')
    .exec(callback);
}


module.exports.getStudentsByCourseId = (id, callback) => {
    //StudentsInCourse.find({course: id}, callback);
    console.log('getStudentsByCourseId activated!!')
    StudentsInCourse.find({course: id})    
    .populate('student', '_id name image')
    //.populate('student')
    .exec(callback);
}

// module.exports.getCoursesByStudentIdShowDetails = (id, callback) => {
//     StudentsInCourse.find({student: id})
//     .populate('course')
//     .exec(callback);
//     //.exec(function (err, student) {
//       //if (err) return handleError(err);
//       //console.log(student);
//       // prints "The author is Ian Fleming"
//     //});
// }



module.exports.getRegistrations = (callback, limit) => {
	StudentsInCourse.find(callback).limit(limit);
}

module.exports.deleteAllStudentRegistrations = (studentId) => {
    console.log('deleting previous registrations')    
    var query = {student: studentId};
    StudentsInCourse.remove(query, function (err) {
        if (err) return console.error(err);
        console.log('deleted courses')
        //fluffy.speak();
    }); 
}

module.exports.registerStudentsInCourseById = (studentId, courseId) => {


    //update students in course
    console.log('registerStudentsInCourseById activated');    
    var registration = new StudentsInCourse; //create new item of this model
    registration.student = studentId; //add student attribute
    registration.course = courseId; //add course attribute
    console.log(registration);
    //check if registration exists. if not - insert registration
    var query = {course: courseId, student: studentId}; 
    registration.save(function (err, registration) {
        if (err) return console.error(err);
        //fluffy.speak();
    }); 
    // studentsInCourse.findOneAndUpdate(query, registration, { upsert: true }, function(err){
    //     if (err) return err;
    //     console.log(courseId + ' updated');
    // });   
}

module.exports.registerStudentsInCourse = (studentId, coursesList) => {
        //update students in course
        console.log('registerStudentsInCourse activated');
        console.log(coursesList);
	for (let i=0; i<coursesList.length; i++){
		let courseId = coursesList[i]; //students is
        let query = {course: courseId, student: studentId};
        //console.log('query:');
        console.log(query);
        //check if student already registered t course. If not - add to collection
        studentsInCourse.update( query, query, { upsert: true }, function(err){
            if (err) return err;
            console.log('updated!');
        });        
        // studentsInCourse.find(query, function(err) {
        //     if (err) {
        //         console.log('error');
        //         studentsInCourse.create(query);
        //         console.log(err)
        //         console.log('registerd student' + query.student + ' to course ' + query.course)
        //     }
        //     console.log('student ' + query.student + ' is already registerd to course ' + query.course) // Space Ghost is a talk show host.
        //   })
    }
}

// //add items to the registration list
// module.exports.registerStudentInCourse = (studentId, courseId) => {
//     //studentsInCourse.find();
//     var registration = {
//         course: courseId,
//         student: studentId
//     };
//     studentsInCourse.findOneAndUpdate(registration, registration, options, function(error, result) {
//         if (error) studentsInCourse.create(registration);
    
//         // do something with the document
//     });
//     //studentsInCourse.create(registration);
// };

//get list of all the students in a course (and vice versa) - "JOIN"
module.exports.getStudentsInCourse = (courseId) => {
    //studentsInCourse.find();
    StudentsInCourse
    .find({ course: courseId })
    .exec(function (err, students) {
      if (err) return handleError(err);
      console.log('The stories are an array: ', students);
    });
};


//get list of all the students in a course (and vice versa) - "JOIN"
module.exports.getCoursesForStudent = (studentId) => {
    //studentsInCourse.find();
    StudentsInCourse
    .find({ student: studentId })
    .exec(function (err, courses) {
      if (err) return handleError(err);
      console.log('The stories are an array: ', courses);
    });
};

// Get courses
module.exports.getCourses = (callback, limit) => {
	course.find(callback).limit(limit);
}

// Add Genre
module.exports.addCourse = (course, callback) => {
	Course.create(course, callback);
}

// Update Genre
module.exports.updateCourse = (id, course, options, callback) => {
	var query = {_id: id};
	//var studnetIDs = course.students;
	var update = {
		name: course.name,
		phone: course.phone,
        image: course.image,
        //students: course.students
	}
	course.findOneAndUpdate(query, update, options, callback); //find the chosen coursee and update it
}
//course.students is an array of course IDs (STRINGS) . in this module wh need to find all the courses by
// their IDs and then create an array of OBJECTS which contains all the data about the course 

// Delete Genre
module.exports.removeCourse = (id, callback) => {
	var query = {_id: id};
	Course.remove(query, callback);
}

// module.exports.registerStudentInCourse = (courseId, studentIDs) => {
// 	for (let i=0; i<studentIDs.length; i++){
		
// 	}
//     course.students.push(studentId);
// }    

//DEMO DATA
//[
//     {
//         "_id": "59e9090fde121509b0cc4588",
//         "student_name": "Justin Timberlake",
//         "student_phone": "054-26569845",
//         "student_email": "juston@blabla.com",
//         "student_image": "uploads/janeausten.jpg",
//         "__v": 0,
//         "name": null
//     },
//     {
//         "_id": "59e90b46a1970f1e08709e0c",
//         "student_name": "Jane Austen",
//         "student_phone": "054-26569845",
//         "student_email": "jane@blabla.com",
//         "student_image": "uploads/janeausten.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "59eb92b2ed37363270794dbd",
//         "student_name": "Jane Austen",
//         "student_phone": "054-26569845",
//         "student_email": "jane@blabla.com",
//         "student_image": "uploads/janeausten.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "59eb92c37a7b49032c418466",
//         "student_name": "Jane Austen",
//         "student_phone": "054-26569845",
//         "student_email": "jane@blabla.com",
//         "student_image": "uploads/janeausten.jpg",
//         "__v": 0
//     },
//     {
//         "_id": "59eb92f4e8aa822428ee1aa3",
//         "student_name": "Jane Austen",
//         "student_phone": "054-26569845",
//         "student_email": "jane@blabla.com",
//         "student_image": "uploads/janeausten.jpg",
//         "__v": 0
//     }
// ]