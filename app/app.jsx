//
//	app.js
//
//	Client side React rendering
//

var React = require('react');
var ReactDOM = require('react-dom');

var MusicApp = require('./components/MusicApp');

// DOM node react component will be added to
var mountNode = document.body;

// Render the app to mountNode
ReactDOM.render(
	<MusicApp/>, mountNode
);