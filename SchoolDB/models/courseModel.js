const mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

//create schema
var SchoolSchema = new Schema({
    couresId: Schema.Types.ObjectId,    
    course_name: String,
    course_description: String,
    course_image: String
});

// Compile model from schema
var Course = mongoose.model('Course', SchoolSchema);

//export the model 
module.exports = Course;