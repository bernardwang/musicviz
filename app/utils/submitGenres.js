//
//	submitGenres.js
//	
//	Posts User genres to DB
//

var ajaxWrapper = require('./ajaxWrapper');

/**
 *	Submits list of user genres
 *	AJAX DB post request
 */
var submitGenres = function(genres, house, callback) {
	var url = 'http://localhost:3001/api/music/genres';		// 3001 for browsersync
	for(var key in genres){
		var data = { 
			name: key,
			value: genres[key],
			personality: house
		};
		ajaxWrapper(url, 'POST', data, 'json', function(res) {
			if(!res) {
				console.log('DB post request error');
				callback(null);
			}
			callback(res);
		});
	}
};

module.exports = submitGenres;