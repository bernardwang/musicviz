// 
// 	main.jsx
//
//	Site header bar
//

var React = require('react');
var ajaxWrapper = require('../utils/ajaxWrapper');

var Header = require('./Header');
var Main = require('./Main');

var MusicApp = React.createClass({
	
	getInitialState: function() {
    return {
      username: ''
    };
  },
	
	submitUsernameAction: function(username) {
		this.setState({ 
			username: username
    })
  },
	
	apiCall: function(user) {
		if(user) {
			var url = 'http://ws.audioscrobbler.com/2.0/';
			var type = 'POST';
			var data = 	'method=artist.getinfo&' +
           				'artist=After+The+Burial&' +
           				'api_key=57ee3318536b23ee81d6b27e36997cde&' +
           				'format=json';
			var dataType = 'jsonp';
			ajaxWrapper(url, type, data, dataType, function(res) {
				console.log(res);
				return res;
			});
		}
		return '';
	},
	
  render: function() {	
		
		var api = 'test';
		
		return (
			<div>
				<Header submitUsername={this.submitUsernameAction} />
				<Main test={api}/>
			</div>
		)
		
  }
});

module.exports = MusicApp;
