import React, { Component } from 'react';
import { View } from 'react-native';
import { CheckBox } from 'react-native-elements';

class FeedbackForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false
		};
	}
	render() {
		return (
			<View style={{width: "100%"}}>
				<CheckBox
					title="Sidewalk not present"
					checked={this.state.checked}
				/>
				<CheckBox
					title="Not paved"
					checked={this.state.checked}
				/>
				<CheckBox
					title="Width below 3ft at some points"
					checked={this.state.checked}
				/>
			</View>);
	}
}

export default FeedbackForm;
