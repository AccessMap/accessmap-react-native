// React Navigation Drawer, slide right or tap the hamburger menu button to activate
// Treated as the root navigator of the app
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import AboutPage from "./AboutPage";
import SettingsPage from "./SettingsPage";
import TutorialPage from "./Tutorials/TutorialPage";
import MapPage from "./MapPage";

const Drawer = createDrawerNavigator();

export default DrawerNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <Drawer.Navigator>
      <Drawer.Screen name={t("MAP")} component={MapPage} />
      <Drawer.Screen name={t("SETTINGS")} component={SettingsPage} />
      <Drawer.Screen name={t("TUTORIAL")} component={TutorialPage} />
      <Drawer.Screen name={t("ABOUT")} component={AboutPage} />
    </Drawer.Navigator>
  );
};
