//
//	server.js
//
//	Server side main
//

// dependencies
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./config/db');
var http = require('http');

// routes
var routes = require('./app/routes/routes');
var api = require('./app/routes/api');

// create express instance, set port
var app = express();
var port = process.env.PORT || 3000;

// configure bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to database
mongoose.connect(db.url); 
mongoose.connection.on('error', console.error.bind(console, 'Failed to connect to mongodb'));
mongoose.connection.once('open', function() {
	console.log('Connected to mongodb');
});

// set static directory
app.use('/', express.static(__dirname + '/public/'));

// index route
app.get('/', routes.index);

// use RESTful api
api(app);

// start server
var server = http.createServer(app).listen(port, function() {
	console.log('Server listening on port ' + port);
});