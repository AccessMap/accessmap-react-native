import { AccessibilityInfo, Animated, Easing, LogBox, TextInput, View } from 'react-native';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import MapPage from './navigation/MapPage';
import SearchPage from './navigation/SearchPage';
import MapInterfaceTutorialPage from './navigation/Tutorials/MapInterfaceTutorialPage';
import Crowdsourcing from './navigation/Crowdsourcing';
import TutorialPage from './navigation/Tutorials/TutorialPage';
import RoutePlanningTutorialPage from './navigation/Tutorials/RoutePlanningTutorialPage';
import SettingsTutorialPage from './navigation/Tutorials/SettingsTutorialPage';
import { useTranslation } from 'react-i18next';

LogBox.ignoreAllLogs(true); // temporarily hides the yellow warning boxes, especially for Drawer component
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
	const { t, i18n } = useTranslation();
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={t("MAP")}
				screenOptions={{
					transitionSpec: {
						open: transitionConfig,
						close: transitionConfig,
					},
				}}>
				<Stack.Screen
					name={t("MAP")}
					component={MapPage}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name={t("SEARCH")}
					component={SearchPage}
					options={({ navigation }) => ({
						headerLeftContainerStyle: {
							width: '100%',
						},
						headerLeft: () => (
							<Button
								accessibilityLabel={"Select to go back to map screen"}
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => {
									navigation.goBack();
									AccessibilityInfo.announceForAccessibility("Showing home screen with map view");
								}}
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
					name={t("TUTORIAL")}
					component={TutorialPage}
					options={({ navigation }) => ({
						headerLeft: () => (
							<Button
								accessibilityLabel={"Select to go back to Map Screen"}
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => {
									navigation.goBack();
									AccessibilityInfo.announceForAccessibility("Showing home screen with map view");
								}}
							/>
						),
					})}
				/>
				<Stack.Screen
					name={t("MAP_INTERFACE")}
					component={MapInterfaceTutorialPage}
					options={({ navigation }) => ({
						headerLeft: () => (
							<Button
								accessibilityLabel={"Select to go back to Tutorial Page"}
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => {
									navigation.goBack();
									AccessibilityInfo.announceForAccessibility("Showing tutorials screen");
								}}
							/>
						),
					})}
				/>
				<Stack.Screen
					name={t("ROUTE_PLANNING")}
					component={RoutePlanningTutorialPage}
					options={({ navigation }) => ({
						headerLeft: () => (
							<Button
								accessibilityLabel={"Select to go back to Tutorial Page"}
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => {
									navigation.goBack();
									AccessibilityInfo.announceForAccessibility("Showing tutorials screen");
								}}
							/>
						),
					})}
				/>
				<Stack.Screen
					name={t("SETTINGS_MENU")}
					component={SettingsTutorialPage}
					options={({ navigation }) => ({
						headerLeft: () => (
							<Button
								accessibilityLabel={"Select to go back to Tutorial Page"}
								icon={<Icon name="arrow-left" size={20} />}
								buttonStyle={{ backgroundColor: 'transparent', margin: 5 }}
								onPress={() => {
									navigation.goBack();
									AccessibilityInfo.announceForAccessibility("Showing tutorials screen");
								}}
							/>
						),
					})}
				/>

				<Stack.Screen
					name={t("CROWDSOURCING")}
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
