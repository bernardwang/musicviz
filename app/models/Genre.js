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
	category		: Number 														// number representing generalized genre category, not yet 
});

/**
 * Stores or updates each genre to database
 */
GenreSchema.statics.addGenre = function(err, data, callback) {
	/*data.forEach(function(item){
		genre.create({
			name			: item.name,
			value			: item.value,
			count			: item.count,
			houses		: []
			order			: item.order,
			revision	: item.revision,
			msg				: item.msg,
			date			: item.date,
			changes		: item.changes,
			comments	: []
		}, function(err) {
			if(err) {
				callback(err);
			}
		});
	});	
	callback(null);*/
};

var Genre = mongoose.model('Genre', GenreSchema, 'MusicCollection');
module.exports = Genre;
