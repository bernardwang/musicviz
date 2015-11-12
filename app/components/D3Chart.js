// 
// 	D3Chart.js
//
//	D3 visualizations using radarChart
//

var RadarChart = require('../utils/radarChart.js');

// setup
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


/**
 *	Takes list of artists and 
 *	constructs list of genre percentages
 */
var constructData = function(artists) {
	var result = [];
	var layer = [];
	var genres = {};
	var totalplays = 0;
	
	for(var i = 0; i < artists.length; i++) {
		var artist = artists[i];
		var genre = artist.genre[0].name;
		//genre = genre.toLowerCase().replace(/\s+/g, ''); // normalize text
		totalplays += parseInt(artist.plays);
		if (genres[genre] === undefined){
			genres[genre] = parseInt(artist.plays);
		}
		else {
			genres[genre] += parseInt(artist.plays);
		}
	};
	
	for(var genre in genres) {
		layer.push({
			'axis': genre,
			'value': (genres[genre])/totalplays
		});
	}
	
	// radar chart format: [[{},{}...{}]]
	result.push(layer);
	return result;
}

//Call function to draw the Radar chart
var init = function(artists){
	var data = constructData(artists);
	RadarChart(".radarChart", data, radarChartOptions);
}

module.exports = init;