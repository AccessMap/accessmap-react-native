import React from 'react';
import { Animated, Easing } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MapPage from './navigation/MapPage';
import SearchPage from './navigation/SearchPage';
import Crowdsourcing from './navigation/Crowdsourcing';

const MainNavigator = createStackNavigator({
	Map: {screen: MapPage},
	Crowdsourcing: {screen: Crowdsourcing},
	Search: {screen: SearchPage},
	}, {
		transitionConfig : () => ({
			transitionSpec: {
				duration: 0,
				timing: Animated.timing,
				easing: Easing.step0,
			},
		}, {
			// initialRouteName: "Map",
			initialRouteName: "Crowdsourcing",
		}),
	});

const App = createAppContainer(MainNavigator);

export default App;
