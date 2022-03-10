// The Mobility Profile is a page showing the user's navigation preferences,
// including preferred maximum steepness levels and avoiding raised curbs.
import React, { useRef, useState } from "react";
import Header from "../molecules/Header";
import CustomSlider from "../atoms/Slider/CustomSlider";
import BarrierSwitch from "../atoms/Switch/BarrierSwitch";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import CustomCard from "../atoms/Card/CustomCard";
import MobilityButtonGroup from "../molecules/OmniCard/mobility-buttons";
import { ScrollView } from "react-native";
import { Colors, Fonts } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { showDownhill, showUphill } from "../../actions";
import { Button } from "react-native-elements";
import {
  MOBILITY_MODE_CANE,
  MOBILITY_MODE_POWERED,
  MOBILITY_MODE_WHEELCHAIR,
} from "../../constants";
import Icon from "react-native-vector-icons/FontAwesome";

export default function MobilityProfile(props) {
  // close: function that runs when the close button is clicked
  // cardVisible [boolean]

  const panY = useRef(new Animated.Value(0)).current;
  const { t, i18n } = useTranslation();
  const [showUphillSettings, toggleUphillSettings] = useState(false);
  const [showDownhillSettings, toggleDownhillSettings] = useState(false);

  let customUphill = useSelector(
    (state: RootState) => state.mobility.customUphill
  );
  let customDownhill = useSelector(
    (state: RootState) => state.mobility.customDownhill
  );
  let avoidRaisedCurbs = useSelector(
    (state: RootState) => state.mobility.avoidRaisedCurbs
  );
  let mobilityMode = useSelector(
    (state: RootState) => state.mobility.mobilityMode
  );

  const getPreferences = (mode) => {
    switch (mode) {
      case MOBILITY_MODE_WHEELCHAIR:
        return [8, 10, 1];
      case MOBILITY_MODE_POWERED:
        return [12, 12, 1];
      case MOBILITY_MODE_CANE:
        return [14, 14, 0];
      default:
        return [customUphill, customDownhill, avoidRaisedCurbs];
    }
  };

  const dispatch = useDispatch();

  const mainContent = (
    <View style={{ height: "100%" }}>
      <Header title={t("MAP_HEAD_3")} close={props.close} panY={panY} />
      <View style={{ marginRight: 5, paddingBottom: 10, top: -5 }}>
        <ScrollView horizontal={true}>
          <MobilityButtonGroup />
        </ScrollView>
        <TouchableOpacity
          style={{
            borderColor: Colors.grey,
            borderWidth: 0.5,
            marginBottom: 10,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          accessible={true}
          onPress={() => {
            toggleUphillSettings(true);
            dispatch(showUphill());
          }}
        >
          <Text accessible={false} style={[Fonts.p, { padding: 10 }]}>
            {t("UPHILL_TEXT") + " " + t("SETTINGS")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[Fonts.p]}>{getPreferences(mobilityMode)[0]}</Text>
            <Button
              accessibilityLabel={"Enter Uphill Settings page"}
              icon={<Icon name="angle-right" size={35} />}
              buttonStyle={{
                backgroundColor: "transparent",
                margin: 0,
                padding: 0,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                toggleUphillSettings(true);
                dispatch(showUphill());
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderColor: Colors.grey,
            borderWidth: 0.5,
            marginBottom: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          onPress={() => {
            toggleDownhillSettings(true);
            dispatch(showDownhill());
          }}
        >
          <Text style={[Fonts.p, { padding: 10 }]}>
            {t("DOWNHILL_TEXT") + " " + t("SETTINGS")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[Fonts.p]}>{getPreferences(mobilityMode)[1]}</Text>
            <Button
              accessibilityLabel={"Enter Downhill Settings page"}
              icon={<Icon name="angle-right" size={35} />}
              buttonStyle={{
                backgroundColor: "transparent",
                margin: 0,
                padding: 0,
                paddingHorizontal: 10,
              }}
              onPress={() => {
                toggleDownhillSettings(true);
                dispatch(showDownhill());
              }}
            />
          </View>
        </TouchableOpacity>
        <BarrierSwitch />
      </View>
    </View>
  );

  const uphillSettings = (
    <View style={{ paddingBottom: 10 }}>
      <Header
        title={"Uphill " + t("INCLINE_TEXT") + " " + t("SETTINGS")}
        close={props.close}
        back={true}
        goBack={() => {
          toggleUphillSettings(false);
        }}
        panY={panY}
      />
      <CustomSlider title={t("MAX_UPHILL_STEEPNESS_TEXT")} uphill={true} />
    </View>
  );
  const downhillSettings = (
    <View style={{ paddingBottom: 10 }}>
      <Header
        title={"Downhill " + t("INCLINE_TEXT") + " " + t("SETTINGS")}
        close={props.close}
        back={true}
        goBack={() => {
          toggleDownhillSettings(false);
        }}
        panY={panY}
      />
      <CustomSlider title={t("MAX_DOWNHILL_STEEPNESS_TEXT")} uphill={false} />
    </View>
  );

  var content = mainContent;
  if (showUphillSettings) {
    content = uphillSettings;
  } else if (showDownhillSettings) {
    content = downhillSettings;
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
