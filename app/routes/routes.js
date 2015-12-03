//
//	routes.js
//	
//	Routes, views, data controller
//

var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Babel = require('babel/register');

var Genre = require('../models/Genre');	
var User = require('../models/User');
var Artist = require('../models/Artist');	

Genre.deleteAll(function() {});
User.deleteAll(function() {});

var routes = {
	index: function(req, res) {
		res.sendFile(__dirname + '/index.html')
	}
};

module.exports = routes;
