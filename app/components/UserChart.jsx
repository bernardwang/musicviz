// 
//  UserChart.jsx
//
//	D3 radar chart for user genres
//

var React = require('react');

var RadarChart = require('../utils/radarChart.js');

var UserChart = React.createClass({
	
	componentDidUpdate: function() {
		if(this.props.artistData.length > 0) {
			var element = '.'+this.props.elementName;
			var data = this.getChartData(this.props.artistData);
			var options = this.getChartOptions();
			RadarChart(element, data, options);
		}
  },
	
	getChartData: function(artists) {
		var result = [];	// final data radar chart accepts as input
		var layer = [];	// single layer/color of data on chart
		var genres = {};
		var totalplays = 0;
		
		// combines genre data from artists
		for(var i = 0; i < artists.length; i++) {
			var artist = artists[i];
			var genre = artist.genre[0].name;		// for now getting first genre tag
			genre = genre.toLowerCase().replace(/[\s-]+/g, ''); // normalize text
			totalplays += parseInt(artist.plays);
			if (genres[genre] === undefined){
				genres[genre] = parseInt(artist.plays);
			}
			else {
				genres[genre] += parseInt(artist.plays);
			}
		}
		
		// formats data for d3
		for(var genre in genres) {
			var percent = genres[genre]/totalplays;
			if(percent >= 0.03) {
				layer.push({
					'axis': genre,
					'value': percent
				});
			}
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
			<div className={this.props.elementName}></div>
		)
		
  }
});

module.exports = UserChart;