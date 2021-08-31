import { LogBox } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import MainStackNavigator from "./navigation/StackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsPage from "./navigation/SettingsPage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "./styles";
import { useTranslation } from "react-i18next";
import { Logger } from "@react-native-mapbox-gl/maps";

LogBox.ignoreAllLogs(true); // hides the yellow warning boxes
enableScreens(true); // https://github.com/software-mansion/react-native-screens/issues/53
const Tab = createBottomTabNavigator();

// Suppresses Mapbox warning and error messages
Logger.setLogCallback(log => {
  const { message } = log;
  if ( // Mapbox expected log output when zooming in and out or panning
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed') ||
    message.includes("Failed to load")
  ) {
    return true;
  }
  return false;
});


function App() {
  const { t, i18n } = useTranslation();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={t("HOME")}>
        <Tab.Screen
          name={t("MAP")}
          component={MainStackNavigator}
          options={{
            headerShown: false,
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarInactiveTintColor: Colors.grey,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialCommunityIcons name={"map"} color={focused ? Colors.primaryColor : Colors.grey} size={35}/>
            }
          }}
        />
        <Tab.Screen 
          name={t("SETTINGS")} 
          component={SettingsPage} 
          options={{
            tabBarActiveTintColor: Colors.primaryColor,
            tabBarInactiveTintColor: Colors.grey,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialCommunityIcons name="cog" color={focused ? Colors.primaryColor : Colors.grey} size={35}/>
            }
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
