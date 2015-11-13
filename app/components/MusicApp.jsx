// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var async = require('async');
var ajaxWrapper = require('../utils/ajaxWrapper');

var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
			username: '',
			userhouse: '',
			artistData: []
    };
  },
	
	/**
	 *	Gets top artist list from Lastfm user profile,
	 *	query every artist for genre and play count
	 *	saves data in music store for D3 to use
	 */
	getArtistData: function(username, userhouse) {
		var result = [];
		var limit = 20;
		var that = this;
		
		this.userCall(username, limit, function(data) {
			if(data.error) {
				alert('Invalid username, please try again.');
				return;
			}
			
			// array of artist objects
			var artists = data.topartists.artist;
			
			// async loop, get artist info
			async.each(artists, 
				function(artist, callback) {
					that.artistCall(artist.name, function(data) {
						result.push({
							"name": artist.name,
							"genre": data.artist.tags.tag.slice(0,2),
							"plays": data.artist.stats.playcount,
							"count": artist.playcount
						});
						callback();
					});
				},
				function(err){
    			that.setState({ 
						username: username,
						userhouse: userhouse,
						artistData: result
    			});
  			}	
			);
		});
  },

	/**
	 *	AJAX call to get user top artists
	 */
	userCall: function(username, limit, callback) {
		var url = 'http://ws.audioscrobbler.com/2.0/';
		var type = 'POST';
		var data = 'method=user.getTopArtists' + '&user=' + username + '&limit='+ limit + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
		var dataType = 'jsonp';
		ajaxWrapper(url, type, data, dataType, function(res) {
			callback(res);
		});
	},
	
	/**
	 *	AJAX call to get artist info
	 */
	artistCall: function(artist, callback){
		var url = 'http://ws.audioscrobbler.com/2.0/';
		var type = 'POST';
		var data = 'method=artist.getInfo' + '&artist=' + artist + '&api_key=57ee3318536b23ee81d6b27e36997cde' + '&format=json';
		var dataType = 'jsonp';
		ajaxWrapper(url, type, data, dataType, function(res) {
			callback(res);
		});
	},
	
  render: function() {	
		return (
			<div>
				<AppHeader submitForm={this.getArtistData}/>
				<AppMain username={this.state.username} userhouse={this.state.userhouse} artistData={this.state.artistData}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;