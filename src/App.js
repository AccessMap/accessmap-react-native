import React from 'react';
import { Animated, Easing } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MapPage from './navigation/MapPage';
import SearchPage from './navigation/SearchPage';

const MainNavigator = createStackNavigator({
	Map: {screen: MapPage},
	Search: {screen: SearchPage},
	}, {
		transitionConfig : () => ({
		transitionSpec: {
			duration: 0,
			timing: Animated.timing,
			easing: Easing.step0,
		},
		}),
	});

const App = createAppContainer(MainNavigator);

export default App;
