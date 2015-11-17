// 
// 	AppMain.jsx
//
//	Main content
//

var React = require('react');

var UserChart = require('./UserChart');

var Main = React.createClass({
	
  render: function() {
			
		return (
			<main>
				<UserChart username={this.props.username} genreData={this.props.genreData} elementName={'userChart'}/>
			</main>
		)
		
  }
});

module.exports = Main;