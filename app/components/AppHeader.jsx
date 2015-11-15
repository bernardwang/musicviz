// 
//	AppHeader.jsx
//
//	Header and input 
//

var React = require('react');
var AppForm = require('./AppForm');

var AppHeader = React.createClass({
	
	onSubmit: function(event) {
		event.preventDefault();
	  var username = this.refs.username.value.trim();
		if(username){
			this.props.submitForm(username, "Slytherin"); // hardcoded in for now
		}
		this.refs.username.value = '';
	},

  render: function() {

		return (
			<header>
				<h1 className='title'> musicviz </h1>
				<AppForm submitForm = {this.props.submitForm}/>
			</header>
		)
		
  }
});

module.exports = AppHeader;
