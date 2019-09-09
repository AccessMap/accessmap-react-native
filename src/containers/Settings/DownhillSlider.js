import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { setCustomDownhill } from '../../actions';

class DownhillSlider extends Component {

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', margin: 10 }}>
				<Text>Maximum downhill steepness: {Math.round(this.props.incline * 1000) / 10}%</Text>
				<Slider
					value={this.props.incline}
					onValueChange={value => {
						this.props.setIncline(Math.round(value * 1000) / 1000);
					}}
					minimumValue={0.04}
					maximumValue={0.15}
					step={0.005}
					thumbTintColor='blue'
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	slider: {
	},
});

const mapStateToProps = state => {
	return {
		incline: state.customDownhill,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		setIncline: (value) => {
			dispatch(setCustomDownhill(value));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DownhillSlider);
