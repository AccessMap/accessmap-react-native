// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React from "react";
import Header from "../components/Header";
import CustomSlider from "./Settings/CustomSlider";
import BarrierSwitch from "./Settings/BarrierSwitch";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  const { t, i18n } = useTranslation();
  return (
    <View
      style={{
        height: 300,
        width: "100%",
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 15,
        paddingLeft: 20,
        zIndex: 60,
        paddingRight: 15,
        paddingBottom: 10,
      }}
    >
      <Header title={t("MAP_HEAD_3")} close={props.close} />
    <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
    <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={false} />
    <BarrierSwitch />
    </View>
  );
}
