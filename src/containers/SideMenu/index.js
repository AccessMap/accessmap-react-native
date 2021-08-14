import React from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Image,
  NativeModules,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Fonts, Views, Position } from "../../styles";

const { Rakam } = NativeModules;

export const MenuButton = (props) => {
  return (
    <TouchableOpacity style={{ alignItems: "stretch" }} onPress={props.onPress}>
      <Text accessibilityRole="button" style={Fonts.menuItems}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

function SideMenu(props) {
  const { t, i18n } = useTranslation();
  return (
    <View style={Views.overlay}>
      <View
        style={{
          marginVertical: 20,
          flexDirection: "row",
          height: 50,
          alignContent: "space-between",
        }}
      >
        <Image
          style={[Position.fullWidthandHeight, { marginRight: 20, flex: 1 }]}
          source={require("../../../res/images/accessmap-logo.png")}
          resizeMode="contain"
          resizeMethod="scale"
        />
        <Button
          buttonStyle={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            minHeight: 50,
            minWidth: 50,
          }}
          icon={
            <Icon
              name="times"
              size={30}
              color="#555555"
              accessibilityLabel={t("Header-close-accessibilityLabel")}
            />
          }
          onPress={props.closeDrawer}
        />
      </View>

      <MenuButton
        text={t("SETTINGS")}
        onPress={() => {
          props.navigation.push(t("SETTINGS"));
          AccessibilityInfo.announceForAccessibility("Showing settings page.");
        }}
      />
      <MenuButton
        text={t("TUTORIAL")}
        onPress={() => {
          props.navigation.push(t("TUTORIAL"));
          AccessibilityInfo.announceForAccessibility("Showing tutorials page.");
        }}
      />
      <MenuButton
        text={t("ABOUT_TEXT")}
        onPress={() => {
          props.navigation.push(t("ABOUT"));
          AccessibilityInfo.announceForAccessibility("Showing about page.");
        }}
      />
    </View>
  );
}

export default SideMenu;
