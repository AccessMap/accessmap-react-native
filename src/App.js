import { Animated, Easing, TextInput, View } from 'react-native';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MapPage from './navigation/MapPage';
import SearchPage from './navigation/SearchPage';
import Crowdsourcing from './navigation/Crowdsourcing';

const Stack = createStackNavigator();

// Transition in and out screen animations
const transitionConfig = () => {
	return {
		transitionSpec: {
			duration: 200,
			timing: Animated.timing,
			easing: Easing.step0,
		},
	};
};

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Map"
				screenOptions={{
					transitionSpec: {
						open: transitionConfig,
						close: transitionConfig,
					},
				}}>
				<Stack.Screen
					name="Map"
					component={MapPage}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
