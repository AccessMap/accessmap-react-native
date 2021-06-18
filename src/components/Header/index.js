// Headers include a title text and an "X" button to close the window.
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from '../Icon';
import { Fonts } from '../../styles';

const Header = props => {
	// Props:
	// 1) title
	// 2) close function
	return (
		<View style={{flexDirection: "row", alignItems: "center", margin: 5}}>
			<Text style={ Fonts.h1 }>
				{props.title}
			</Text>
			<Button
				accessibilityLabel="Select to close those view"
				buttonStyle={{backgroundColor: "#FFFFFF", borderRadius: 20, height: 40}}
				icon={<Icon
					name="close"
					size={20}
					color="#555555"
				/>}
				onPress={props.close}
			/>
		</View>
	);
}

export default Header;
