// Headers include a title text and an "X" button to close the window.
import React from "react";
import { View, Text } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Colors, Fonts } from "../../styles";
import { useTranslation } from "react-i18next";

const Header = (props) => {
  // Props:
  // 1) title
  // 2) close function
  // 3) optional Report Button next to title
  const { t, i18n } = useTranslation();
  const info = props.info;

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <Text style={Fonts.h1}>{props.title}</Text>
        {props.reportButton && (
          <Button
            icon={<Icon name="report" size={32} color={Colors.error} />}
            buttonStyle={{ backgroundColor: "#FFFFFF", borderRadius: 20 }}
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
        buttonStyle={{ backgroundColor: "#FFFFFF", borderRadius: 20 }}
        icon={<Icon name="close" size={32} color="black" />}
        onPress={props.close}
      />
    </View>
  );
};

export default Header;
