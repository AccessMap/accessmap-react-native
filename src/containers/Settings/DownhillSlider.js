import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Slider } from 'react-native-elements';
import { useTranslation } from 'react-i18next';

import { setCustomDownhill } from '../../actions';

const DownhillSlider = props => {
	const { t, i18n } = useTranslation();

	return (
		<View style={{ flex: 1, alignItems: "stretch", justifyContent: "center", margin: 10 }}>
			<Text>{t("MAX_DOWNHILL_STEEPNESS_TEXT")}: {props.incline}%</Text>
			<Slider
				value={props.incline}
				onValueChange={value => {
					props.setIncline(Math.round(value * 10) / 10);
				}}
				minimumValue={4}
				maximumValue={15}
				step={0.5}
				thumbTintColor="blue"
			/>
		</View>
	);
}

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
