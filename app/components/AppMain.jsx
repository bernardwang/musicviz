// 
// 	AppMain.jsx
//
//	Main content
//

var React = require('react');
var UserChart = require('./UserChart');
var TotalChart = require('./TotalChart');

var Main = React.createClass({
	
  render: function () {
			
		// Will not display title until data is submitted
		var UserTitle = (this.props.name) ? this.props.name + "'s Top Genres" : '';
		var TotalTitle = "Top Genres by House";
		
		return (
			<section className={'app-main'}>
				<UserChart title={UserTitle} data={this.props.userData} elementName={'userChart'}/>
				<TotalChart title={TotalTitle} data={this.props.totalData} elementName={'totalChart'}/>
			</section>
		)
		
  }
});

module.exports = Main;
