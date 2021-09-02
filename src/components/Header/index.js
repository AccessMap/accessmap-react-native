// Headers include a title text and an "X" button to close the window.
import React from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Colors, Fonts } from "../../styles";
import { useTranslation } from "react-i18next";
import { primaryColor } from "../../styles/colors";

const Header = (props) => {
  // Props:
  // 1) title
  // 2) close
  // 3) optional Report Button next to title
  const { t, i18n } = useTranslation();
  const info = props.info;

  return (
    <View style={{ flexDirection: "row", paddingBottom: 10, justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1}}>
        <Text style={[Fonts.h1]}>{props.title}</Text>
      </View>

      <Button
        accessibilityLabel={t("Header-close-accessibilityLabel")}
        buttonStyle={{ backgroundColor: "#FFFFFF" }}
        icon={<Icon name="close" size={35} color="black"/>}
        onPress={props.close}
      />
    </View>
  );
};

export default Header;
