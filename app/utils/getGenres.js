//
//	getGenres.js
//	
//	Gets aggregated genres from DB
//

var ajaxWrapper = require('./ajaxWrapper');

/**
 *	AJAX DB get request
 */
var getCall =  function(callback) {
	var url = 'http://localhost:3001/api/music/genres';		// 3001 for browsersync local dev
	ajaxWrapper(url, 'GET', null,'json', function(res) {
		callback(res)
	});
}

/**
 *	Returns list of total genres
 */
var getGenres = function(callback) {
	var result = [[],[],[],[]]; 	// hardcoded for now, d3 input: 4 arrays of label/value objects
	var limit = 7;
	
	// AJAX call
	getCall(function(res) {
		if(!res) {
			console.log('DB get request error');
			callback(null);
		}
		
		// format res
		for(var i = 0; i < Math.min(limit, res.length); i++) {
			var genre = res[i];
			for(var n = 0; n < genre.personality.length; n++) {
				var house = genre.personality[n];
				result[n].push({
					'label': genre.name,
					'value': house.percent
				});
			}
		}
		
		callback(result);
	});
	
};

module.exports = getGenres;
