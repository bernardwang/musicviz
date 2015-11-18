// 
// 	lineChart.js
//
//	Adapted from RadarChart by Nadieh Bremer
//
	
var lineChart = function(id, data, options) {
	// default options
	var cfg = {
	 w: 800,											// Width of the chart
	 h: 600,											// Height of the chart
	 margin: {										//The margins of the SVG
		 top: 20, 
		 right: 20, 
		 bottom: 20, 
		 left: 20
	 },
	 levels: 4,										// How many levels should there be drawn
	 maxValue: 1, 								// What is the value that the biggest level will represent
	 labelFactor: 1.25, 					// How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 							// The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 					// The opacity of the area of the blob
	 dotRadius: 4, 								// The size of the colored circles of each blog
	 opacityCircles: 0.1, 				// The opacity of the circles of each blob
	 strokeWidth: 2, 							// The width of the stroke around each blob
	 roundStrokes: false,					// If true the area and stroke will follow a round path (cardinal)
	 color: d3.scale.category10()	//Color function
	};
	
	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allLabels = (data[0].map(function(i, j){return i.label}));	// Names of each label
	var numLabels = allLabels.length;				// The number of different labels
	var widthLabel = cfg.w/(numLabels-1);		// numLabels-1 to fit entire width of chart
	var Format = d3.format('%');			 			// Percentage formatting

	// scale for height
	var scale = d3.scale.linear()
		.range([cfg.h, 0])				// max height to 0, 0 is bottom of chart
		.domain([0, maxValue]);		// scale to maxValue
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG with margins
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "line"+id);
			
	//Append a g element
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.margin.left) + "," + (cfg.margin.top) + ")");
	
	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = 	filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	//////////////////// Draw the grid //////////////////////
	/////////////////////////////////////////////////////////
	
	// Wrapper for the grid
	var gridWrapper = g.append("g").attr("class", "gridWrapper");

	// Rectangles for each grid level
	gridWrapper.selectAll(".gridWrapper")
		.data(d3.range(1,(cfg.levels+1)).reverse())
	  .enter().append("rect")
		.attr("class", "gridRect")
		.attr("x", 0)
		.attr("y", function(d, i){return cfg.h/cfg.levels*(d-1);})
		.attr("width", cfg.w)
		.attr("height", cfg.h/cfg.levels)
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	// Text indicating at what % each level is
	gridWrapper.selectAll(".gridWrapper")
		.data(d3.range(1,(cfg.levels+1)))
		.enter().append("text")
		.attr("class", "gridText")
		.attr("x", -40)
		.attr("y", function(d){return (cfg.levels-d)*cfg.h/cfg.levels;})
		.attr("dy", "0.4em")
		.style("font-size", "10px")
		.attr("fill", "#737373")
		.text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	var gridLabel = gridWrapper.selectAll(".gridLabel")
		.data(allLabels)
		.enter();
	
	//Append the labels at each axis
	gridLabel.append("text")
		.attr("class", "gridLegend")
		.style("font-size", "9px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d,i){ return i*widthLabel; })
		.attr("y", function(d,i){ return cfg.h + 30; })
		.text(function(d){ return d })
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	// data line
	var line = d3.svg.line()
		.interpolate("linear-closed")
		.x(function(d,i) { return i*widthLabel; })
    .y(function(d,i) { return scale(d.value); });	
	
	if(cfg.roundStrokes) {
		line.interpolate("cardinal");
	}
				
	// Create a wrapper for the blobs	
	var blobWrapper = g.selectAll(".blobWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", ".blobWrapper")
		.attr("x",0)
		.attr("y",0)
		.attr("width",cfg.w)
		.attr("height",cfg.h);
	
	// area under line
	var area = d3.svg.area()
		.interpolate("cardinal")
		.x(function(d,i) { return i*widthLabel; })
		.y0(cfg.h)
		.y1(function(d) { return scale(d.value); });
	
	// Append area blobs
	blobWrapper.append("path")
		.attr("d", function(d,i) { return area(d,i); })
		.attr("class", "lineBlob")
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("fill-opacity", cfg.opacityArea)
		.on('mouseover', function (d,i){
			//Dim all blobs
			d3.selectAll(".lineBlob")
				.transition().duration(200)
				.style("fill-opacity", 0.1); 
			//Bring back the hovered over blob
			d3.select(this)
				.transition().duration(200)
				.style("fill-opacity", 0.7);	
		})
		.on('mouseout', function(){
			//Bring back all blobs
			d3.selectAll(".lineBlob")
				.transition().duration(200)
				.style("fill-opacity", cfg.opacityArea);
		});
		
	// Create line paths
	blobWrapper.append("path")
		.attr("class", "lineStroke")
		.attr("d", function(d,i) { return line(d,i); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", "none")
		.style("filter" , "url(#glow)");		
	
	// Append the data point circles and tooltip
	blobWrapper.selectAll(".lineCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "lineCircle")
		.attr("r", cfg.dotRadius)
		.attr("cx", function(d,i){ return widthLabel*i })
		.attr("cy", function(d,i){ return scale(d.value) })
		.style("fill", function(d,i,j) { return cfg.color(j); })
		.style("fill-opacity", 0.8)
		.style("pointer-events", "all")
			.on("mouseover", function(d,i) {
				newX =  parseFloat(d3.select(this).attr('cx')) - 10;
				newY =  parseFloat(d3.select(this).attr('cy')) - 10;
						
				tooltip
					.attr('x', newX)
					.attr('y', newY)
					.text(Format(d.value))
					.transition().duration(200)
					.style('opacity', 1);
			})
			.on("mouseout", function(){
				tooltip.transition().duration(200)
					.style("opacity", 0);
			});
	
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "lineToolTip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	*/
	
}//RadarChart

module.exports = lineChart;