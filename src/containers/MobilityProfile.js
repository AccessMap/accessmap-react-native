// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React from "react";
import Header from "../components/Header";
import CustomSlider from "./Settings/CustomSlider";
import BarrierSwitch from "./Settings/BarrierSwitch";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import CustomCard from "../containers/CustomCard";
import { useSelector } from "react-redux";
import getInclineLimit from "../utils/get-incline-limit";
import SpeedLegend from "../components/SpeedLegend";
import GreyDivider from "../components/GreyDivider";
import { Fonts } from "../styles";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  // cardVisible [boolean]
  let showingUphillColors = useSelector((state: RootState) => state.showingUphillColors);
  let maxIncline = useSelector((state: RootState) => {
    return getInclineLimit(
        state.customUphill,
        state.customDownhill,
        state.mobilityMode
    )[showingUphillColors ? 0 : 1];
  });
  const { t, i18n } = useTranslation();
  const content = (
    <View style={{ height: "100%", marginRight: 0 }}>
      <Header title={t("MAP_HEAD_3")} close={props.close} />
      <ScrollView style={{marginRight:15}}>
        <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
        <CustomSlider title={t("MAX_DOWNHILL_STEEPNESS_TEXT")} uphill={false} />
        <BarrierSwitch />
        <Text style={[Fonts.h2, {marginBottom: 5, marginTop: 10}]}>{t("MAP_HEAD_6")}</Text>
        <SpeedLegend maxIncline={maxIncline} />
      </ScrollView>
    </View>
  );
  return <CustomCard cardVisible={props.cardVisible} content={content} />;
}
