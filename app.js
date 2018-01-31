// listen
// get -> render
// post -> add data -> redirect

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
var friends = ["Will", "Jack", "Elizabeth"];

// homepage
app.get('/', (req, res) => res.render("home"));

// display friends list
app.get("/friends", function(req, res) {
	// render in friends.ejs, pass var friends(var name in ejs) with data friends
	res.render("friends", {friends: friends});
});

// post a new friends
app.post("/addfriend", function(req, res) {
	console.log(req.body);
	var newFrd = req.body.newFrd;
	friends.push(newFrd);
	// res.send("Posting...");
	res.redirect("/friends");
});


app.listen(3000, function() {
	console.log("Server started...");
});