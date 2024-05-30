d3.json("data/revenues.json").then(function(data) {

    var margin = {top: 20, right: 20, bottom: 70, left: 70},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("body")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
              .domain(data.map(function(d) { return d.month; }))
              .range([0, width])
              .padding(0.1);

    var y = d3.scaleLinear()
              .domain([0, d3.max(data, function(d) { return +d.revenue; })])
              .range([height, 0]);

    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x))
       .selectAll("text")
       .style("text-anchor", "end")
       .attr("dx", "-0.5em")
       .attr("dy", "0.15em")
       .attr("transform", "rotate(-65)");

    svg.append("g")
       .call(d3.axisLeft(y));

    svg.selectAll(".bar")
       .data(data)
       .enter().append("rect")
       .attr("class", "bar")
       .attr("x", function(d) { return x(d.month); })
       .attr("width", x.bandwidth())
       .attr("y", function(d) { return y(+d.revenue); })
       .attr("height", function(d) { return height - y(+d.revenue); });

    svg.append("text")
       .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
       .style("text-anchor", "middle")
       .text("Month");
    svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x", 0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text("Revenue");

});