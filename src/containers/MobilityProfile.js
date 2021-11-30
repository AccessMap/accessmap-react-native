// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React, { useRef, useState } from "react";
import Header from "../components/Header";
import CustomSlider from "./Settings/CustomSlider";
import BarrierSwitch from "./Settings/BarrierSwitch";
import { Animated, Settings, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import CustomCard from "../containers/CustomCard";
import MobilityButtonGroup from "./OmniCard/mobility-buttons";
import { ScrollView } from "react-native";
import { Fonts } from "../styles";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  // cardVisible [boolean]

  const panY = useRef(new Animated.Value(0)).current;
  const { t, i18n } = useTranslation();
  const [showingAdvancedSettings, toggleAdvancedSettings] = useState(false);

  const mainContent = (
    <View style={{ height: "100%" }}>
      <Header title={t("MAP_HEAD_3")} close={props.close} panY={panY}/>
      <View style={{ marginRight: 15, paddingBottom: 10 }}>
        <ScrollView horizontal={true}><MobilityButtonGroup /></ScrollView>
        <BarrierSwitch/>
        <TouchableOpacity onPress={() => { toggleAdvancedSettings(true) }}>
          <Text style={[Fonts.p, {paddingBottom: 10}]}>Incline Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const inclineSettings = (
    <View style={{ paddingBottom: 10 }}>
      <Header title={t("INCLINE_TEXT") + " " + t("SETTINGS")} 
        close={props.close} 
        back={true} 
        goBack={() => {toggleAdvancedSettings(false)}}
        panY={panY}
      />
      <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
      <CustomSlider title={t("MAX_DOWNHILL_STEEPNESS_TEXT")} uphill={false} /> 
    </View>
  );

  return (
    <CustomCard
      dismissCard={props.close}
      cardVisible={props.cardVisible}
      content={showingAdvancedSettings ? inclineSettings : mainContent }
      panY={panY}
    />
  );
}
