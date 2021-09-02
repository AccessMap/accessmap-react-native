// An IconButton is a touchable component containing an icon on the left 
// and descriptive text on the right.
import React from "react";
import { Buttons, Colors } from "../styles";
import { Button } from "react-native-elements";
import Icon from "../components/Icon";

export default IconButton = (props) => {
  return (
    <Button
      buttonStyle={{ ...Buttons.iconButton }}
      icon={
        <Icon
          name={props.name}
          size={35}
          color={props.label ? "#EEEEEE" : Colors.grey}
        />  
      }
      onPress={props.onPress}
      accessibilityLabel={props.accessibilityLabel}
    />
  );
};
