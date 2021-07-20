// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, {useState} from "react";
import { View, Image, AccessibilityInfo} from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function SettingsTutorialPage({ route, navigation }) {
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 3;
  const textColor = "white";
  const cardDescription = "Map Interface";
  const backgroundColor ="#0F47A1";
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    { // Hamburger menu button
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": 
      "Trip information details: ", 
      "toolTipPositionLeft":"3%", "toolTipPositionTop":"12%",
      "arrowPositionLeft":"100%", "arrowPositionTop":"-50%",
      "heading": "Open Menu",
      "paragraph":
      "Tap on this button to open the settings menu.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Tracking
      "background_image": require("../../../assets/drawer_menu.png"),
      "captions": 
      "Trip information details: ", 
      "toolTipPositionLeft":"28%", "toolTipPositionTop":"54%",
      "arrowPositionLeft":"200%", "arrowPositionTop":"-50%",
      "heading": "Toggle Settings",
      "paragraph":
      "Toggling this will allow the app to track the actions you take in this app. Your information is kept completely confidential.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Units
      "background_image": require("../../../assets/drawer_menu.png"),
      "captions": 
      "Trip information details: ", 
      "toolTipPositionLeft":"28%", "toolTipPositionTop":"62%",
      "arrowPositionLeft":"300%", "arrowPositionTop":"-50%",
      "heading": "Toggle Settings",
      "paragraph":
      "Toggling this will change the units displayed in the app.",
      "showBack": true,
      "nextButtonText":"End Tour",
    },
  ];

  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={toolTipVariables[numStep].captions}
        style={{ height: "100%", width: "100%", margin: 0, padding: 0, opacity: 0.65 }}
        source={toolTipVariables[numStep].background_image}
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
