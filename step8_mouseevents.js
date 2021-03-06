// The third basic animation is to adding trans.

var dataArray=[];
   for (i=0; i<20; i++){
      dataArray.push( Math.random()*20 );
   }

var yearArray=["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];
var parseDate =d3.timeParse("%Y");

var width =800,
    height = 500,
    margin={left:100, right:50, top:80, bottom:40},
    originalColor;     // create an orignalColor variable. Defined below

var y=d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([height, 0]);


var x=d3.scaleTime()
    .domain(d3.extent(yearArray, function(d, i){return parseDate(d);}))
    .range([0, width-50]);

var colors =d3.scaleLinear()
    .domain([0,
              d3.max(dataArray)*0.5,
              d3.max(dataArray)])
    .range(["#843c39", "#bd9e39", "#31a354"]);

var yAxis =d3.axisLeft(y).ticks(5);
var xAxis =d3.axisBottom(x);


var svg=d3.select("body").append("svg").attr("height","100%").attr("width","100%");
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

chartGroup.append("g")
  .attr("class","axis y")
  .call(yAxis);
chartGroup.append("g")
  .attr("class","axis x")
  .attr("transform","translate(0, "+height+")")
  .call(xAxis);

chartGroup.append("g")
.selectAll("circle")
  .data(dataArray)
    .enter().append("circle")
    .attr("cx", function(d, i) {return x(parseDate(yearArray[i]));})
    .attr("cy", function(d) {return y(d);})
    .attr("fill", function(d, i){ return colors(d); })
    .attr("r", function (d){ return d*2;})
    .attr("r", 0)
    .on("mouseover", function(d){     // .on() add mouse events, including mouseoer and mouseout.
      originalColor =this.style.fill;   // define the original color as the current color as being defined by Color function.
      d3.select(this)
      .style ("fill", "#5254a3")        // when mouse over, style change to the new color
    } )
    .on("mouseout", function(d){
      d3.select(this)
      .style("fill", originalColor)     // when mouse out, change back to the original color.
    })
   ;
chartGroup.selectAll('circle')
    .attr("r", function (d){ return d*2;});

chartGroup.append("g")
.selectAll("text")
.data(dataArray)
    .enter().append("text")
    .attr("x", function(d, i) {return x(parseDate(yearArray[i]));})
    .attr("y", function(d) {return y(d);})
    .style("opacity", 0)
    .text(function (d){ return "value: "+d; })
    .on("mouseover", function(d){
      d3.select(this)
      .style ("opacity", 1)
    })
    .on("mouseout", function(d){
      d3.select(this)
      .style ("opacity", 0)
    });


var textY=50-d3.max(dataArray);
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .attr("font-size","22")
    .attr("fill","brown")
    .attr("stroke-width","0.5")
    .text("moving scatterplot");
