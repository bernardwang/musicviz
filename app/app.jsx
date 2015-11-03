//
//	app.js
//
//	Client side React rendering

var React = require('react');
var ReactDOM = require('react-dom');

// DOM node react component will be added to
var mountNode = document.body;

// Render the app, picking up where react left off on the server
ReactDOM.render(
	<h1>hello world</h1>, mountNode
);