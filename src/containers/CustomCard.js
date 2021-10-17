// A Custom Card built off of React Native's native Modal that will
// slide in, has no lowered opacity outside the card, adjusts its height
// based on its content, and is stuck to the bottom of the screen.
import React, { useEffect, useRef, useState } from "react";
import { AccessibilityInfo, Animated, PanResponder, View } from "react-native"; // TODO: Vibration?
// import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useComponentSize } from "../utils/useComponentSize";

export default function CustomCard(props) {
  // cardVisible [boolean: visibility state of the modal
  // content: [View] content to be shown in middle of card
  // dismissCard: [function]

  // const translation = useRef(new Animated.Value(0)).current;
  const [cardHasLoaded, setLoaded] = useState(false);
  const [size, onLayout] = useComponentSize(); // current size width/height
  const threshold = size ? size.height - 20 : 500;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dy: pan.y,
      },
    ]),

    onPanResponderRelease: (evt) => {
      pan.setOffset(0, evt.y);
      // if (evt.y >= threshold) {
      //   props.dismissCard();
      // }
    },
  });

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

  // Handles the threshold interaction for dismissing the card
  // const handleStateChange = ({ nativeEvent }) => {
  //   console.log(nativeEvent)
  //   if (nativeEvent.state === State.END) {
  //     if (nativeEvent.translationY >= threshold || nativeEvent.velocityY >= 1420) {
  //       props.dismissCard();
  //     }
  //     translateY.setOffset(nativeEvent.translationY)
  //   }
  // };

  return (
    <Animated.View
      {...panResponder.panHandlers}
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
            translateY: pan.y.interpolate({
              inputRange: [0, threshold],
              outputRange: [0, threshold],
              extrapolate: "clamp",
            }),
          },
        ],
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
