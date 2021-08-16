import { AccessibilityInfo, TextInput, View } from "react-native";
import * as React from "react";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

import MapPage from "./MapPage";
import SearchPage from "./SearchPage";
import Crowdsourcing from "./Crowdsourcing";

import AboutPage from "./AboutPage";
import SettingsPage from "./SettingsPage";
import TutorialPage from "./Tutorials/TutorialPage";
import MapInterfaceTutorialPage from "./Tutorials/MapInterfaceTutorialPage";
import RoutePlanningTutorialPage from "./Tutorials/RoutePlanningTutorialPage";
import SettingsTutorialPage from "./Tutorials/SettingsTutorialPage";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import DrawerNavigator from "./DrawerNavigator";

function MainStackNavigator() {
  const { t, i18n } = useTranslation();
  const Stack = createStackNavigator();

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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      {search}

      {about}
      {settings}

      {tutorial}
      {mapTutorial}
      {routeTutorial}
      {settingsTutorial}

      {crowdSourcing}
    </Stack.Navigator>
  );
}

export default MainStackNavigator;