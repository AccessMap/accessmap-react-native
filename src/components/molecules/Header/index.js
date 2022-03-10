// Headers include a title text and an "X" button to close the window.
// Panning or swiping the Header will cause the parent container to translate
// up and down.
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  AccessibilityInfo,
} from "react-native";
import { Button } from "react-native-elements";
import { Colors, Fonts } from "../../../styles";
import { useTranslation } from "react-i18next";
import { setFocus } from "../../../utils/setFocus";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  // Props:
  // 1) title [string]
  // 2) close? [function]
  // 3) back [boolean]: true if the header should contain a back button
  // 4) goBack [function]
  // 5) panY [Animated.Value]: controls the y offset of the CustomCard the Header is in

  const { t, i18n } = useTranslation();
  // const info = props.info;

  const threshold = 500;
  const handleSwipeEvent = Animated.event(
    [{ nativeEvent: { translationY: props.panY } }],
    { useNativeDriver: true }
  );

  // Handles the threshold interaction for dismissing
  const handleStateChange = ({ nativeEvent }) => {
    props.panY.extractOffset(); // prevents jumping to initial state
    // console.log(nativeEvent)
    if (nativeEvent.state === State.END) {
      if (
        nativeEvent.translationY >= threshold ||
        nativeEvent.velocityY >= 1420
      ) {
        // props.dismissCard();
      }
    }
  };

  const renderBackButton = () => {
    if (!props.back) {return null;}
    return (
      <Button
        accessibilityLabel={t("BACK")}
        icon={<Icon accessible={false}  name="angle-left" size={40} />}
        buttonStyle={{backgroundColor: "transparent", margin: 0, 
          padding: 0, paddingHorizontal: 10}}
        containerStyle={{ margin: 0, paddingTop: 0, left: -10, height: 60}}
        onPress={props.goBack}
      />
    );
  };

  const renderCloseButton = () => {
    if (!props.close) {return null;}
    return (
      <Button
        accessibilityLabel={t("Header-close-accessibilityLabel") || "Close"}
        buttonStyle={{
          backgroundColor: "#FFFFFF", margin: 0, left: 10, top: -6, padding: 0, paddingHorizontal: 5,}}
        icon={<Icon2 accessible={false} name="close-outline" size={45} color="black" />}
        onPress={props.close}
      />
    );
  };

  return (
    <PanGestureHandler
      onGestureEvent={handleSwipeEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignContent: "space-between",
          alignItems: "flex-start",
          paddingTop: 5
        }}
      >
        {renderBackButton()}

        <View style={{ flexDirection: "row", flex: 1 }}>
          <TouchableWithoutFeedback>
            <Text accessible={true} ref={setFocus} style={[Fonts.h1]}>
              {props.title}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        {renderCloseButton()}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Header;
