var async = require('async');
var ajaxWrapper = require('./ajaxWrapper');

/**
 *	AJAX call to get user top artists
 */
var userCall = function(username, limit, callback) {
	var url = 'http://ws.audioscrobbler.com/2.0/';
	var type = 'POST';
	var data = 'method=user.getTopArtists' + '&user=' + username + '&limit='+ limit + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
	var dataType = 'jsonp';
	ajaxWrapper(url, type, data, dataType, function(res) {
		callback(res);
	});
};
	
/**
 *	AJAX call to get artist info
 */
var artistCall = function(artist, callback) {
	var url = 'http://ws.audioscrobbler.com/2.0/';
	var type = 'POST';
	var data = 'method=artist.getInfo' + '&artist=' + artist + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
	var dataType = 'jsonp';
	ajaxWrapper(url, type, data, dataType, function(res) {
		callback(res);
	});
};

/**
 *	Returns user's list of top artists
 *  Each artist has genre list
 */
var getArtistData = function(username, callback) {
	var result = [];
	var limit = 20;
	var that = this;
	
	userCall(username, limit, function(data) {
		if(data.error) {
			alert('Invalid username, please try again.');
			callback(null);
		}
		
		// array of artist objects
		var artists = data.topartists.artist;
		
		// async loop, get artist info
		async.each(artists, 
			function(artist, asyncCallback) {
				artistCall(artist.name, function(data) {
					result.push({
						"name": artist.name,
						"genre": data.artist.tags.tag.slice(0,3),
						"plays": data.artist.stats.playcount,
						"count": artist.playcount
					});
					asyncCallback();
				});
			},
			function(err){
				callback(result);
 			}	
		);
	});
};

module.exports = getArtistData;