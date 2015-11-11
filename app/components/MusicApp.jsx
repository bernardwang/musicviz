// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var ajaxWrapper = require('../utils/ajaxWrapper');

var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
			musicData: React.PropTypes.array
    };
  },
	
	/**
	 *	Gets top artist list from Lastfm user profile,
	 *	query every artist for genre and play count
	 *	saves data in music store for D3 to use
	 */
	updateMusic: function(username) {
		var result = [];
		var limit = 20;
		var that = this;
		
		this.userCall(username, limit, function(data) {
		
			var artists = data.topartists.artist;
			artists.forEach(function(artist, index, array) {
				
				that.artistCall(artist.name, function(data) {
					result.push({
						"name": artist.name,
						"genre": data.artist.tags.tag.slice(0,3),
						"plays": data.artist.stats.playcount,
						"count": artist.playcount
					});
				});
				
				if (index === array.length - 1) {		// last index, set result 
        	that.setState({ 
						musicData: result
    			});
        }
				
			});
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
				<AppHeader submitUsername={this.updateMusic}/>
				<AppMain data={this.state.musicData}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;
