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


// search styling content
app.use(express.static("public"));





// _____________________MAIN CODE_________________
// home
app.get("/", (req, res) => res.render("pages/home"));


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
	// sort friends ascendingly
	var mysort = {name: 1};
	Frd.find({}, function(err, frds) {
		if(err)	console.log("Error -> " + err);
		else {
			console.log("Found!");
			console.log(frds);
			res.render("pages/friends", {Frds: frds});
		}
	}).sort(mysort);
});

// add friend
app.post("/addfriend", function(req, res) {
	console.log(req.body);
	var input_name = req.body.frd;

	// // find if same name exist to avoid duplicate
	// Frd.find({name: input_name}, function(err, frds) {
	// 	if(err)	console.log("Error -> " + err);
	// 	else {
	// 		// if duplicate found, quit
	// 		if(frds !== []) {
	// 			res.redirect("/friends");
	// 		}
	// 	}
	// })

	// add new friend
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