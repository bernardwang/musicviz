// 
// 	AppMain.jsx
//
//	Main content
//

var React = require('react');
var D3 = require('./D3Chart.js');
var Main = React.createClass({
	
	componentDidUpdate: function() {
		if(this.props.artistData.length > 0) {
			D3(this.props.artistData);
		}
  },

  render: function() {
		//Call function to draw the Radar chart
		var d3ElementName = 'radarChart';

		return (
			<main>
				<div className={d3ElementName}></div>
			</main>
		)
		
  }
});

module.exports = Main;