// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, {useState} from "react";
import { View, Image, AccessibilityInfo, Text, Button } from "react-native";
import ToolTip from "../components/Tutorials/ToolTip";

export default function TutorialPage({ route, navigation }) {
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 4;
  const textColor = "white";
  const cardDescription = "Route Planning";
  const backgroundColor ="#0F47A1";
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    { // Choose a destination with Search Bar
      "captions": 
      "Search bar located at the top of the app. Gray text inside the bar reads: Enter Address", 
      "toolTipPositionLeft":"17%", "toolTipPositionTop":"17%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-25%",
      "heading": "Find Directions",
      "paragraph":
      "Set a route start or destination by tapping on the map or entering a location in the Search Bar.",
      "showBack": false,
      "nextButtonText":"Next",
    },
    { // Grey enter icon to pick start and end
      "captions": "A gray pencil icon button next to the Mobility Mode buttons.",
      "toolTipPositionLeft":"35%", "toolTipPositionTop":"19%",
      "arrowPositionLeft":"595%", "arrowPositionTop":"-25%",
      "heading": "Find Directions",
      "paragraph":
      "Alternatively, tap on this grey icon to manually input a start and destination.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Mobility Buttons
      "captions": 
      "Mobility buttons located under the search bar in order: Custom, Wheelchair, Powered, and Cane.", 
      "toolTipPositionLeft":"13%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-25%",
      "heading": "Mobility Profile",
      "paragraph":
      "Customize your travel by selecting the mode of transportation that best fits you. As an example, the Custom Profile is currently selected.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Mobility Buttons
      "captions": "A gray pencil icon button next to the Mobility Mode buttons.",
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"550%", "arrowPositionTop":"-25%",
      "heading": "Mobility Profile",
      "paragraph":
      "While in the Custom Profile setting, tap on the pencil icon to adjust route characteristics such as sidewalk steepness.",
      "showBack": true,
      "nextButtonText":"End Tour",
    },
  ];

  console.log("numStep = " + numStep);

  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={toolTipVariables[numStep].captions}
        style={{ height: "100%", width: "100%", margin: 0, padding: 0, opacity: 0.65 }}
        source={require("../../assets/tutorial_background.png")}
        resizeMode="contain"
        resizeMethod="scale"
      />

      <ToolTip 
        backgroundColor={backgroundColor}
        textColor={textColor}
        cardDescription={cardDescription}
        numStep={numStep}
        maxStep={maxSteps}
        nextButtonColor={nextButtonColor}
        toolTipPositionLeft={toolTipVariables[numStep].toolTipPositionLeft}
        toolTipPositionTop={toolTipVariables[numStep].toolTipPositionTop}
        arrowPositionLeft={toolTipVariables[numStep].arrowPositionLeft}
        arrowPositionTop={toolTipVariables[numStep].arrowPositionTop}
        heading={toolTipVariables[numStep].heading}
        paragraph={toolTipVariables[numStep].paragraph}
        showBack={toolTipVariables[numStep].showBack}
        nextButtonText={toolTipVariables[numStep].nextButtonText}
        goToNextStep={goToNextStep}
        navigation={navigation}
      />
    </View>
  );
}
