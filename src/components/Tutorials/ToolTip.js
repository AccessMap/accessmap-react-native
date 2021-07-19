//------------------------------------------------------------------------------------------
// Custom tooltip used in tutorial onboarding screens
import React, {useState} from "react";
import { View, Text, Button } from "react-native";

// [string] toolTipPositionLeft: specify percentage from the left boundary of the screen
// [string] toolTipPositionTop: percentage from the top boundary of the screen
// [boolean] arrowUp: true if the arrow should face up

// [string] color: background color of the entire tooltip
// [string] textColor: color of the text

// [string] cardDescription: generally describes the card (ex: Route Planning)
// [int] maxStep: how many total steps there are

// [string] nextButtonText: (ex: 'Next' or 'End') text to be placed in the right button
// [string] nextStep: function to execute when pressing the 'Next'/'End' Button
export default function ToolTip({
    toolTipPositionLeft, toolTipPositionTop, 
    backgroundColor, textColor, cardDescription, maxStep,
    nextButtonColor, toolTipVariables}) {
  const [numStep, goToNextStep] = useState(0);

  console.log(numStep);

  return (
    <View style={{
        position:"absolute", 
        left: "20%",
        top: "17%",
    }}>
        
      <View // tooltip arrow
        accessible={false}
        style={{
          position: "relative",
          left: "50%",
          top: "-20%",
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
            left: toolTipPositionLeft, 
            top: toolTipPositionTop, 
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
            {toolTipVariables[numStep].heading}
          </Text>
          <Text style={{ marginBottom: 20, color: textColor }}>
            { toolTipVariables[numStep].paragraph }
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 100, opacity: toolTipVariables[numStep].showBack ? 1.0 : 0.0 }}>
              <Button
                title="Back"
                color={backgroundColor}
                onPress={() => goToNextStep(numStep - 1)}
              />
            </View>
            <View style={{ width: 100}}>
              <Button
                title="Next"
                color={nextButtonColor}
                onPress={() => goToNextStep(numStep + 1)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
