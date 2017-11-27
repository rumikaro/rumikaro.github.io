const mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

//create schema
var SchoolSchema = new Schema({
    studentId: Schema.Types.ObjectId,
    student_name: String,
    student_phone: String,
    student_email: String,
    student_image: String
});

// Compile model from schema
var Student = mongoose.model('Student', SchoolSchema);

//export the model 
module.exports = Student;