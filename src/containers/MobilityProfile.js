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
import { useDispatch, useSelector } from "react-redux";
import { showDownhill, showUphill } from "../actions";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  // cardVisible [boolean]

  const panY = useRef(new Animated.Value(0)).current;
  const { t, i18n } = useTranslation();
  const [showUphillSettings, toggleUphillSettings] = useState(false);
  const [showDownhillSettings, toggleDownhillSettings] = useState(false);

  let showingUphillColors = useSelector((state: RootState) => 
    state.mobility.showingUphillColors);
  const dispatch = useDispatch();

  const mainContent = (
    <View style={{ height: "100%" }}>
      <Header title={t("MAP_HEAD_3")} close={props.close} panY={panY}/>
      <View style={{ marginRight: 15, paddingBottom: 10 }}>
        <ScrollView horizontal={true}><MobilityButtonGroup /></ScrollView>
        <BarrierSwitch/>
        <TouchableOpacity onPress={() => { 
          toggleUphillSettings(true);
          dispatch(showUphill());
        }}>
          <Text style={[Fonts.p, {paddingBottom: 10, paddingTop: 10}]}>{t("UPHILL_TEXT") + " " + t("SETTINGS")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { 
          toggleDownhillSettings(true);
          dispatch(showDownhill());
        }}>
          <Text style={[Fonts.p, {paddingBottom: 10}]}>{t("DOWNHILL_TEXT") + " " + t("SETTINGS")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const uphillSettings = (
    <View style={{ paddingBottom: 10 }}>
      <Header title={"Uphill " + t("INCLINE_TEXT") + " " + t("SETTINGS")} 
        close={props.close} 
        back={true} 
        goBack={() => {toggleUphillSettings(false)}}
        panY={panY}
      />
      <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
    </View>
  );
  const downhillSettings = (
    <View style={{ paddingBottom: 10 }}>
      <Header title={"Downhill " + t("INCLINE_TEXT") + " " + t("SETTINGS")} 
        close={props.close} 
        back={true} 
        goBack={() => {toggleDownhillSettings(false)}}
        panY={panY}
      />
      <CustomSlider title={t("MAX_DOWNHILL_STEEPNESS_TEXT")} uphill={false} /> 
    </View>
  );

  var content = mainContent;
  if (showUphillSettings) {
    content = uphillSettings;
  } else if (showDownhillSettings) {
    content = downhillSettings
  }

  return (
    <CustomCard
      dismissCard={props.close}
      cardVisible={props.cardVisible}
      content={content}
      panY={panY}
    />
  );
}
