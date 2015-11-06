// 
//	header.jsx
//
//	Site header bar
//

var React = require('react');

var Header = React.createClass({
	
	onSubmit: function(event) {
		event.preventDefault();
	  var username = this.refs.username.value.trim();
		if(username){
			this.props.submitUsername(username);
		}
	},

  render: function() {

		return (
			<header>
				<h1 className='title'> musicviz </h1>
				<form onSubmit={this.onSubmit} >
					<input className='username' placeholder='last.fm username' ref='username' type='text'/>
				</form>
			</header>
		)
		
  }
});

module.exports = Header;
