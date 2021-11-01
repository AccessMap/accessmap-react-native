// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React from "react";
import Header from "../components/Header";
import CustomSlider from "./Settings/CustomSlider";
import BarrierSwitch from "./Settings/BarrierSwitch";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import CustomCard from "../containers/CustomCard";
import MobilityButtonGroup from "./OmniCard/mobility-buttons";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  // cardVisible [boolean]
  const { t, i18n } = useTranslation();
  const content = (
    <View style={{ height: "100%", marginRight: 0 }}>
      <Header title={t("MAP_HEAD_3")} close={props.close} />
      <View style={{ marginRight: 15 }}>
        <MobilityButtonGroup />
        <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
        <CustomSlider title={t("MAX_DOWNHILL_STEEPNESS_TEXT")} uphill={false} />
        <BarrierSwitch />
      </View>
    </View>
  );
  return (
    <CustomCard
      dismissCard={props.close}
      cardVisible={props.cardVisible}
      content={content}
    />
  );
}
