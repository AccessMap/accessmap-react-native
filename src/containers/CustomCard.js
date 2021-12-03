// A Custom Card built off of React Native's native Modal that will
// slide in, has no lowered opacity outside the card, adjusts its height
// based on its content, and is stuck to the bottom of the screen.

// The Custom Card will translate up and down according to a PanGestureHandler
// inside a Header (top text of a card). This avoids conflict with nested
// FlatLists and ScrollViews.
import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, View } from "react-native"; // TODO: Vibration?
import { useComponentSize } from "../utils/useComponentSize";

export default function CustomCard(props) {
  // Props:
  // 1) cardVisible [boolean: visibility state of the modal
  // 2) content: [View] content to be shown in middle of card
  // 3) dismissCard: [function]
  // 4) panY: [Animated.Value] refers to a value to be translated to

  const [cardHasLoaded, setLoaded] = useState(false);
  const [size, onLayout] = useComponentSize(); // current size width/height
  const threshold = size ? size.height - 25 : 500;

  useEffect(() => {
    if (cardHasLoaded) {
      AccessibilityInfo.announceForAccessibility(
        props.cardVisible
          ? "Popup card has appeared on bottom of screen."
          : "Popup card has been closed."
      );
    } else {
      setLoaded(true);
    }
  }, [props.cardVisible]);

  const content = (
    <Animated.View
      onLayout={onLayout}
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        flex: 1,
        zIndex: 50,
        flexDirection: "column",
        alignItems: "center",
        transform: [
          {
            translateY: props.panY.interpolate({
              inputRange: [0, threshold],
              outputRange: [0, threshold],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
    >
      <View
        accessible={true}
        style={{
          backgroundColor: "white",
          width: "100%",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingTop: 10,
          paddingHorizontal: 18,
        }}
      >
        {props.content}
      </View>
    </Animated.View>
  );
  return <View>{content}</View>;
}
