//
//	Artist.js
//
//	Mongoose schema for top artists
//

var mongoose = require('mongoose');
var House = require('./House');

var Schema = mongoose.Schema;
var ArtistSchema = new Schema({
	name: String, // artist name
	value: {type: Number, default: 0}, // total combined rankings
	count: {type: Number, default: 0}, // total entries
	houses: [House] // corresponding categories
});

/**
 * Stores or updates each genre to database
 */
ArtistSchema.statics.addArtist = function (err, data, callback) {
	data.forEach(function (item) {
		genre.create({
			name: String,
			value: Number,
			count: Number,
			houses: [House],
			order: item.order,
			revision: item.revision,
			msg: item.msg,
			date: item.date,
			changes: item.changes,
			comments: []
		}, function (err) {
			if (err) {
				callback(err);
			}
		});
	});
	callback(null);
};

var Artist = mongoose.model('Artist', ArtistSchema, 'MusicCollection');
module.exports = Artist;
