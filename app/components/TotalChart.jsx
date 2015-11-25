// 
//  TotalChart.jsx
//
//	D3 line chart for total collected data
//

var React = require('react');
var LineChart = require('../utils/lineChart.js');

var ajaxWrapper = require('../utils/ajaxWrapper');
var isObjectEmpty = require('../utils/isObjectEmpty');

var TotalChart = React.createClass({
	
	componentDidUpdate: function() {
		//console.log(this.props.data);
		if(!isObjectEmpty(this.props.data)) {
			var element = '.'+this.props.elementName;
			//var data = this.formatData();
			var options = this.getChartOptions();
			LineChart(element, this.props.data, options);
		}
  },
	
	formatData: function(genres) {
		var genres = this.props.data;
		var result = [];
		var layer = [];
		
		for(var genre in genres) {
			var percent = genres[genre];
			layer.push({
				'label': genre,
				'value': percent
			});
		}
	
		// radar chart format: [[{},{}...{}]]
		result.push(layer);
		return result;
	},
	
	getChartOptions: function() {
		var margin = {top: 50, right: 50, bottom: 50, left: 80}; // to account for y axis labels
		var width = Math.min(800, window.innerWidth - 10) - margin.left - margin.right;
		var height = Math.min(600, window.innerHeight - margin.top - margin.bottom - 20);
		
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
				<h1>{this.props.title}</h1>
				<div className={this.props.elementName}></div>
			</div>
		)
		
  }
});

module.exports = TotalChart;