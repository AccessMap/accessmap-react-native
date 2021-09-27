import { AccessibilityInfo, TextInput, View } from "react-native";
import * as React from "react";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";

import MapPage from "./MapPage";
import SearchPage from "./SearchPage";
import Crowdsourcing from "./Crowdsourcing";

import InformationPage from "./Information/InformationPage";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { mapLoaded } from "../actions";

function MainStackNavigator() {
  const { t, i18n } = useTranslation();
  const Stack = createStackNavigator();

  let isLoading = useSelector((state: RootState) => state.isLoading);
  const dispatch = useDispatch();

  const backButton = (navigation) => (
    <Button
      accessibilityLabel={"Select to go back"}
      icon={<Icon name="arrow-left" size={25} />}
      buttonStyle={{ backgroundColor: "transparent", margin: 5, height: 50, width: 50 }}
      onPress={() => {
        navigation.goBack();
        Keyboard.dismiss();
        if (isLoading) { dispatch(mapLoaded()); }
        AccessibilityInfo.announceForAccessibility("Navigated back one page");
      }}
    />
  );

  //-------------------------------------------------------------------------------------------
  // Home screen showing a mapview, top Omnicard, and bottom gradient incline key.
  const map = (
    <Stack.Screen
      name="mappage"
      component={MapPage}
      options={{ headerShown: false }}
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
        headerTitle: () => (
          <TextInput
            placeholderTextColor="black"
            placeholder={t("GEOCODER_PLACEHOLDER_TEXT_SEARCH")}
            autoFocus={true}
            onChangeText={(search) => navigation.setParams({ search })}
          />
        ),
      })}
    />
  );

  //-------------------------------------------------------------------------------------------
  // List of tutorials screen
  const tutorial = (
    <Stack.Screen
      name={t("INFORMATION")}
      component={InformationPage}
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
          headerLeft: () => backButton(navigation),
        };
      }}
    />
  );
  return (
    <Stack.Navigator>
      {map}
      {search}

      {tutorial}

      {crowdSourcing}
    </Stack.Navigator>
  );
}

export default MainStackNavigator;