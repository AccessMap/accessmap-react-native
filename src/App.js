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
				<Stack.Screen
					name="Search"
					component={SearchPage}
					options={({ navigation }) => ({
						headerLeftContainerStyle: {
							width: '100%',
						},
						headerLeft: () => (
							<Button
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => navigation.goBack()}
							/>
						),
						headerTitle: (
							<View
								style={{
									flexDirection: 'row',
									width: '100%',
									alignItems: 'center',
								}}>
								<TextInput
									style={{ flex: 1 }}
									placeholder="Search address"
									autoFocus={true}
									onChangeText={search => navigation.setParams({ search })}
								/>
							</View>
						),
					})}
				/>
				<Stack.Screen
					name="Crowdsourcing"
					component={Crowdsourcing}
					options={({ route, navigation }) => {
						const { info } = route.params;
						var footway = info.footway;
						footway = footway.charAt(0).toUpperCase() + footway.slice(1)
						return {
							title: info.description != null ? info.description : footway,
						}
					}}
				/>
			</Stack.Navigator>

		</NavigationContainer>
	);
}

export default App;
