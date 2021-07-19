// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React from "react";
import { View, Image, AccessibilityInfo, Text, Button } from "react-native";
import ToolTip from "../components/Tutorials/ToolTip";

export default function TutorialPage({ route, navigation }) {
  const maxSteps = 5;
  const textColor = "white";
  const cardDescription = "Route Planning";
  const backgroundColor ="#0F47A1";
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    { // First Card: Choose a destination with Search Bar
      "captions": 
      "Search bar located at the top of the app. Gray text inside the bar reads: Enter Address", 
      "toolTipPositionLeft":"15%", "toolTipPositionTop":"18%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-20%",
      "heading": "Find Directions",
      "paragraph":
      "Choose the start or destination of your route by tapping on the map or entering a location via the Search Bar.",
      "showBack": false,
      "nextButtonText":"Next",
    },
    { // Mobility Buttons
      "captions": 
      "Mobility buttons located under the search bar in order: Custom, Wheelchair, Powered, and Cane.", 
      "toolTipPositionLeft":"15%", "toolTipPositionTop":"18%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-10%%",
      "heading": "Choose Mobility Setting",
      "paragraph":
      "Choose the mobility setting that best fits your transportation needs. This adjusts the routing by looking at the steepness level of sidewalks.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Mobility Buttons
      "captions": 
      "3", 
      "toolTipPositionLeft":"15%", "toolTipPositionTop":"18%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-10%%",
      "heading": "Choose Mobility Setting",
      "paragraph":
      "he steepness level of sidewalks.",
      "showBack": true,
      "nextButtonText":"Next",
    },
  ];

  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={
          "Search bar located at the top of the app, highlighted. Gray text inside the bar reads: Enter Address"
        }
        style={{ height: "100%", width: "100%", margin: 0, padding: 0, opacity: 0.75 }}
        source={require("../../assets/tutorial_background.png")}
        resizeMode="contain"
        resizeMethod="scale"
      />

      <ToolTip 
        backgroundColor={backgroundColor}
        textColor={textColor}
        cardDescription={cardDescription}
        maxStep={maxSteps}
        nextButtonColor={nextButtonColor}
        toolTipVariables={toolTipVariables}
      />
    </View>
  );
}
