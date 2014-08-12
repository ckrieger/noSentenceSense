// modules =================================================
var express = require('express');
var app     = express();
var mongoose= require('mongoose');
var session = require('express-session'),
    uuid = require('node-uuid');

// configuration ===========================================
	
// config files

//var mongoUri = 'mongodb://localhost/noSentenceSense';
var mongoUri = "mongodb://chris:noSentenceSense@kahana.mongohq.com:10042/app28165760"; 
console.log("mongoUri: " + mongoUri);
mongoose.connect(mongoUri);

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
// 

app.use(session({ genid: function(req) {
                       	return uuid.v1()}, 
  				  secret : 'scienceBitch'}));

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser()); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app