d3.json("data/ages.json").then((data)=> {

	data.forEach((d)=>{

		d.age = +d.age;

	});

	console.log(data);

});