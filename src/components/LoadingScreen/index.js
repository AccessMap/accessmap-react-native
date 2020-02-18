import React from 'react';
import { View, Text } from 'react-native';

const LoadingScreen = props => {
	return (
	<View style={styles.center}>
		<View>
			<Text>Loading</Text>
		</View>
	</View>);
}

export default LoadingScreen;

const styles = {
	center: {
		position: "absolute",
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
};
