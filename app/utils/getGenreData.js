//
//	getGenreData.js
//	
//	Combines list of artists into list of genres
//

/**
 *	Creates map of top genres from list of top artists
 */
var getGenreData = function(artists) {
	var result = {};
	var totalPlays = 0;
	
	for(var i = 0; i < artists.length; i++) {
		var artist = artists[i];
		var genre = artist.genre[0].name;		// only first genre tag
		genre = genre.toLowerCase().replace(/[\s-]+/g, ''); // normalize text
		totalPlays += parseInt(artist.plays);
		if (result[genre] === undefined){
			result[genre] = parseInt(artist.plays);
		}
		else {
			result[genre] += parseInt(artist.plays);
		}
	}
	
	// removes insignificant genres
	for(var genre in result) {
		result[genre] /= totalPlays;
		if(result[genre] < 0.02) {
			delete result[genre];
		}
	}

	return result;
}

module.exports = getGenreData;