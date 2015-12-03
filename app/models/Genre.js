//
//	Genre.js
//
//	Mongoose schema for top genres
//

var mongoose = require('mongoose');
var House = require('./House');

var Schema = mongoose.Schema;
var GenreSchema = new Schema({
	name				: String, // genre name
	value				: { type: Number, default: 0 },	// total combined percentages
	count				: { type: Number, default: 0 },	// total entries
	percent			: { type: Number, default: 0 },	// average percentage
	house				: [House], // corresponding categories
	category		: Number // number representing generalized genre category, not yet used
});

/**
 *	Map to get corresponding House index
 */
GenreSchema.statics.HOUSE_CONST = {
	'Gryffindor'	: 0,
	'Hufflepuff'	: 1,
	'Ravenclaw'		: 2,
	'Slytherin'		: 3
};

/**
 *	Stores and updates a genre to database
 */
GenreSchema.statics.initGenre = function (callback) {

	var result = new Genre({
		name				: '',
		value				: 0,
		count				: 0,
		percent			: 0,
		house				: [],
		category		: 0 // currently unused
	});

	for (var i = 0; i < 4; i++) {
		result.house.push(result.house.create({
			value				: 0,
			count				: 0,
			house	: 0
		}));
	}

	return result;
};

/**
 *	Deletes all genres in DB
 */
GenreSchema.statics.deleteAll = function (callback) {
	console.log('DELETE ALL');
	Genre.find().remove().exec(); // nukes db, pretty lazy
	callback(null);
};

var Genre = mongoose.model('Genre', GenreSchema, 'MusicCollection');
module.exports = Genre;
