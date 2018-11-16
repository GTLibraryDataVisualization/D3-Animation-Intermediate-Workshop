var dataArray=[];
   for (i=0; i<20; i++){
      dataArray.push( Math.random()*20 );
   }
// console.log(dataArray);

var yearArray=["2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018"];

var parseDate =d3.timeParse("%Y");

var width =800;
var height = 500;

var margin={left:100, right:50, top:80, bottom:40};

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

var yAxis =d3.axisLeft(y).ticks(5);  // Y axis generator. It won't run until we call it later. Left tells D3 where to put the label.
var xAxis =d3.axisBottom(x);


var svg=d3.select("body").append("svg").attr("height","100%").attr("width","100%"); // step 2: set up svg
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");
    // step 6: append chart group to move things together.
chartGroup.append("g")     //step 5: append group to combine y and axis together.
  .attr("class","axis y")
  .call(yAxis);
chartGroup.append("g")     //step 5: append group to combine y and axis together.
  .attr("class","axis x")
  .attr("transform","translate(0, "+height+")")
  .call(xAxis);
chartGroup.append("g")
.selectAll("circle")
  .data(dataArray)
    .enter().append("circle")   // this chain could be understand from bottom to top
    .attr("cx", function(d, i) {return x(parseDate(yearArray[i]));})
    .attr("cy", function(d) {return y(d);})
    .attr("fill", function(d, i){ return colors(d); })
    .attr("r", function (d){ return d;});

// chartGroup.append("g")
// .selectAll("text")
// .data(dataArray)
//     .enter().append("text")
//     .attr("x", function(d, i) {return x(parseDate(yearArray[i]));})
//     .attr("y", function(d) {return y(d);})
//     .text(function (d){ return "value: "+d; }); //Rescale the dots to reflect the data.


var textY=100-d3.max(dataArray)-40; //step 3: add text
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    // .attr("font-size","22")
    // .attr("fill","brown")
    // .attr("stroke","blue")
    // .attr("stroke-width","0.5")
    .text("moving scatterplot");  // you can also use data-driven bars and circles, but it would be less cool.
