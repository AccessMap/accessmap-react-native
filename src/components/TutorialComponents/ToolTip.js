//------------------------------------------------------------------------------------------
// Custom tooltip used in tutorial onboarding screens
import React from "react";
import { View, Text, Button } from "react-native";

export default function ToolTip({
    backgroundColor, // [string] background color of the entire tooltip
    textColor, // [string] color of the text
    cardDescription, // [string] generally describes the card (ex: Route Planning)
    numStep, // [int] current step 
    maxStep, // [int] how many total steps there are
    nextButtonColor,
    toolTipPositionLeft, // [string] percentage from the left boundary of the screen
    toolTipPositionTop, // [string] percentage from the top boundary of the screen
    arrowPositionLeft,
    arrowPositionTop,
    heading, // [string] bold heading text
    paragraph, // [string] smaller detail text
    showBack, // [boolean] show the back button
    nextButtonText, // [string] (ex: 'Next' or 'End') text to be placed in the right button
    goToNextStep, // [function] executed when pressing the 'Next'/'End' Button
    navigation, // [navigation] ability to close the current screen
  }) {

  return (
    <View style={{
        position:"absolute", 
        left: toolTipPositionLeft,
        top: toolTipPositionTop,
    }}>
        
      <View // tooltip arrow
        accessible={false}
        style={{
          position: "relative",
          left: arrowPositionLeft,
          top: arrowPositionTop,
          width: 30,
          height: 30,
          backgroundColor: backgroundColor,
          zIndex: 98,
          transform: [{ rotate: "45deg" }],
        }}
      ></View>

      <View // tooltip rectangle box
        style={{ 
            position: "absolute", 
            zIndex: 99 
        }}
      >
        <View
          style={{
            width: 250,
            padding: 15,
            backgroundColor: backgroundColor,
            borderRadius: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
              { cardDescription }
            </Text>
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
                {numStep + 1}{"/"}{maxStep}
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: textColor,
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            {heading}
          </Text>
          <Text style={{ marginBottom: 20, color: textColor }}>
            { paragraph }
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 100, opacity: showBack ? 1.0 : 0.0 }}>
              <Button
                disabled={!showBack}
                title="Back"
                color={backgroundColor}
                onPress={() => goToNextStep(numStep - 1)}
              />
            </View>
            <View style={{ width: 100}}>
              <Button
                title={nextButtonText}
                color={nextButtonColor}
                onPress={() => { 
                  console.log("nS=" + numStep);
                  if (numStep >= maxStep - 1) {
                    console.log("closing nav");
                    navigation.goBack();
                  } else {
                    goToNextStep(numStep + 1) 
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
