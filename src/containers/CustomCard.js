// A Custom Card built off of React Native's native Modal that will
// slide in, has no lowered opacity outside the card, adjusts its height 
// based on its content, and is stuck to the bottom of the screen.
import React, { useEffect, useRef } from "react";
import { AccessibilityInfo, Animated, View } from "react-native";

export default function CustomCard(props) {
  // cardVisible [boolean: visibility state of the modal
  // content: [View] content to be shown in middle of card
  const translation = useRef(new Animated.Value(0)).current;

  useEffect(() => { // Sliding Animation of Card
    AccessibilityInfo.announceForAccessibility(props.cardVisible ? 
      "Popup card has appeared on bottom of screen." : 
      "Popup card has been closed.");
      Animated.timing(translation, {
        toValue: props.cardVisible ? -500 : 500,
        useNativeDriver: true,
      }).start();
  }, [props.cardVisible]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        width: "100%",
        bottom: -500,
        flex: 1,
        zIndex: 50,
        flexDirection: "column",
        alignItems: "center",
        transform: [{ translateY: translation }],
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 15,
          paddingLeft: 20,
          paddingRight: 10,
          paddingBottom: 20,
        }}
      >
        {props.content}
      </View>
    </Animated.View>
  );
}
