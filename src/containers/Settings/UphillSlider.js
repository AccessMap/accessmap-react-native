import React from 'react';
import { TouchableWithoutFeedback, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';

import { setCustomUphill } from '../../actions';
import { MAX_UPHILL_STEEPNESS_TEXT } from '../../utils/translations';

const UphillSlider = props => {
	const minValue = 4;
	const maxValue = 15;
	var nextIncline = (props.incline + 0.5 - minValue) % (maxValue - minValue + 0.5) + minValue

	return (
		<View style={{ flex: 1, alignItems: "stretch", justifyContent: "center", margin: 10 }}>
			<TouchableWithoutFeedback onPress={() => props.setIncline(nextIncline)}>
				<Text>{MAX_UPHILL_STEEPNESS_TEXT}: {props.incline}%</Text>
			</TouchableWithoutFeedback>
			<Slider
				value={props.incline}
				onValueChange={value => {
					props.setIncline(Math.round(value * 10) / 10);
				}}
				minimumValue={minValue}
				maximumValue={maxValue}
				step={0.5}
				thumbTintColor="blue"
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
