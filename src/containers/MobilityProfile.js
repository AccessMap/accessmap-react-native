// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React from "react";
import Header from "../components/Header";
import CustomSlider from "./Settings/CustomSlider";
import BarrierSwitch from "./Settings/BarrierSwitch";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

export default function MobilityProfile(props) {
    const { t, i18n } = useTranslation();
    return (
    <View>
        <Header title={t("MAP_HEAD_3")} close={props.close}/>

        <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true}/>
        <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={false}/>
        <BarrierSwitch />
    </View>
    );
};