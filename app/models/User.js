//
//	User.js
//
//	Mongoose schema for submitted users
//

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: String
});

/**
 *	Deletes all users in DB
 */
UserSchema.statics.deleteAll = function (callback) {
	console.log('DELETE ALL');
	User.find().remove().exec(); // nukes db, pretty lazy
	callback(null);
};

var User = mongoose.model('User', UserSchema, 'UserCollection');
module.exports = User;
