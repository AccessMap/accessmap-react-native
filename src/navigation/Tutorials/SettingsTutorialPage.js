// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, Image } from "react-native";
import ToolTip from "../../components/TutorialComponents/ToolTip";

export default function SettingsTutorialPage({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const [numStep, goToNextStep] = useState(0);
  const maxSteps = 3;
  const cardDescription = t("MAP_INTERFACE");

  const toolTipContent = [
    {
      // Hamburger menu button
      background_image: require("../../../res/images/tutorial_background.png"),
      captions: t("SETTINGS_CAPTION_1"),
      toolTipPositionLeft: "3%",
      toolTipPositionTop: "12%",
      arrowPositionLeft: "100%",
      arrowPositionTop: "-50%",
      heading: t("SETTINGS_HEAD_1"),
      paragraph: t("SETTINGS_TUT_1"),
    },
    {
      // Tracking
      background_image: require("../../../res/images/drawer_menu.png"),
      captions: t("SETTINGS_CAPTION_2"),
      toolTipPositionLeft: "28%",
      toolTipPositionTop: "54%",
      arrowPositionLeft: "200%",
      arrowPositionTop: "-50%",
      heading: t("SETTINGS_HEAD_2"),
      paragraph: t("SETTINGS_TUT_2"),
    },
    {
      // Units
      background_image: require("../../../res/images/drawer_menu.png"),
      captions: t("SETTINGS_CAPTION_3"),
      toolTipPositionLeft: "28%",
      toolTipPositionTop: "62%",
      arrowPositionLeft: "300%",
      arrowPositionTop: "-50%",
      heading: t("SETTINGS_HEAD_2"),
      paragraph: t("SETTINGS_TUT_3"),
    },
  ];

  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={toolTipContent[numStep].captions}
        style={{
          height: "100%",
          width: "100%",
          margin: 0,
          padding: 0,
          opacity: 0.65,
        }}
        source={toolTipContent[numStep].background_image}
        resizeMode="contain"
        resizeMethod="scale"
      />

      <ToolTip
        cardDescription={cardDescription}
        numStep={numStep}
        maxStep={maxSteps}
        toolTipPositionLeft={toolTipContent[numStep].toolTipPositionLeft}
        toolTipPositionTop={toolTipContent[numStep].toolTipPositionTop}
        arrowPositionLeft={toolTipContent[numStep].arrowPositionLeft}
        arrowPositionTop={toolTipContent[numStep].arrowPositionTop}
        heading={toolTipContent[numStep].heading}
        paragraph={toolTipContent[numStep].paragraph}
        goToNextStep={goToNextStep}
        navigation={navigation}
      />
    </View>
  );
}
