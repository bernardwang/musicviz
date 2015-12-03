// 
//	AppHeader.jsx
//
//	Header and input 
//

var React = require('react');
var AppForm = require('./AppForm');

var AppHeader = React.createClass({

	getInitialState: function () {
    return {
			house: '',			// user's harry potter house
    };
  },

	setSelection: function (house) {
		this.setState({
			house: ' '+house
		})
	},

  render: function () {

		return (
			<section className={'app-header'+this.state.house}>
				<h1 className={'title'}>Muggle Music</h1>
				<AppForm setColor={this.setSelection} submitForm={this.props.submitForm}/>
			</section>
		)
		
  }
});

module.exports = AppHeader;
