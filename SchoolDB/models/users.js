var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// User Schema
const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	role:{
		type: String,
		enum: ['owner', 'manager', 'sales']
	},
	email: {
		type: String
	},
	phone: {
		type: String
	},
	image: {
		type: String
	}

});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	//console.log(newUser);	
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			//newUser.save(callback);
			User.create(newUser, callback);
			
	    });
	});
}

// Update user
module.exports.updateUser = (id, user, options, callback) => {
	var query = {_id: id};

	console.log(user);
	var update = {
		username: user.username,
		phone: user.phone,
		email: user.email,
		role: user.role,
		image: user.image,
		password: user.password
        //students: course.students
	}
	//update user details

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(update.password, salt, function(err, hash) {
			update.password = hash;
			//newUser.save(callback);
			User.findOneAndUpdate(query, update, options, callback); //find the chosen coursee and update it			
			
	    });
	});

}

module.exports.getUserByUsername = function(username, callback){
	console.log('getUserByUsername is activated');		
	var query = {username: username};
	var restrictions = {'password': 0};	
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	console.log('getUserById is activated');	
	User.findById(id, callback);
}


module.exports.getAllUsers = function(callback, limit){
	console.log('getAllUsers is activated');
	var query = {};	
	var restrictions = {'password': 0};
	User.find(query, restrictions, callback).limit(limit);
}



// // Add user
// module.exports.addUser = (user, callback) => {
// 	User.create(user, callback);
// }



// Delete user
module.exports.removeUser = (id, callback) => {
	var query = {_id: id};
	User.remove(query, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	console.log('comparePassword is activated');
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}

// module.exports.authenticateUser = function(username, password, done) {
// 	//console.log('executing user authentication...');
// 	console.log('executing user authentication function...');
// 	User.findOne({ username: username }, function(err, user) {
// 	if (err) { 
// 		console.log('error: ' + err);
// 		return done(err); 
// 	}
// 	if (!user) {
// 		console.log('Incorrect username.');				
// 		return done(null, false, { message: 'Incorrect username.' });
// 	}
// 	if (!user.validPassword(password)) {
// 		console.log('Incorrect password.');								
// 		return done(null, false, { message: 'Incorrect password.' });
// 	}
// 	return done(null, user);
// 	});
		
// }

// module.exports.authenticateUser = function(username, password, done) {
// 	console.log('executing user authentication...');
// 	passport.use(new LocalStrategy(
// 		function(username, password, done) {
// 			console.log('executing user authentication function...');
// 			User.findOne({ username: username }, function(err, user) {
// 			if (err) { 
// 				console.log('error: ' + err);
// 				return done(err); 
// 			}
// 			if (!user) {
// 				console.log('Incorrect username.');				
// 			  	return done(null, false, { message: 'Incorrect username.' });
// 			}
// 			if (!user.validPassword(password)) {
// 				console.log('Incorrect password.');								
// 			  	return done(null, false, { message: 'Incorrect password.' });
// 			}
// 			return done(null, user);
// 		  });
// 		}
// 	  ));
// }
