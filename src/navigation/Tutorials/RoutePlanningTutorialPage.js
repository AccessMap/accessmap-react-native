// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Image, AccessibilityInfo } from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function RoutePlanningTutorialPage({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 6;
  const cardDescription = t("ROUTE_PLANNING");
  const nextButtonColor = "#0164FF";

  const toolTipVariables = [
    {
      // choose start and destination
      background_image: require("../../../res/images/tutorial_background.png"),
      captions: t("ROUTE_CAPTION_1"),
      toolTipPositionLeft: "35%",
      toolTipPositionTop: "20%",
      arrowPositionLeft: "580%",
      arrowPositionTop: "-50%",
      heading: t("ROUTE_HEAD_1"),
      paragraph: t("ROUTE_TUT_1"),
    },
    {
      // choose start and destination
      background_image: require("../../../res/images/example_route.png"),
      captions: t("ROUTE_CAPTION_2"),
      toolTipPositionLeft: "20%",
      toolTipPositionTop: "19%",
      arrowPositionLeft: "50%",
      arrowPositionTop: "-50%",
      heading: t("ROUTE_HEAD_1"),
      paragraph: t("ROUTE_TUT_2"),
    },
    {
      // Reverse and Cancel
      background_image: require("../../../res/images/example_route.png"),
      captions: t("ROUTE_CAPTION_2"),
      toolTipPositionLeft: "35%",
      toolTipPositionTop: "20%",
      arrowPositionLeft: "595%",
      arrowPositionTop: "-50%",
      heading: t("ROUTE_HEAD_1"),
      paragraph: t("ROUTE_TUT_3"),
    },
    {
      // Trip information general card
      background_image: require("../../../res/images/example_route.png"),
      captions: t("ROUTE_CAPTION_4"),
      toolTipPositionLeft: "18%",
      toolTipPositionTop: "53%",
      arrowPositionLeft: "200%",
      arrowPositionTop: "620%",
      heading: t("ROUTE_HEAD_4"),
      paragraph: t("ROUTE_TUT_4"),
    },
    {
      // Specific Trip information card
      background_image: require("../../../res/images/example_trip_details.png"),
      captions: t("ROUTE_CAPTION_5"),
      toolTipPositionLeft: "20%",
      toolTipPositionTop: "22%",
      arrowPositionLeft: "200%",
      arrowPositionTop: "560%",
      heading: t("ROUTE_HEAD_4"),
      paragraph: t("ROUTE_TUT_5"),
    },
    {
      // Specific Direction steps card
      background_image: require("../../../res/images/example_directions.png"),
      captions: t("ROUTE_CAPTION_6"),
      toolTipPositionLeft: "15%",
      toolTipPositionTop: "25%",
      arrowPositionLeft: "200%",
      arrowPositionTop: "560%",
      heading: t("ROUTE_HEAD_4"),
      paragraph: t("ROUTE_TUT_6"),
    },
  ];

  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={toolTipVariables[numStep].captions}
        style={{
          height: "100%",
          width: "100%",
          margin: 0,
          padding: 0,
          opacity: 0.65,
        }}
        source={toolTipVariables[numStep].background_image}
        resizeMode="contain"
        resizeMethod="scale"
      />

      <ToolTip
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
        goToNextStep={goToNextStep}
        navigation={navigation}
      />
    </View>
  );
}
