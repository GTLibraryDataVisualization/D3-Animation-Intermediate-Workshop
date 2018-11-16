var dataArray=[5,11,18,19,9,13,7,6,11,9,2];
var yearArray=["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];

var width =800;
var height = 500;
var margin={left:100, right:50, top:80, bottom:40};

var y=d3.scaleLinear()
    .domain([0, d3.max(dataArray)])
    .range([height, 0]);

var parseDate =d3.timeParse("%Y");
// console.log(d3.extent(yearArray, function(d, i){return parseDate(d);}));

var x=d3.scaleTime()
    .domain(d3.extent(yearArray, function(d, i){return parseDate(d);}))
    .range([0, width-50]);

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

//draw circles (moon)
chartGroup.append("g")
.selectAll("circle")  // selectAll function is usually confusing. I understand it as I decide to use circle for all data points.
  .data(dataArray)
    .enter().append("circle")   // this chain could be understand from bottom to top
    .attr("cx", function(d, i) { return x(parseDate(yearArray[i]));} )
    .attr("cy", function(d){ return y(d);})
    .attr("r", "5");
    // .attr("cx", function(d, i) {return x(parseDate(yearArray[i]));})
    // .attr("cy", function(d) {return y(d);})
    // .attr("r", "5"); //show static and data drive R.

var textY=100-d3.max(dataArray)-40; //add text
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .attr("font-size","22")
    .attr("fill","brown")
    .attr("stroke-width","0.5")
    .text("scatterplot");  // you can also use data-driven bars and circles, but it would be less cool.
