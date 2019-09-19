import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { setCustomUphill } from '../../actions';

const UphillSlider = props => {
	return (
		<View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center', margin: 10 }}>
			<Text>Maximum uphill steepness: {props.incline}%</Text>
			<Slider
				value={props.incline}
				onValueChange={value => {
					props.setIncline(Math.round(value * 10) / 10);
				}}
				minimumValue={4}
				maximumValue={15}
				step={0.5}
				thumbTintColor='blue'
			/>
		</View>
	);
}

const mapStateToProps = state => {
	return {
		incline: state.customUphill,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		setIncline: (value) => {
			dispatch(setCustomUphill(value));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UphillSlider);
