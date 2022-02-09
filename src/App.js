import { LogBox, Platform } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./navigation/StackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsPage from "./navigation/SettingsPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, Fonts } from "./styles";
import { useTranslation } from "react-i18next";
import { Logger } from "@react-native-mapbox-gl/maps";
import CustomBottomTabBar from "./components/CustomBottomTabBar";
import { deepLinking } from "./constants/urls";
import LoadingScreen from "./components/LoadingScreen";
import { postHogSetup } from "./utils/posthog-config";
import { RootState } from "./reducers";
import PostHog from "posthog-react-native";
import { useSelector } from "react-redux";
import { checkLatestiOSAppVersion } from "./utils/checkAppVersion";
import ProfilePage from "./navigation/ProfilePage";

if (Platform.OS === "ios") {
  checkLatestiOSAppVersion();
}

postHogSetup();
PostHog.disable(); // disables user tracking by default
const Tab = createBottomTabNavigator();

//-------------------------------------------------------------------------------------------------
// Suppresses Mapbox-related warning and error messages
LogBox.ignoreAllLogs(true); // hides the yellow warning boxes
console.reportErrorsAsExceptions = false;
Logger.setLogCallback((log) => {
  const { message } = log;
  if (
    // Mapbox expected log output when zooming in and out or panning
    message.match("Request failed due to a permanent error: Canceled") ||
    message.match("Request failed due to a permanent error: Socket Closed") ||
    message.includes("Failed to load")
  ) {
    return true;
  }
  return false;
});

//-------------------------------------------------------------------------------------------------
function App() {
  const { t, i18n } = useTranslation();
  let trackUser = useSelector(
    (state: RootState) => state.setting.trackUserActions
  );
  if (trackUser) {
    PostHog.enable();
  }

  const navigation = (
    <NavigationContainer
      linking={deepLinking}
      fallback={<LoadingScreen isLoading={true} />}
    >
      <Tab.Navigator
        tabBar={(props) => <CustomBottomTabBar {...props} />}
        initialRouteName={t("HOME")}
        screenOptions={{
          tabBarActiveTintColor: Colors.primaryColor,
          tabBarInactiveTintColor: Colors.grey,
          tabBarLabelStyle: Fonts.p,
        }}
      >
        <Tab.Screen
          name={t("MAP")}
          component={MainStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name={"map"}
                  color={focused ? Colors.primaryColor : Colors.grey}
                  size={35}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={t("User")}
          component={ProfilePage}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="account"
                  color={focused ? Colors.primaryColor : Colors.grey}
                  size={35}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name={t("SETTINGS")}
          component={SettingsPage}
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="cog"
                  color={focused ? Colors.primaryColor : Colors.grey}
                  size={35}
                />
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

  return navigation;
}

export default App;
