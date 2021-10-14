// A Custom Card built off of React Native's native Modal that will
// slide in, has no lowered opacity outside the card, adjusts its height
// based on its content, and is stuck to the bottom of the screen.
import React, { useCallback, useEffect, useState } from "react";
import { AccessibilityInfo, Animated, View } from "react-native"; // TODO: Vibration?
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useComponentSize } from "../utils/useComponentSize";

export default function CustomCard(props) {
  // cardVisible [boolean: visibility state of the modal
  // content: [View] content to be shown in middle of card
  // const translation = useRef(new Animated.Value(0)).current;
  const [cardHasLoaded, setLoaded] = useState(false);
  const [size, onLayout] = useComponentSize(); // current size width/height
  const threshold = size ? size.height - 20 : 500;

  const translateY = new Animated.Value(0);
  useEffect(() => {
    // Sliding Animation of Card
    if (cardHasLoaded) {
      AccessibilityInfo.announceForAccessibility(
        props.cardVisible
          ? "Popup card has appeared on bottom of screen."
          : "Popup card has been closed."
      );
    } else {
      setLoaded(true);
    }
    // Animated.timing(translateY, {
    //   toValue: size ? size.height : -500,
    //   useNativeDriver: true,
    // }).start();
  }, [props.cardVisible]);

  // Defines the swipe event
  const handleSwipeEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { 
      useNativeDriver: true,
    }
  );

  // Handles the threshold interaction for dismissing the card
  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END && 
        (nativeEvent.translationY >= threshold || 
          nativeEvent.velocityY >= 1420)) {
      props.dismissCard();
    }
  };
  
  return (
    <PanGestureHandler
      onGestureEvent={handleSwipeEvent}
      onHandlerStateChange={handleStateChange}
    >
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
          transform: [{ 
            translateY: translateY.interpolate({
              inputRange: [0, threshold],
              outputRange: [0, threshold],
              extrapolate: 'clamp'
            })
          }],
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
    </PanGestureHandler>
  );
}
