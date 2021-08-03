// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import { View, Image, AccessibilityInfo} from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function MapInterfaceTutorialPage({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 7;
  const cardDescription = t("MAP_INTERFACE");

  const toolTipVariables = [
    { // Choose a destination with Search Bar
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_1"), 
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"18%",
      "arrowPositionLeft":"80%", "arrowPositionTop":"-50%",
      "heading": t("MAP_HEAD_1"),
      "paragraph": t("MAP_TUT_1"),
    },
    { // Grey enter icon to pick start and end
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_2"),
      "toolTipPositionLeft":"35%", "toolTipPositionTop":"19%",
      "arrowPositionLeft":"595%", "arrowPositionTop":"-50%",
      "heading": t("MAP_HEAD_1"),
      "paragraph": t("MAP_TUT_2"),
    },
    { // Mobility Buttons
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_3"),
      "toolTipPositionLeft":"13%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"50%", "arrowPositionTop":"-50%",
      "heading": t("MAP_HEAD_3"),
      "paragraph": t("MAP_TUT_3"),
    },
    { // Pencil icon to customize
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_4"),
      "toolTipPositionLeft":"20%", "toolTipPositionTop":"25%",
      "arrowPositionLeft":"550%", "arrowPositionTop":"-50%",
      "heading": t("MAP_HEAD_3"),
      "paragraph": t("MAP_TUT_4"),
    },
    { // Zoom in out, find my location button
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_5"),
      "toolTipPositionLeft":"10%", "toolTipPositionTop":"65%",
      "arrowPositionLeft":"785%", "arrowPositionTop":"250%",
      "heading": t("MAP_HEAD_5"),
      "paragraph": t("MAP_TUT_5"),
    },
    { // Rainbow legend
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_6"),
      "toolTipPositionLeft":"15%", "toolTipPositionTop":"52%",
      "arrowPositionLeft":"200%", "arrowPositionTop":"785%",
      "heading": t("MAP_HEAD_6"),
      "paragraph": t("MAP_TUT_6"),
    },
    { // Language and region
      "background_image": require("../../../assets/tutorial_background.png"),
      "captions": t("MAP_CAPTION_7"),
      "toolTipPositionLeft":"27%", "toolTipPositionTop":"13%",
      "arrowPositionLeft":"550%", "arrowPositionTop":"-50%",
      "heading": t("MAP_HEAD_7"),
      "paragraph": t("MAP_TUT_7"),
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
        cardDescription={cardDescription}
        numStep={numStep}
        maxStep={maxSteps}
        toolTipPositionLeft={toolTipVariables[numStep].toolTipPositionLeft}
        toolTipPositionTop={toolTipVariables[numStep].toolTipPositionTop}
        arrowPositionLeft={toolTipVariables[numStep].arrowPositionLeft}
        arrowPositionTop={toolTipVariables[numStep].arrowPositionTop}
        heading={toolTipVariables[numStep].heading}
        paragraph={toolTipVariables[numStep].paragraph}
        goToNextStep={goToNextStep}
        navigation={navigation}
      />
    </View>
  );
}
