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
	  var name = this.refs.username.value.trim();
		var house = this.state.userhouse;
		if(name && house){
			this.props.submitForm(name, house); // hardcoded in for now
		}
		else{
			alert('Incomplete form, please try again.');	
		}
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
					<button type="button" onClick={this.selectButton}>Gryffindor</button>
					<button type="button" onClick={this.selectButton}>Hufflepuff</button>
					<button type="button" onClick={this.selectButton}>Ravenclaw</button>
					<button type="button" onClick={this.selectButton}>Slytherin</button>
				</div>
				<input className={'input-username'} placeholder='Enter your Last.fm username' ref='username' type='text'/>
				<button className={'input-submit'} type="submit">Submit Data!</button>
			</form>
		)
		
  }
});

module.exports = Form;
