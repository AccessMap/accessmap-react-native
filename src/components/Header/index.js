import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Header = props => {
	// Props:
	// 1) title
	// 2) close function
	return (
		<View style={{flexDirection: "row", alignItems: "center", margin: 5}}>
			<Text style={{flex: 1, fontSize: 20, fontWeight: "bold"}}>
				{props.title}
			</Text>
			<Button
				buttonStyle={{backgroundColor: "#FFFFFF", borderRadius: 20, marginRight: 5, height: 40}}
				icon={<Icon
					name="times"
					size={20}
					color="#555555"
				/>}
				onPress={() => {
					props.close();
				}}
			/>
		</View>
	);
}

export default Header;
