// This step sets up SVG and add a title on the page.

var dataArray=[5,11,18,19,9,13,7,6,11,9,2];
var yearArray=["2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];


var width =800;
var height = 500;
var margin={left:100, right:50, top:80, bottom:0};  // curly brackets are for key-value pairs. Square brackets are for single variables.

// check in browser.
var svg=d3.select("body").append("svg").attr("height","100%").attr("width","100%");
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
// here we create a chart group because later we will add multiple elements to SVG. This makes it easy to manipulate them all together.
// transform allow us move (translate) or rotate things.


var textY=80-d3.max(dataArray); //add text. Text has X, Y, text three elements.
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .text("scatterplot");
