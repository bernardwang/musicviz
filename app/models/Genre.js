//
//	Genre.js
//
//	Mongoose schema for top genres
//

var mongoose = require('mongoose');
var Personality = require('./Personality');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
	name		: String,
	value		: Number,
	count		: Number,
	houses	: [Personality]
});

/**
 * Stores or updates each genre to database
 */
GenreSchema.statics.addGenre = function(err, data, callback) {
	/*data.forEach(function(item){
		genre.create({
			name		: String,
			value		: Number,
			count		: Number,
			houses	: [Personality]
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
