var getUserArtists = require('./getUserArtists.js');
var getUserGenres = require('./getUserGenres.js');

/**
 *	Returns list of user's top genres
 */
var getUserData = function(name, callback) {
	getUserArtists(name, function(userArtists) {
		if(!userArtists) {
			callback(null);	
		}
		getUserGenres(userArtists, function(userGenres) {
			if(!userGenres){
				callback(null)
			}
			callback(userGenres);
		});
	});
};

module.exports = getUserData;