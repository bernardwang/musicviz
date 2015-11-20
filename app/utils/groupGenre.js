// 
// 	groupGenre.js
//
//	Generalize Last.fm genres into specified categories with tasteometer
//

var async = require('async');
var ajaxWrapper = require('./ajaxWrapper');
var CONST = require('./selectConstants');

/**
 *	AJAX call to get a tag's top artist
 */
var tagCall = function(tag, callback) {
	var url = 'http://ws.audioscrobbler.com/2.0/';
	var type = 'POST';
	var data = 'method=tag.getTopArtists' + '&tag=' + tag + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
	var dataType = 'jsonp';
	ajaxWrapper(url, type, data, dataType, function(res) {
		callback(res);
	});
};

/**
 *	AJAX call to compare two artists
 */
var compareCall = function(artist, compare, callback) {
	var url = 'http://ws.audioscrobbler.com/2.0/';
	var type = 'POST';
	var data = 'method=tasteometer.compare' + '&type=artist|artist' + '&value='+ artist + '|' + compare + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
	var dataType = 'jsonp';
	ajaxWrapper(url, type, data, dataType, function(res) {
		callback(res);
	});
};
	

//
//	TODO
//	Last fm api is still broken, this feature is not working
//

/**
 *	Returns list of each genre's generalized category
 */
var selectGenres = function(genres, callback) {
	result = {};
	var that = this;
	
	async.each(genres,
		function(genre, asyncCallback) {
			tagCall(genre.name, function(data) {
				var tagTopArtist = data; // get first artist name
				var genreCategories = [];
				for(var i = 0; i < CONST.COMPARE.length; i++) {
					compareCall(tagTopArtist, CONST.COMPARE[i], function(result){
						genreCategories.push(result);
					});
				}
				result[genre.name] = genreCategories;				
				asyncCallback();
			});
		},
		function(err){
			callback(result);
 		}	
	);
};

modules.exports = selectGenres();