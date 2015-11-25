// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var getUserArtists = require('../utils/getUserArtists.js');
var getUserGenres = require('../utils/getUserGenres.js');
var getGenres = require('../utils/getGenres.js');
var submitGenres = require('../utils/submitGenres.js');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
			name: '',
			house: '',
			userGenres: {},
			totalGenres: {}
    };
  },
	
	componentDidMount: function() {
		this.getGenres();	
	},
	
	/**
	 *	Gets array of top artists from Lastfm user profile
	 *	Saves data in state for D3 to use
	 */
	submitUserInfo: function(name, house) {
		getUserArtists(name, function(userArtists) {
			if(userArtists) { // no errors, valid result
				this.setState({ 
					name: name,
					house: house,
   			});
				this.createUserData(userArtists);
			}
		}.bind(this));
  },
	
	/**
	 *	Creates map of top genres
	 *	Saves data in state for D3 to use
	 */
	createUserData: function(userArtists) {
		getUserGenres(userArtists, function(userGenres) {
			if(userGenres) { // valid result
				this.setState({ 
					userGenres: userGenres
   			});
				this.submitGenres(userGenres);		// update database 
			}
		}.bind(this));
	},
	
	getGenres: function() {
		getGenres(function(genres) {
			if(genres) {
				this.setState({
					totalGenres: genres
				});
			}
		}.bind(this));
	},
	
	submitGenres: function(genres) {
		var house = this.state.house;
		submitGenres(genres, house, function(result) {
			if(!result) {
				alert('Submission error');
			}
		});
	},
	
  render: function() {	
		return (
			<div>
				<AppHeader submitForm={this.submitUserInfo}/>
				<AppMain name={this.state.name} house={this.state.house} userGenres={this.state.userGenres} totalGenres={this.state.totalGenres}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;