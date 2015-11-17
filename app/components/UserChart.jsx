// 
//  UserChart.jsx
//
//	D3 radar chart for user genres
//

var React = require('react');
var ajaxWrapper = require('../utils/ajaxWrapper');
var isObjectEmpty = require('../utils/isObjectEmpty');
var RadarChart = require('../utils/radarChart.js');

var UserChart = React.createClass({
	
	componentDidUpdate: function() {
		if(!isObjectEmpty(this.props.genreData)) {
			var element = '.'+this.props.elementName;
			var data = this.formatData();
			var options = this.getChartOptions();
			RadarChart(element, data, options);
		}
  },
	
	formatData: function(genres) {
		var genres = this.props.genreData;
		var result = [];
		var layer = [];
		
		for(var genre in genres) {
			var percent = genres[genre];
			layer.push({
				'axis': genre,
				'value': percent
			});
		}
	
		// radar chart format: [[{},{}...{}]]
		result.push(layer);
		return result;
	},
	
	getChartOptions: function() {
		var margin = {top: 100, right: 100, bottom: 100, left: 100};
		var width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right;
		var height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
		
		// draws chart
		var color = d3.scale.ordinal()
			.range(["#EDC951","#CC333F","#00A0B0"]);
		
		var radarChartOptions = {
			w: width,
			h: height,
			margin: margin,
			maxValue: 0.5,
			levels: 5,
			roundStrokes: true,
			color: color
		};
		
		return radarChartOptions;
	},

  render: function() {
		
		return (
			<div>
				<h1>{this.props.username}</h1>
				<div className={this.props.elementName}></div>
			</div>
		)
		
  }
});

module.exports = UserChart;