const mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

//create schema
var SchoolSchema = new Schema({
    studentId: Schema.Types.ObjectId,
    student_name: String,
    student_phone: String,
    student_email: String,
    student_image: String,
    couresId: Schema.Types.ObjectId,    
    course_name: String,
    course_description: String,
    course_image: String,
    adminId: Schema.Types.ObjectId,    
    admin_name: String,
    admin_role: { type: String, enum: ['oener', 'manager', 'sales'] },
    admin_phone: String,
    admin_email: String,
    admin_password: String
});

module.exports = SchoolSchema;