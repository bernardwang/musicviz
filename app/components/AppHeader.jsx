// 
//	AppHeader.jsx
//
//	Header and input 
//

var React = require('react');
var AppForm = require('./AppForm');

var AppHeader = React.createClass({

  render: function () {

		return (
			<header id={'app-header'}>
				<AppForm submitForm={this.props.submitForm}/>
			</header>
		)
		
  }
});

module.exports = AppHeader;
