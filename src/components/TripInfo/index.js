import React from 'react';
import { Text, View } from 'react-native';

import Header from '../Header';

const TripInfo = props => {
	console.log(props);
	return (
		<View>
			<View>
				<Header
					title="Route Information"
					close={props.close}
				/>
			</View>
			<View>
				<Text>Experienced elevation gain</Text>
			</View>
		</View>
	);
}

export default TripInfo;
