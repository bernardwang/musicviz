// 
//	AppForm.jsx
//
//	User input 
//

var React = require('react');

var Form = React.createClass({
	
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
			<form onSubmit={this.onSubmit}>
				<div>
					<button>Gryffindor</button>
					<button>Hufflepuff</button>
					<button>Ravenclaw</button>
					<button>Slytherin</button>
				</div>
				<input className='username' placeholder='Enter your Last.fm username' ref='username' type='text'/>
			</form>
		)
		
  }
});

module.exports = Form;
