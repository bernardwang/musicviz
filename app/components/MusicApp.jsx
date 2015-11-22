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
		var that = this;		//fix later
		getArtistData(name, function(artistData){
			if(artistData) { // no errors, valid result
				that.setState({ 
					name: name,
					house: house,
   			});
				that.createUserData(artistData);
			}
		});
  },
	
	/**
	 *	Creates map of top genres
	 *	Saves data in state for D3 to use
	 */
	createUserData: function(artistData) {
		var that = this;		//fix later
		getGenreData(artistData, function(genreData) {
			if(genreData) { // valid result
				that.setState({ 
					userGenres: genreData
   			});
				that.submitGenres(genreData);		// update database 
			}
		});
	},
	
	// temporary function to test api get
	getGenres: function() {
		// 3001 for browsersync
		var that = this;		//fix later
		var url = 'http://localhost:3001/api/music/genres';
			ajaxWrapper(url, 'GET', null,'json', function(res) {
				that.setState({ 
					totalGenres: res
   			});
			});
	},
	
	// temporary function to test api post
	submitGenres: function(genres) {
		// 3001 for browsersync
		var that = this;		//fix later
		var url = 'http://localhost:3001/api/music/genres';
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