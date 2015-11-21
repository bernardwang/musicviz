// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var ajaxWrapper = require('../utils/ajaxWrapper.js');
var getArtistData = require('../utils/getArtistData.js');
var getGenreData = require('../utils/getGenreData.js');
var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
			username: '',
			userhouse: '',
			artistData: [],
			genreData: {}
    };
  },
	
	/**
	 *	Gets array of top artists from Lastfm user profile
	 *	Saves data in state for D3 to use
	 */
	getArtists: function(username, userhouse) {
		var that = this;
		getArtistData(username, function(data){
			if(data) { // no errors, valid result
				that.setState({ 
					username: username,
					userhouse: userhouse,
					artistData: data
   			});
				that.getGenres();
			}
		});
  },
	
	/**
	 *	Creates map of top genres
	 *	Saves data in state for D3 to use
	 */
	getGenres: function() {
		if(this.state.artistData.length > 0) {
			var data = getGenreData(this.state.artistData);
			if(data) {
				this.setState({ 
					genreData: data
   			});
				//this.getAPI();
				this.submitAPI(data);
			}
		}
	},
	
	// temporary function to test api get
	getAPI: function(genres) {
		// 3001 for browsersync
		var url = 'http://localhost:3001/api/music/genres';
			ajaxWrapper(url, 'GET', null,'json',function(res) {
				console.log(res);
			});
	},
	
	// temporary function to test api post
	submitAPI: function(genres) {
		// 3001 for browsersync
		var url = 'http://localhost:3001/api/music/genres';
		for(var key in genres){
			var data = { 
				name: key,
				value: genres[key],
				personality: 0
			};
			ajaxWrapper(url, 'POST', data,'json',function(res) {
				console.log(res);
			});
		}
	},
	
  render: function() {	
		return (
			<div>
				<AppHeader submitForm={this.getArtists}/>
				<AppMain username={this.state.username} userhouse={this.state.userhouse} genreData={this.state.genreData}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;