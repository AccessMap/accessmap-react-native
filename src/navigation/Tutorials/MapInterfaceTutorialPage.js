// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, {useState} from "react";
import { View, Image, AccessibilityInfo} from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function MapInterfaceTutorialPage({ route, navigation }) {
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 7;
  const textColor = "white";
  const cardDescription = "Map Interface";
  const backgroundColor ="#0F47A1";
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    { // Choose a destination with Search Bar
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": 
      "Search bar located at the top of the app. Gray text inside the bar reads: Enter Address", 
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"18%",
      "arrowPositionLeft":"80%", "arrowPositionTop":"-50%",
      "heading": "Find Directions",
      "paragraph":
      "Set a route start or destination by tapping on the map or entering a location in the Search Bar.",
      "showBack": false,
      "nextButtonText":"Next",
    },
    { // Grey enter icon to pick start and end
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": "A gray pencil icon button next to the Mobility Mode buttons.",
      "toolTipPositionLeft":"35%", "toolTipPositionTop":"19%",
      "arrowPositionLeft":"595%", "arrowPositionTop":"-50%",
      "heading": "Find Directions",
      "paragraph":
      "Alternatively, tap on this grey icon to manually input a start and destination.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Mobility Buttons
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": 
      "Mobility buttons located under the search bar in order: Custom, Wheelchair, Powered, and Cane.", 
      "toolTipPositionLeft":"13%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-50%",
      "heading": "Mobility Profile",
      "paragraph":
      "Customize your travel by selecting the mode of transportation that best fits you. As an example, the Custom Profile is currently selected.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Pencil icon to customize
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": "A gray pencil icon button next to the Mobility Mode buttons.",
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"550%", "arrowPositionTop":"-50%",
      "heading": "Mobility Profile",
      "paragraph":
      "While in the Custom Profile setting, tap on the pencil icon to adjust route characteristics such as sidewalk steepness.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Zoom in out, find my location button
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": "Three circular buttons on the bottom right of the map. The top one has a target symbol, the middle has a Plus icon, the bottom has a minus icon.",
      "toolTipPositionLeft":"10%", "toolTipPositionTop":"65%",
      "arrowPositionLeft":"785%", "arrowPositionTop":"250%",
      "heading": "Adjusting the Map", 
      "paragraph":
      "These buttons control your view of the map. The top one centers your location, the middle zooms in, and the bottom zooms out.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Rainbow legend
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": "A rainbow-colored scale representing sidewalk incline levels. Black text below it reads: Speed at incline %.",
      "toolTipPositionLeft":"15%", "toolTipPositionTop":"52%",
      "arrowPositionLeft":"200%", "arrowPositionTop":"785%",
      "heading": "Map Legend",
      "paragraph":
      "This bar shows the mapping of colors to sidewalk steepness levels on the map. Green means a low steepness, while red is very steep. In this example, yellow represents a 2% incline.",
      "showBack": true,
      "nextButtonText":"Next",
    },
    { // Language and region
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": "Two blue region-switching buttons at the top right corner of the home screen. The left reads: English, the right: Seattle.",
      "toolTipPositionLeft":"27%", "toolTipPositionTop":"13%",
      "arrowPositionLeft":"550%", "arrowPositionTop":"-50%",
      "heading": "Language and Region",
      "paragraph":
      "Currently, AccessMap supports showing sidewalk data for Seattle, Mount Vernon, and Bellingham.",
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
