// 
// 	AppMain.jsx
//
//	Main content
//

var React = require('react');

var UserChart = require('./UserChart');

var Main = React.createClass({
	
  render: function() {
		//Call function to draw the Radar chart
		var d3ElementName = 'userChart';

		return (
			<main>
				<UserChart artistData={this.props.artistData} elementName={d3ElementName}/>
			</main>
		)
		
  }
});

module.exports = Main;