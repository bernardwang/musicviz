// 
// 	AppMain.jsx
//
//	Main content
//

var React = require('react');
var UserChart = require('./UserChart');
var TotalChart = require('./TotalChart');

var Main = React.createClass({
	
  render: function() {
			
		// Will not display title until data is submitted
		var UserTitle = (this.props.username) ? this.props.username+"'s Top Genres" : '';
		var TotalTitle = (this.props.username) ? "Current Top Genres" : '';
		
		return (
			<main>
				<UserChart title={UserTitle} genreData={this.props.genreData} elementName={'userChart'}/>
				<TotalChart title={TotalTitle} genreData={this.props.genreData} elementName={'totalChart'}/>
			</main>
		)
		
  }
});

module.exports = Main;