// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var getArtistData = require('../utils/getArtistData.js');
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
	 *	Gets top artist list from Lastfm user profile
	 *	Saves data in music store for D3 to use
	 */
	getArtists: function(username, userhouse) {
		var that = this;
		getArtistData(username,function(data){
			if(data) { // no errors, valid result
				that.setState({ 
					username: username,
					userhouse: userhouse,
					artistData: data
   			});
			}
		});
  },
	
  render: function() {	
		return (
			<div>
				<AppHeader submitForm={this.getArtists}/>
				<AppMain username={this.state.username} userhouse={this.state.userhouse} artistData={this.state.artistData}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;