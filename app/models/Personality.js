//
//	Personality.js
//
//	Sub-document schema for personality categories
//	In this case, Hogwarts Houses
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalitySchema = new Schema({
	name		: String,
	value		:	Number,
	count		: Number
});

module.exports = PersonalitySchema;