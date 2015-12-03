//
//	submitGenres.js
//	
//	Posts User genres to DB
//

var ajaxWrapper = require('./ajaxWrapper');
var async = require('async');

/**
 *	Submits list of user genres
 *	AJAX DB post request
 */
var submitGenres = function (genres, name, house, callback) {

	var userURL = 'http://localhost:3001/api/music/users';
	var genreURL = 'http://localhost:3001/api/music/genres'; // 3001 for browsersync
	var data = {
		name: name,
		house: house
	};

	ajaxWrapper(userURL, 'POST', data, 'json', function (res) {
		if (!res) {
			alert('User already submitted!');
			return( callback(null) );
		}

		async.forEach(Object.keys(genres),
			function (key, next) {
				var data = {
					name: key,
					value: genres[key],
					house: house
				};

				// Submit genre
				ajaxWrapper(genreURL, 'POST', data, 'json', function (res) {
					if (!res) {
						console.log('DB post request error');
						next();
					}
					next();
				});
			},
			function (err) {	// All genres submitted
				if (err) {
					return ( callback(null) );
				}
				return( callback("done!") ); // Doesnt actually matter, no errors
			}
		);

	});
};

module.exports = submitGenres;
