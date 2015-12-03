// 
//	AppForm.jsx
//
//	User input 
//

var React = require('react');

var Form = React.createClass({
	
	getInitialState: function () {
    return {
      userhouse: ''
    };
  },
	
	onSubmit: function (event) {
		event.preventDefault();
	  var name = this.refs.username.value.trim();
		var house = this.state.userhouse;
		if (name && house) {
			this.props.submitForm(name, house); // hardcoded in for now
		} else {
			alert('Incomplete form, please try again.');	
		}
	},

	selectButton: function (event) {
		var buttons = document.getElementById('input-house').children;
		for (var i = 0; i < buttons.length; i++) {
			var classname = (buttons[i] == event.target) ? 'selected' : '';
			buttons[i].className = classname;
		}
		document.getElementById('app-header').className = event.target.dataset.house.toLowerCase();
		this.setState({
			userhouse: event.target.dataset.house
		});
	},

  render: function() {
		
		return (
			<form className={'input-form'} onSubmit={this.onSubmit}>
				<div id={'input-house'}>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Gryffindor" src="assets/gryffindor.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Hufflepuff" src="assets/hufflepuff.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Ravenclaw" src="assets/ravenclaw.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Slytherin" src="assets/slytherin.png"/>
					</button>
				</div>
				<input className={'input-username'} placeholder='Last.fm username' ref='username' type='text'/>
				<button className={'input-submit'} type="submit">Submit</button>
			</form>
		)
		
  }
});

module.exports = Form;
