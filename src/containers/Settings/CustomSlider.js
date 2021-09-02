// An CustomSlider contains a Slider for which the user may
// adjust the steepness levels of either Uphill or Downhill steepness.
import React from 'react';
import { TouchableWithoutFeedback, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from 'react-native-elements';

import { setCustomDownhill, setCustomUphill } from '../../actions';
import { Colors, Fonts } from '../../styles';

export default function CustomSlider(props) { // t("MAX_UPHILL_STEEPNESS_TEXT")
	// props: title, uphill [boolean]
	let incline = useSelector((state: RootState) => props.uphill ? state.customUphill : state.customDownhill)

	const dispatch = useDispatch();
	const minValue = 4;
	const maxValue = 15;
	var nextIncline = (incline + 0.5 - minValue) % (maxValue - minValue + 0.5) + minValue;

	return (
		<View style={{ flex: 1, justifyContent: "center", margin: 10 }}>
			<TouchableWithoutFeedback 
			onPress={() => {
				dispatch(props.uphill ? 
					setCustomUphill(nextIncline): setCustomDownhill(nextIncline));
			}}>
				<Text style={[Fonts.p]}>{props.title}: {incline}%</Text>
			</TouchableWithoutFeedback>
			<Slider
				value={incline}
				onValueChange={value => { 
					dispatch(props.uphill ? 
						setCustomUphill(Math.round(value * 10) / 10) : 
						setCustomDownhill(Math.round(value * 10) / 10));
				}}
				minimumValue={minValue}
				maximumValue={maxValue}
				step={0.5}
				trackStyle={{height: 10, borderRadius: 20}}
				minimumTrackTintColor={Colors.primaryColor}
				thumbStyle={{ height: 25, width: 25}}
				thumbTintColor={Colors.primaryColor}
			/>
		</View>
	);
};
