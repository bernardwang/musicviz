// 
//	AppForm.jsx
//
//	User input 
//

var React = require('react');

var Form = React.createClass({
	
	getInitialState: function() {
    return {
      userhouse: ''
    };
  },
	
	onSubmit: function(event) {
		event.preventDefault();
	  var username = this.refs.username.value.trim();
		var house = this.state.personality;
		if(username && house){
			this.props.submitForm(username, house); // hardcoded in for now
		}
		this.refs.username.value = '';
	},

	selectButton: function(event) {
		var buttons = document.getElementById('input-house').children;
		for(var i = 0; i < buttons.length; i++) {
			var classname = (buttons[i]==event.target) ? 'selected' : '';
			buttons[i].className = classname;
		}
		this.setState({
			userhouse: event.target.innerHTML	
		});
	},

  render: function() {
		
		return (
			<form className={'input-form'} onSubmit={this.onSubmit}>
				<div id={'input-house'}>
					<button onClick={this.selectButton}>Gryffindor</button>
					<button onClick={this.selectButton}>Hufflepuff</button>
					<button onClick={this.selectButton}>Ravenclaw</button>
					<button onClick={this.selectButton}>Slytherin</button>
				</div>
				<input className='input-username' placeholder='Enter your Last.fm username' ref='username' type='text'/>
			</form>
		)
		
  }
});

module.exports = Form;
