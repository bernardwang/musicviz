// 
// 	MusicApp.jsx
//
//	Entry point for React App
//

var React = require('react');
var AppHeader = require('./AppHeader');
var AppMain = require('./AppMain');

var ajaxWrapper = require('../utils/ajaxWrapper.js');
var getArtistData = require('../utils/getArtistData.js');
var getGenreData = require('../utils/getGenreData.js');

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
		getArtistData(name, function(artistData){
			if(artistData) { // no errors, valid result
				this.setState({ 
					name: name,
					house: house,
   			});
				this.createUserData(artistData);
			}
		}.bind(this));
  },
	
	/**
	 *	Creates map of top genres
	 *	Saves data in state for D3 to use
	 */
	createUserData: function(artistData) {
		getGenreData(artistData, function(genreData) {
			if(genreData) { // valid result
				this.setState({ 
					userGenres: genreData
   			});
				this.submitGenres(genreData);		// update database 
			}
		}.bind(this));
	},
	
	// temporary function to test api get
	getGenres: function() {
		var url = 'http://localhost:3001/api/music/genres';		// 3001 for browsersync
		ajaxWrapper(url, 'GET', null,'json', function(res) {
			this.setState({ 
				totalGenres: res
   		});
		}.bind(this));
	},
	
	// temporary function to test api post
	submitGenres: function(genres) {
		var url = 'http://localhost:3001/api/music/genres';		// 3001 for browsersync
		for(var key in genres){
			var data = { 
				name: key,
				value: genres[key],
				personality: this.state.house
			};
			ajaxWrapper(url, 'POST', data,'json', function(res) {
				//console.log(res);
			});
		}
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