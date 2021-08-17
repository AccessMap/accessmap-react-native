import { LogBox, Text, View } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import MainStackNavigator from "./navigation/StackNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsPage from "./navigation/SettingsPage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from "./styles";
import { useTranslation } from "react-i18next";

enableScreens(true); // https://github.com/software-mansion/react-native-screens/issues/53
const Tab = createBottomTabNavigator();

function App() {
  const { t, i18n } = useTranslation();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name={t("MAP")}
          component={MainStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialCommunityIcons name="map" color={focused ? Colors.primaryColor : Colors.grey} size={35}/>
            }
          }}
        />
        <Tab.Screen 
          name={t("SETTINGS")} 
          component={SettingsPage} 
          options={{
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
