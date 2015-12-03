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
		// Deselect all buttons except target
		var buttons = this.refs.buttons;
		for (var i = 0; i < buttons.length; i++) {
			var classname = (buttons[i] == event.target) ? 'selected' : '';
			buttons[i].className = classname;
		}

		// Set state for submit
		this.setState({
			userhouse: event.target.dataset.house
		});

		// Change background color
		this.props.setColor(event.target.dataset.house.toLowerCase());
	},

  render: function() {
		
		return (
			<form className={'input-form'} onSubmit={this.onSubmit}>
				<div className={'input-house'} ref='buttons'>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Gryffindor" src="assets/img/gryffindor.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Hufflepuff" src="assets/img/hufflepuff.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Ravenclaw" src="assets/img/ravenclaw.png"/>
					</button>
					<button type="button" onClick={this.selectButton}>
						<img data-house="Slytherin" src="assets/img/slytherin.png"/>
					</button>
				</div>
				<input className={'input-username'} placeholder='Last.fm username' ref='username' type='text'/>
				<button className={'input-submit'} type="submit">Submit</button>
			</form>
		)
		
  }
});

module.exports = Form;
