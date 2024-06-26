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

const svg = d3.select("#chart-area").append("svg")
	.attr("width", 600)
	.attr("height", 400)

const x = d3.scaleBand()
	.domain(data.map(d => d.name))
	.range([0, 400])
	.paddingInner(0.3)
	.paddingOuter(0.3);

const y = d3.scaleLinear()
	.domain([0, 828])
	.range([400, 0]);

const color = d3.scaleOrdinal()
	.domain(data.map(d => d.name))
	.range(d3.schemeSet3);

svg.selectAll(".bar")
	.data(data)
	.enter()
	.append("rect")
	.attr("class", "bar")
	.attr("x", d => x(d.name))
	.attr("y", d => y(d.height))
	.attr("width", x.bandwidth())
	.attr("height", d => 400 - y(d.height))
	.attr("fill", d => color(d.name));