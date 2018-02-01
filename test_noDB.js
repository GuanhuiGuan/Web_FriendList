// listen
// get -> render
// post -> add data -> redirect
var mongoose = require("mongoose");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/friends_app");
var psSchema = new mongoose.Schema({
	name: String
});
var Ps = mongoose.model("Ps", psSchema);




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// var friends = ["Will", "Jack", "Elizabeth"];

// homepage
app.get('/', (req, res) => res.render("home"));

// display friends list
app.get("/friends", function(req, res) {
	// render in friends.ejs, pass var friends(var name in ejs) with data friends
	var friends = Ps.find({}, function(err, frds) {
		if(err)	console.log("ERROR find ->" + err);
		else	console.log("Found!"); console.log(frds);
	})
	res.render("friends", {friends: friends});
});

// post a new friends
app.post("/addfriend", function(req, res) {
	console.log(req.body);
	var newFrd = req.body.newFrd;
	var newPs = new Ps({
		name: newFrd
	});
	newPs.save(function(err, newPs) {
		if(err)	console.log("ERROR -> " + err);
		else	console.log("Saved " + newPs);
	});

	// friends.push(newFrd);
	// res.send("Posting...");
	res.redirect("/friends");
});


app.listen(3000, function() {
	console.log("Server started...");
});