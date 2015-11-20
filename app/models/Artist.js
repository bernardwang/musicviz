//
//	Artist.js
//
//	Mongoose schema for top artists
//

var mongoose = require('mongoose');
var Personality = require('./Personality');

var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	name		: String,													// artist name
	value		: { type: Number, default: 0 },		// total combined rankings
	count		: { type: Number, default: 0 },		// total entries
	houses	: [Personality]										// corresponding categories
});

/**
 * Stores or updates each genre to database
 */
ArtistSchema.statics.addArtist = function(err, data, callback) {
	data.forEach(function(item){
		genre.create({
			name		: String,
			value		: Number,
			count		: Number,
			houses	: [Personality],
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
	callback(null);
};

var Artist = mongoose.model('Artist', ArtistSchema, 'MusicCollection');
module.exports = Artist;
