const data = [
	{ "name": "Burj Khalifa", "height": "828", "country": "UAE" },
	{ "name": "Shanghai Tower", "height": "632", "country": "China" },
	{ "name": "Abraj Al-Bait Clock Tower", "height": "601", "country": "Saudi Arabia" },
	{ "name": "Ping An Finance Centre", "height": "599", "country": "China" },
	{ "name": "Golding Finance 117", "height": "596.6", "country": "China" },
	{ "name": "Lotte World Tower", "height": "554.5", "country": "South Korea" },
	{ "name": "One World Trade Center", "height": "541.3", "country": "United States" },
	{ "name": "Guangzhou CTF Finance Center", "height": "530", "country": "China" },
	{ "name": "Tianjin CTF Finance Center", "height": "530", "country": "China" },
	{ "name": "China Zun", "height": "528", "country": "China" }
];

const margin = { left: 100, right: 10, top: 10, bottom: 100 };
const width = 600 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const svg = d3.select("#chart-area").append("svg")
	.attr("width", 600)
	.attr("height", 400);

const g = svg.append("g")
	.attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
	.domain(data.map(d => d.name))
	.range([0, width])
	.paddingInner(0.3)
	.paddingOuter(0.3);

const y = d3.scaleLinear()
	.domain([0, 828])
	.range([height, 0]);

const color = d3.scaleOrdinal()
	.domain(data.map(d => d.name))
	.range(d3.schemeSet3);

var rects = g.selectAll("rect").data(data);

rects.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", d => x(d.name))
	.attr("y", d => y(d.height))
	.attr("width", x.bandwidth())
	.attr("height", d => height - y(d.height))
	.attr("fill", d => color(d.name));

g.append("g")
	.attr("class", "x-axis")
	.attr("transform", `translate(0,${height})`)
	.call(d3.axisBottom(x))
	.selectAll("text")
	.attr("transform", "rotate(-40)")
	.attr("x", -5)
	.attr("y", 10)
	.style("text-anchor", "end");

g.append("g")
	.attr("class", "y-axis")
	.call(d3.axisLeft(y).ticks(5).tickFormat(d => `${d}m`));

g.append("text")
	.attr("class", "axis-label")
	.attr("x", width / 2)
	.attr("y", height + 140)
	.attr("text-anchor", "middle")
	.text("The World's Tallest Buildings");

g.append("text")
	.attr("class", "axis-label")
	.attr("x", -(height / 2))
	.attr("y", -60)
	.attr("text-anchor", "middle")
	.attr("transform", "rotate(-90)")
	.text("Height (m)");