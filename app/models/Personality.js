//
//	Personality.js
//
//	Sub-document schema for personality categories
//	In this case, Hogwarts Houses
//

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonalitySchema = new Schema({
	//name		: String,		// instead of keeping track of personality by name, use constants defined in Genre
	value		: { type: Number, default: 0 },	
	count		: { type: Number, default: 0 },	
	percent : { type: Number, default: 0 }
});

module.exports = PersonalitySchema;