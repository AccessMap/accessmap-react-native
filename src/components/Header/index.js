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
  // 2) close function
  // 3) optional Report Button next to title
  const { t, i18n } = useTranslation();
  const info = props.info;

  return (
    <View style={{ flexDirection: "row", paddingBottom: 10, justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1}}>
        <Text style={[Fonts.h1]}>{props.title}</Text>
        {props.reportButton && (
          <Button
            title={t("REPORT_ISSUE")}
            buttonStyle={{ backgroundColor: "white", marginLeft: 10, 
              paddingHorizontal: 10, paddingVertical: 12}}
            titleStyle={{ fontSize: 15, color: primaryColor }}
            icon={<Icon name="report" size={20} color={primaryColor} style={{marginRight: 10}}/>}
            accessibilityLabel={t(
              "Header-crowdsourcingInfo-accessibilityLabel"
            )}
            onPress={() => {
              props.navigation.push(t("CROWDSOURCING"), { info });
            }}
          />
        )}
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
