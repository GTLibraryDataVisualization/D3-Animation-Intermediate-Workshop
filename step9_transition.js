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
    originalColor;

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
    .attr("r", 0)      // Step 2: add radius to 0 so at the beginnning it doesn't show on svg.
    .on("mouseover", function(d){
      originalColor =this.style.fill;
      d3.select(this)
      .transition()  // Step 1: transition() function gives you a little more control over how fast / slow you want the change to happen.
      .delay(400)
      .duration(1000)
      .style ("fill", "#5254a3")
    } )
    .on("mouseout", function(d){
      d3.select(this)
      .transition()  // Step1: if you add a transition function to start, also add a transition to roll back.
      .delay(400)
      .duration(1000)
      .style("fill", originalColor)
    });

 chartGroup.selectAll('circle')   // Come down and modify the radius to be twice of the data value and ask it to transition at the speed of 1000ms.
       .transition()
       .delay(function(d, i){
           return i*1000;
        })
       .duration(1000)
       .ease(d3.easeBounceOut)
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




var textY=100-d3.max(dataArray)-40;
svg.append("text")
    .attr("x","50")
    .attr("y",textY)
    .attr("font-size","22")
    .attr("fill","brown")
    .attr("stroke-width","0.5")
    .text("moving scatterplot");
