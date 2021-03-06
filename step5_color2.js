var dataArray=[5,11,18,19,9,13,7,6,11,9,2];
var yearArray=["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];

var parseDate =d3.timeParse("%Y"); //Y is four digit year, y is two digit year.
console.log(d3.extent(yearArray, function(d, i){return parseDate(d);})); //extent generates min and max.


var width =800;
var height = 500;
var margin={left:100, right:50, top:80, bottom:40};

var y=d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([height, 0]);

var x=d3.scaleTime()
    .domain(d3.extent(yearArray, function(d, i){return parseDate(d);}))
    .range([0, width-50]);

var colors =d3.scaleLinear()        // scale color by the length of the array, which means the points are colors by the order of them on xAxis.
    .domain([0, dataArray.length])
    .range(["#843c39", "#bd9e39"]);

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
    .enter().append("circle")   // this chain could be understand from bottom to top
    .attr("cx", function(d, i) {return x(parseDate(yearArray[i]));})
    .attr("cy", function(d) {return y(d);})
    .attr("fill", function(d, i){ return colors(i); })
    .attr("r", function (d){ return d;});

var textY=100-d3.max(dataArray)-40; //add text and style it.
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .attr("font-size","22")
    .attr("fill","brown")
    .attr("stroke-width","0.5")
    .text("moving scatterplot");
