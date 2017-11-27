const mongoose = require('mongoose');
var Schema =  mongoose.Schema;

var Student = require('../models/students');
var StudentsInCourse = require('../models/studentsInCourse');

// Genre Schema
const courseSchema = mongoose.Schema({
	//_id: new Schema.Types.ObjectId,
    name: String,
    description: String,
    image: String
    //students: [{type: mongoose.Schema.Types.ObjectId, ref:'students'}]
});

const Course = module.exports = mongoose.model('courses', courseSchema);

// Get courses
module.exports.getCourses = (callback, limit) => {
	Course.find(callback).limit(limit);
}

// Get course by Id
module.exports.getCourseById = (id, callback) => {
	Course.findById(id, callback);
}

// Add Course
module.exports.addCourse = (course, callback) => {
	Course.create(course, callback);
}

// Update course
module.exports.updateCourse = (id, course, options, callback) => {
	var query = {_id: id};
	//var studentsInCourse = course.students; //an array of course IDs - input from user
	//var studnetIDs = course.students;
	console.log(course);
	var update = {
		name: course.name,
		description: course.description,
        image: course.image,
        //students: course.students
	}
	//update course details
	Course.findOneAndUpdate(query, update, options, callback); //find the chosen coursee and update it

}


//course.students is an array of course IDs (STRINGS) . in this module wh need to find all the courses by
// their IDs and then create an array of OBJECTS which contains all the data about the course 

// Delete Course
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