// 
// 	main.jsx
//
//	Site header bar
//

var React = require('react');

var Header = require('./Header');
var Main = require('./Main');

var MusicApp = React.createClass({
	
  render: function() {
		
		return (
			<div>
				<Header/>
				<Main/>
			</div>
		)
		
  }
});

module.exports = MusicApp;
