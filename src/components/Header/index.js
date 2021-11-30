// Headers include a title text and an "X" button to close the window.
// Panning or swiping the Header will cause the parent container to translate 
// up and down.
import React from "react";
import { View, Text, TouchableWithoutFeedback, Animated } from "react-native";
import { Button, Icon } from "react-native-elements";
import { Fonts } from "../../styles";
import { useTranslation } from "react-i18next";
import { setFocus } from "../../utils/setFocus";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const Header = (props) => {
  // Props:
  // 1) title [string]
  // 2) close [function]
  // 3) back [boolean]: true if the header should contain a back button
  // 4) goBack [function]
  // 5) panY [Animated.Value]: controls the y offset of the CustomCard the Header is in

  const { t, i18n } = useTranslation();
  const info = props.info;

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

  return (
    <PanGestureHandler
      onGestureEvent={handleSwipeEvent}
      onHandlerStateChange={handleStateChange}
    >
      <Animated.View style={{ flexDirection: "row", paddingTop: 5, justifyContent: "center", 
        alignContent: "space-between"}}>
        { props.back &&
        <Button 
          accessibilityLabel={t("Header-close-accessibilityLabel")}
          containerStyle={{margin: 0, padding: 0, left: -10, top: -5}}
          buttonStyle={{ backgroundColor: "#FFFFFF", margin: 0, padding: 0, }}
          icon={<Icon name="chevron-back" size={40} color="black" type="ionicon"/>}
          onPress={props.goBack}
        />}
        
        <View style={{ flexDirection: "row", flex: 1,}}>
          <TouchableWithoutFeedback>
            <Text accessible={true} ref={setFocus} style={[Fonts.h1]}>{props.title}</Text>
          </TouchableWithoutFeedback>
        </View>

        <Button
          accessibilityLabel={t("Header-close-accessibilityLabel")}
          buttonStyle={{ backgroundColor: "#FFFFFF", margin: 0, padding: 0, right: -5,}}
          icon={<Icon name="close" size={40} color="black"/>}
          onPress={props.close}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Header;
