// 
//  UserChart.jsx
//
//	D3 radar chart for user genres
//

var React = require('react');
var RadarChart = require('../utils/radarChart.js');

var ajaxWrapper = require('../utils/ajaxWrapper');
var CONST = require('../utils/constants.js');

var UserChart = React.createClass({

	componentDidUpdate: function () {
		if (this.props.data.length > 0) {
			var element = '.' + this.props.elementName;
			var data = this.props.data;
			var options = this.getChartOptions();
			RadarChart(element, data, options);
		}
	},

	getChartOptions: function () {
		var margin = {
			top			: 100,
			right		: 100,
			bottom	: 100,
			left		: 100
		};
		var width = Math.min(650, window.innerWidth - 10) - margin.left - margin.right;
		var height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

		// draws chart
		var color = d3.scale.ordinal()
			.range(["#981b1e", "#fcd209", "#3758a7", "#116a35"]);

		var radarChartOptions = {
			w: width,
			h: height,
			margin: margin,
			maxValue: 0.5,
			levels: 5,
			roundStrokes: true,
			color: color,
			colorIndex: CONST.houseToIndex[this.props.house]
		};

		return radarChartOptions;
	},

	render: function () {

		return (
			<div>
				<h1>{this.props.title}</h1>
				<div className={this.props.elementName}></div>
			</div>
		)

	}
});

module.exports = UserChart;
