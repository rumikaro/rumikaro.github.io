const mongoose = require('mongoose');

var Course = require('../models/courses');
var StudentsInCourse = require('../models/studentsInCourse');

var Schema =  mongoose.Schema;

// Genre Schema
const studentSchema = mongoose.Schema({
	//_id: new Schema.Types.ObjectId,
	_id: Schema.Types.ObjectId,
    name: String,
    phone: String,
    email: String,
    image: String
});

const Student = module.exports = mongoose.model('Student', studentSchema);



// Get all students
module.exports.getStudents = (callback, limit) => {
	Student.find(callback).limit(limit);
}

// Get student by Id
module.exports.getStudentById = (id, callback) => {
	Student.findById(id, callback);
}

// Add Genre
module.exports.addStudent = (student, callback) => {
	Student.create(student, callback);
}

// Update Genre
module.exports.updateStudent = (id, student, options, callback) => {
	var query = {_id: id};
	var update = {
		name: student.name,
		phone: student.phone,
		email: student.email,
		image: student.image
	}
	Student.findOneAndUpdate(query, update, options, callback);
}


// Delete Genre
module.exports.removeStudent = (id, callback) => {
	var query = {_id: id};
	Student.remove(query, callback);
}


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