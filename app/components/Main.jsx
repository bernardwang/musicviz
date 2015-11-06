// 
// 	main.jsx
//
//	Site header bar
//

var React = require('react');

var Main = React.createClass({
	
  render: function() {
		var display = this.props.test;
		
		return (
			<main>
				{display}
			</main>
		)
		
  }
});

module.exports = Main;