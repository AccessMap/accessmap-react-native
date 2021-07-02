import React from 'react';
import { Animated, Easing } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import MapPage from "./navigation/MapPage";
import SearchPage from "./navigation/SearchPage";
import Crowdsourcing from "./navigation/Crowdsourcing";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" component={MapPage} />
        <Stack.Screen name="Crowdsourcing" component={Crowdsourcing} />
        <Stack.Screen name="Search" component={SearchPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
