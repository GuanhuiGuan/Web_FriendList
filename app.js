// set up database
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test_app");
// create collection Frd
var frdSchema = new mongoose.Schema({
	name: String
});
var Frd = mongoose.model("Frd", frdSchema);

// set up bodyparser
var bodyParser = require("body-parser");

// set up server
var express = require("express");
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");





// _____________________MAIN CODE_________________
// home
app.get("/", (req, res) => res.render("home"));


// // save a sample friend
// var john = new Frd({
// 	name: "John"
// });
// john.save(function(err, frd) {
// 	if(err) {
// 		console.log("Error!");
// 		console.log(err);
// 	}
// 	else {
// 		console.log("Saved a new object!");
// 		console.log(frd);
// 	}
// })

// display friend list
app.get("/friends", function(req, res) {
	Frd.find({}, function(err, frds) {
		if(err)	console.log("Error -> " + err);
		else {
			console.log("Found!");
			console.log(frds);
			res.render("friends", {Frds: frds});
		}
	})
});

// add friend
app.post("/addfriend", function(req, res) {
	console.log(req.body);
	var input_name = req.body.frd;
	var newFrd = new Frd({
		name: input_name
	});
	newFrd.save(function(err, frd) {
		if(err)	console.log("Error -> " + err);
		else {
			console.log("Saved!");
			console.log(frd);
		}
	})

	res.redirect("/friends");
})

// add friend
app.post("/delfriend", function(req, res) {
	console.log(req.body);
	var input_name = req.body.frd;
	var myquery = {name: input_name};
	Frd.remove(myquery, function(err, obj) {
		if(err)	console.log("Error -> " + err);
		else {
			console.log(obj + "deleted!");
		}
	})

	res.redirect("/friends");
})

app.listen(3000, (req, res) => console.log("SERVER STARTED!"));