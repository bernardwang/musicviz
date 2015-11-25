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
	var limit = 5;
	
	// AJAX call
	getCall(function(data) {
		if(!data) {
			console.log('DB get request error');
			callback(null);
		}
		
		// format data
		for(var i = 0; i < Math.min(limit,data.length); i++) {
			var genre = data[i];
			for(var j = 0; j < genre.personality.length; j++) {
				var category = genre.personality[j];
				var percent = 0;
				if(category.count > 0) {
					percent = category.value/category.count;
				}
				result[j].push({
					'label': genre.name,
					'value': percent
				});
			}
		}
		
		callback(result);
	});
	
};

module.exports = getGenres;
