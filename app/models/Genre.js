//
//	Genre.js
//
//	Mongoose schema for top genres
//

var mongoose = require('mongoose');
var Personality = require('./Personality');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
	name				: String,														// genre name
	value				: { type: Number, default: 0 },			// total combined percentages
	count				: { type: Number, default: 0 },			// total entries
	personality	: [Personality],										// corresponding categories
	category		: Number 														// number representing generalized genre category, not yet used
});

/**
 * Stores or updates each genre to database
 */
GenreSchema.statics.initGenre = function(callback) {
	
	var result = new Genre({
		name				: '',													
		value				: 0,		
		count				: 0,		
		personality	: [],									
		category		: 0 	// currently unused												
	});
	
	for(var i = 0; i < 4; i++) {
		result.personality.push(result.personality.create({
			value: 0,
			count: 0
		}));
	}
	
	return result;
};

var Genre = mongoose.model('Genre', GenreSchema, 'MusicCollection');
module.exports = Genre;
