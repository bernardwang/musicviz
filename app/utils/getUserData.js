var getUserArtists = require('./getUserArtists.js');
var getUserGenres = require('./getUserGenres.js');

/**
 *	Returns list of users top genres in two formats,
 *	Map of genre to value for submitting to DB & 
 *	List of label/value objects for D3 chart
 */
var getUserData = function (name, callback) {
	getUserArtists(name, function (userArtists) {
		if (!userArtists) {
			return ( callback(null) );
		}
		getUserGenres(userArtists, function (userGenres) {
			if (!userGenres) {
				return ( callback(null) );
			}

			// Formats genres for D3 chart
			// Single layer for user
			var userData = [];
			var layer = [];
			for (var genre in userGenres) {
				var percent = userGenres[genre];
				layer.push({
					'label': genre,
					'value': percent
				});
			}
			userData.push(layer);

			callback(userGenres, userData);
		});
	});
};

module.exports = getUserData;
