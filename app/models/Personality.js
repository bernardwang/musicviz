//
//	Personality.js
//
//	Sub-document schema for personality categories
//	In this case, Hogwarts Houses
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalitySchema = new Schema({
	//name		: String,
	value		: { type: Number, default: 0 },	
	count		: { type: Number, default: 0 },	
});

module.exports = PersonalitySchema;