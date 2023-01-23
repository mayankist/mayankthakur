var express 		= require("express"),
	app 			= express(),
	bodyParser 		= require("body-parser"),
	mongoose 		= require("mongoose"),
	methodOverride 	= require("method-override");

var url = process.env.DATABASEURL || "mongodb+srv://Mayank:workforme@cluster0.uq1zw.mongodb.net/myprosite?retryWrites=true&w=majority";
// var url = process.env.DATABASEURLPERSONAL || "mongodb://localhost/myprosite";
mongoose.connect(url);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.locals.moment = require('moment');

var commentSchema = new mongoose.Schema({
	createdAt: { type: Date, default: Date.now },
	name: String,
	text: String
});
var Comment = mongoose.model("Comment", commentSchema);

app.get("/",function(req, res){
	res.redirect("index");
});

app.get("/writings",function(req, res){
	res.render("writings");
});

app.get("/index",function(req, res){
	Comment.find({}, function(err, allComments){
		if(err){
			console.log(err);
		} else {
			res.render("index",{comment:allComments});
		}
	});
});

app.post("/index", function(req, res){
	Comment.create(req.body.data, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/"); 
		}
	});
});

app.delete("/index/:comment_id", function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else{
			res.redirect("/");
		}
	});
});

const host = "0.0.0.0";
const port = process.env.PORT || 3001;
app.listen(port,host, function() {
  console.log("Welcome Mayank!" + port);
});