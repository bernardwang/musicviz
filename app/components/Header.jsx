// 
//	header.jsx
//
//	Site header bar
//

var React = require('react');

var Header = React.createClass({
	
  render: function() {
		
		return (
			<header>
				<h1 className='title'> musicviz </h1>
				<form>
					<input className='username' placeholder="last.fm username" type="text"/>
				</form>
			</header>
		)
		
  }
});

module.exports = Header;
