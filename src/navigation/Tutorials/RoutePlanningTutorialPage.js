// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, {useState} from "react";
import { View, Image, AccessibilityInfo} from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function RoutePlanningTutorialPage({ route, navigation }) {
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 6;
  const textColor = "white";
  const cardDescription = "Route Planning";
  const backgroundColor ="#0F47A1";
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    { // choose start and destination
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": 
      "Home screen with the grey enter button on the top right highlighted. The Map view of Seattle is shown as an example below.", 
      "toolTipPositionLeft":"35%", "toolTipPositionTop":"20%",
      "arrowPositionLeft":"580%", "arrowPositionTop":"-50%",
      "heading": "Select Locations",
      "paragraph":
      "Tap on this grey Enter button or the map to enter a start and destination for your route.",
      "showBack": false,
      "nextButtonText":"Next",
    },
    { // choose start and destination
      "background_image": require("../../../assets/example_route.png"),
      "captions": 
      "Two search bars on top of each other, a cancel button to the right, and a reverse button on the bottom right. The top search bar contents read: Pike Place Market. The bottom one reads: Gum Walls.", 
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"19%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-50%",
      "heading": "Select Locations",
      "paragraph":
      "In this example, Pike Place Market is set as the route start and Gum Wall is set as the destination. ",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Reverse and Cancel
        "background_image": require("../../../assets/example_route.png"),
        "captions": 
        "Two search bars on top of each other, a cancel button to the right, and a reverse button on the bottom right. The top search bar contents read: Pike Place Market. The bottom one reads: Gum Walls.", 
        "toolTipPositionLeft":"35%", "toolTipPositionTop":"20%",
        "arrowPositionLeft":"595%", "arrowPositionTop":"-50%",
        "heading": "Select Locations",
        "paragraph":
        "The top right button cancels selecting a route, and the bottom right button reverses the start and destination.",
        "showBack": true,
        "nextButtonText":"Next",
    },
    { // Trip information general card
     "background_image": require("../../../assets/example_route.png"),
    "captions": 
      "A white card containing route information. The example route is 0.12 miles long and approximately 7 minutes to take. A button on the left reads: Trip info, the right one reads: Directions.", 
      "toolTipPositionLeft":"18%", "toolTipPositionTop":"53%",
      "arrowPositionLeft":"200%", "arrowPositionTop":"620%",
      "heading": "Route Information",
      "paragraph":
      "Tap the buttons to reveal trip information and step-by-step directions.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Specific Trip information card
        "background_image": require("../../../assets/example_trip_details.png"),
        "captions": 
        "Trip information details: ", 
        "toolTipPositionLeft":"20%", "toolTipPositionTop":"22%",
        "arrowPositionLeft":"200%", "arrowPositionTop":"560%",
        "heading": "Route Details",
        "paragraph":
        "Scroll down to view trip data such as elevation change.",
        "showBack": true,
        "nextButtonText":"Next",
    },
    { // Specific Direction steps card
        "background_image": require("../../../assets/example_directions.png"),
        "captions": 
        "Trip information details: ", 
        "toolTipPositionLeft":"15%", "toolTipPositionTop":"25%",
        "arrowPositionLeft":"200%", "arrowPositionTop":"560%",
        "heading": "Directions",
        "paragraph":
        "Scroll down to view step-by-step directions for your route.",
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
