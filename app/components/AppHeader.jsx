// 
//	AppHeader.jsx
//
//	Header and input 
//

var React = require('react');

var Header = React.createClass({
	
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
				<form onSubmit={this.onSubmit} >
					<input className='username' placeholder='Enter your Last.fm username' ref='username' type='text'/>
				</form>
			</header>
		)
		
  }
});

module.exports = Header;
