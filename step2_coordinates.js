// This step creates coordinate system based on two columns of data, and style it.

var dataArray=[5,11,18,19,9,13,7,6,11,9,2];
var yearArray=["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];

var width =800;
var height = 500;
var margin={left:100, right:50, top:80, bottom:40};

var y=d3.scaleLinear()         // Use scale function to scale the data to the space of SVG.
    .domain([0, d3.max(dataArray)])     //Input data
    .range([height, 0]);            //Output on the scale. Since D3 has "0,0" at left top, flip it to match the height with the smallest value in the dataset.

var parseDate =d3.timeParse("%Y"); //Y is four digit year, y is two digit year.
// console.log(d3.extent(yearArray, function(d, i){return parseDate(d);})); //extent generates min and max

var x=d3.scaleTime()    //Use scaleTime for year. Before this, needs to parse yearArray into time data format.
    .domain(d3.extent(yearArray, function(d){return parseDate(d);}))  // D3 function extent finds the min and max of an array.
    .range([0, width]);

var yAxis =d3.axisLeft(y).ticks(5);   //use axis function to match scaled values to xAxis and yAxis.
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


var textY=80-d3.max(dataArray); //add text
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .attr("font-size","22")
    .attr("fill","brown")
    .attr("stroke-width","0.5")
    .text("scatterplot");  // you can also use data-driven bars and circles, but it would be less cool.
