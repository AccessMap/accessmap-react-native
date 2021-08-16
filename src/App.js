import { LogBox } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import DrawerNavigator from "./navigation/DrawerNavigator";
import MainStackNavigator from "./navigation/StackNavigator";


LogBox.ignoreAllLogs(true); // temporarily hides the yellow warning boxes, especially for Drawer component
enableScreens(true); // https://github.com/software-mansion/react-native-screens/issues/53

function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
  );
}

export default App;
