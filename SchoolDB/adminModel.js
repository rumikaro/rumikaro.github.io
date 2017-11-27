const mongoose = require('mongoose');

// Define schema
var Schema = mongoose.Schema;

//create schema
var SchoolSchema = new Schema({
    adminId: Schema.Types.ObjectId,    
    admin_name: String,
    admin_role: { type: String, enum: ['oener', 'manager', 'sales'] },
    admin_phone: String,
    admin_email: String,
    admin_password: String
});

// Compile model from schema
var Admin = mongoose.model('Admin', SchoolSchema);

//export the model 
module.exports = Admin;