import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Fonts } from "../styles";

export default MenuButton = (props) => {
    return (
      <TouchableOpacity onPress={props.onPress}>
        <Text accessibilityRole="button" style={Fonts.menuItems}>
          {props.text}
        </Text>
      </TouchableOpacity>
    );
};