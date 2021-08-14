import { AccessibilityInfo, LogBox, TextInput, View } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

import MapPage from "./navigation/MapPage";
import SearchPage from "./navigation/SearchPage";
import MapInterfaceTutorialPage from "./navigation/Tutorials/MapInterfaceTutorialPage";
import Crowdsourcing from "./navigation/Crowdsourcing";
import TutorialPage from "./navigation/Tutorials/TutorialPage";
import RoutePlanningTutorialPage from "./navigation/Tutorials/RoutePlanningTutorialPage";
import SettingsTutorialPage from "./navigation/Tutorials/SettingsTutorialPage";
import { useTranslation } from "react-i18next";
import { enableScreens } from "react-native-screens";
import AboutPage from "./navigation/AboutPage";
import SettingsPage from "./navigation/SettingsPage";

LogBox.ignoreAllLogs(true); // temporarily hides the yellow warning boxes, especially for Drawer component
enableScreens(true); // https://github.com/software-mansion/react-native-screens/issues/53
const Stack = createStackNavigator();

function App() {
  const { t, i18n } = useTranslation();

  const backButton = (navigation) => (
    <Button
      accessibilityLabel={"Select to go back"}
      icon={<Icon name="arrow-left" size={30} />}
      buttonStyle={{ backgroundColor: "transparent", margin: 5, height: 50 }}
      onPress={() => {
        navigation.goBack();
        AccessibilityInfo.announceForAccessibility("Navigated back one page");
      }}
    />
  );

  //-------------------------------------------------------------------------------------------
  // Home screen showing a mapview, top Omnicard, and bottom gradient incline key.
  const map = (
    <Stack.Screen
      name={t("MAP")}
      component={MapPage}
      options={{ headerShown: false }}
    />
  );

  const about = (
    <Stack.Screen
      name={t("ABOUT")}
      component={AboutPage}
	  options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );
  const settings = (
	<Stack.Screen
      name={t("SETTINGS")}
      component={SettingsPage}
	  options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );

  //-------------------------------------------------------------------------------------------
  // Search Page for addresses that shows after you tap the "Enter address" GeocodeBar
  const search = (
    <Stack.Screen
      name={t("SEARCH")}
      component={SearchPage}
      options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
        headerTitle: (
          <View>
            <TextInput
              placeholderTextColor="black"
              placeholder={t("GEOCODER_PLACEHOLDER_TEXT_SEARCH")}
              autoFocus={true}
              onChangeText={(search) => navigation.setParams({ search })}
            />
          </View>
        ),
      })}
    />
  );

  //-------------------------------------------------------------------------------------------
  // List of tutorials screen
  const tutorial = (
    <Stack.Screen
      name={t("TUTORIAL")}
      component={TutorialPage}
      options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );
  const mapTutorial = (
    <Stack.Screen
      name={t("MAP_INTERFACE")}
      component={MapInterfaceTutorialPage}
      options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );
  const routeTutorial = (
    <Stack.Screen
      name={t("ROUTE_PLANNING")}
      component={RoutePlanningTutorialPage}
      options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );
  const settingsTutorial = (
    <Stack.Screen
      name={t("SETTINGS_TUTORIAL")}
      component={SettingsTutorialPage}
      options={({ navigation }) => ({
        headerLeft: () => backButton(navigation),
      })}
    />
  );

  const crowdSourcing = (
    <Stack.Screen
      name={t("CROWDSOURCING")}
      component={Crowdsourcing}
      options={({ route, navigation }) => {
        const { info } = route.params;
        var footway = info.footway;
        footway = footway.charAt(0).toUpperCase() + footway.slice(1);
        return {
          title: info.description != null ? info.description : footway,
        };
      }}
    />
  );

  return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName={t("MAP")}>
			{map}
			{search}

			{about}
			{settings}

			{tutorial}
			{mapTutorial}
			{routeTutorial}
			{settingsTutorial}

			{crowdSourcing}
		</Stack.Navigator>
		</NavigationContainer>
  );
}

export default App;
