// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var getUserData = require('../utils/getUserData.js');
var getGenres = require('../utils/getGenres.js');
var submitGenres = require('../utils/submitGenres.js');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
			name: '',				// user's lastfm username
			house: '',			// user's harry potter house 
			userData: [],		// D3 data for userChart
			totalData: []		// D3 data for totalChart
    };
  },
	
	componentDidMount: function() {
		this.getGenres();	
	},

	/**
	 *	Gets list of user's top genres
	 *	Submits data to DB
	 *
	 * 	TODO: Cleanup getUserData
	 */
	submitUserData: function(name, house) {
		getUserData(name, function(userGenres, userData) { 	// returns data in two different formats, kind of messy
			if(userData){ // no errors, valid result					
				this.setState({
					name: name,
					house: house,
					userData: userData
				});
				this.submitGenres(userGenres);	
			}
		}.bind(this));
  },
	
	/**
	 *	Gets total genres from DB
	 */
	getGenres: function() {
		getGenres(function(genres) {
			if(genres) {
				this.setState({
					totalData: genres
				});
			}
		}.bind(this));
	},
	
	/**
	 *	Posts user genres to DB
	 */
	submitGenres: function(genres) {
		var house = this.state.house;
		submitGenres(genres, house, function(result) {
			if(result){
				
			}
			else {
				alert('Unable to submit user data, please try again');
			}
		});
	},
	
  render: function() {	
		return (
			<div>
				<AppHeader submitForm={this.submitUserData}/>
				<AppMain name={this.state.name} house={this.state.house} userData={this.state.userData} totalData={this.state.totalData}/>
			</div>
		)
	}
		
});

module.exports = MusicApp;