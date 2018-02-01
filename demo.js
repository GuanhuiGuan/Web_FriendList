var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/demo_app");

// create a schema
var pplSchema = new mongoose.Schema({
	name: String,
	age: Number,
	job: String
});

// schema to object with all mongodb methods
var ppl = mongoose.model("ppl", pplSchema);

// new object
var john = new ppl({
	name: "john",
	age: "21",
	job: "SDE"
})

// // save object to DB
// john.save(function(err, ppl) {
// 	if(err) {
// 		console.log("Save failed!");
// 	}
// 	else {
// 		console.log("Saved!");
// 		console.log(ppl);
// 	}
// });

// create object
ppl.create({
	name: "Alice",
	age: 21,
	job: "SDE Intern"
}, function(err, ppl) {
	if(err)	console.log(err);
	else	console.log(ppl);
})


// find objects
ppl.find({}, function(err, ppl){
	if(err) {
		console.log("Error!");
		console.log(err);
	}
	else {
		console.log("Found" + ppl);
	}
})
