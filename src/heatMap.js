/**
 * this d3 file renders a d3 heat map using different metrices
 * for example correlation matrix etc
 * 
 * @ author shweta purushe
 */

if(!this.d3_Vizzies){
	this.d3_Vizzies = {};
}

(function(){
	
	function heatMap (){
		this._container;
		this._margin;
		this._width;
		this._height;
		this._heatMapSvg;
		
		this._colScale;
		this._rowScale;
		this._rowObjects;
		this._rowCells;

		this._colorScale;
		this._toolTip;
		
		this._data;
		this._labels;
	}
	
	var p = heatMap.prototype;
	
	window.d3_Vizzies.heatMap = heatMap;
	
	
	//initializes the heat map 
	p.initialize_heatMap = function(config){
		
		this._margin =  {top: 100, right: 20, bottom: 20, left: 100};
		this._container = config.container;
		
		this._width = this._container.offsetWidth - this._margin.left - this._margin.right;
		this._height = this._container.offsetHeight - this._margin.top - this._margin.bottom;

		//original SVG
		this._heatMapSvg = d3.select(this._container).append("svg")
			.attr("width", this._width )
			.attr("height",this._height );
		
		this._data = config.matrix_data;
		this._labels = config.labels;
		
		  // Scaling Functions
		this._rowScale = d3.scale.linear().range([0, this._width]).domain([0,this._data.length]);

		this._colScale = d3.scale.linear().range([0, this._height]).domain([0,this._data.length]);

		//toolTip
		this._toolTip = d3.select(this._container)
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.text("");
	};
	
	/**
	 * function to draw a heatmap using a matrix
	 *  dom_element_to_append_to: the HTML element to which the heatmap D3 viz is appended
	 *  data: the computed matrix   
	 *  columnTitles required for labeling the matrix
	 */
	p.render_heatMap = function(){
		
		var hmObj = this;
		
		if(!hmObj._heatMapSvg){
			console.log("Heat Map still initializing");
			setTimeout(p.render_heatMap, 100);
		}
		
		this.setColor();

		// remove all previous items before render
	    if(hmObj._heatMapSvg)
	    	hmObj._heatMapSvg.selectAll('*').remove();
	    else
	    	return;
		
		
		//row creation
	    hmObj._rowObjects = hmObj._heatMapSvg.selectAll(".row")//.row is a predefined grid class
						.data(hmObj._data)
						.enter().append("svg:g")
						.attr("class", "row");
		
		//appending text for row
	    hmObj._rowObjects.append("text")
	      .attr("x", -1)
	      .attr("y", function(d, i) { return hmObj._colScale(i); })
	      .attr("dy", "1")
	      .attr("text-anchor", "end")
	      .text(function(d, i) { return hmObj._labels[i]; });

	    hmObj._rowCells = hmObj._rowObjects.selectAll(".cell")
		    			.data(function (d,i)
				    		{ 
				    			return d.map(function(a) 
				    				{ 
				    					return {value: a, row: i};} ) ;
							})//returning a key function
			           .enter().append("svg:rect")
			             .attr("x", function(d, i) {  return hmObj._rowScale(i); })
			             .attr("y", function(d, i) { return hmObj._colScale(d.row); })
			             .attr("width", hmObj._rowScale(1))
			             .attr("height", hmObj._colScale(1))
			             .style("fill", function(d) { return hmObj._colorScale(d.value);})
			             .style('stroke', "black")
			             .style('stroke-width', 1)
			             .style('stroke-opacity', 0)
			             .on('mouseover', function(d){ hmObj._toolTip.style('visibility', 'visible' ).text(d.value); 
			             							   d3.select(this).style('stroke-opacity', 1);})
			             .on("mousemove", function(){return hmObj._toolTip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
			             .on('mouseout', function(){ hmObj._toolTip.style('visibility', 'hidden'); 
			             							 d3.select(this).style('stroke-opacity', 0);});
	};
	
	//sets the color of the heat map
	p.setColor = function(){//to parameterize color scales
		var colorLow = 'green', colorMed = 'yellow', colorHigh = 'red';

		this._colorScale = d3.scale.linear()
		     .domain([0, 0.5, 1.0])//TODO parameterize this according to the matrix  
		     .range([colorLow, colorMed, colorHigh]);
	};
})();

