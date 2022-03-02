// A BottomCardButton is a button on the bottom white card that appears on the Map Screen
// It requires a string title and a function to handle its onPress.
// props: title, style?, pressFunction
import React from "react";
import { Button } from "react-native-elements";
import { primaryColor } from "../../../styles/colors";

export default function BottomCardButton(props) {
  return (
    <Button
      containerStyle={[{flex: 1,}, props.style]}
      buttonStyle={{
        backgroundColor: "white",
        paddingVertical: 13,
        borderColor: primaryColor,
      }}
      titleStyle={{ fontSize: 18, color: primaryColor }}
      title={props.title}
      type="outline"
      raised={true}
      onPress={props.pressFunction}
    />
  );
}
