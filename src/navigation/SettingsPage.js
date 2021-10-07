// The Settings Page gives users to option to customize
// language, region shown on map, unit system, and privacy settings.
import {
  Switch,
  ScrollView,
  View,
  Text,
  AccessibilityInfo,
  NativeModules,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  goToLanguage,
  goToRegion,
  trackUser,
  untrackUser,
  useImperialSystem,
  useMetricSystem,
} from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Buttons, Colors, Fonts, Views } from "../styles";
import { RootState } from "../reducers";
import languages from "../constants/languages";
import regions from "../constants/regions";
import GreyDivider from "../components/GreyDivider";
import { RadioButton } from "react-native-paper";
import { greyLight, primaryLight } from "../styles/colors";

import CustomCard from "../containers/CustomCard";
import Header from "../components/Header";
import BottomCardButton from "../components/BottomCardButton";
import AboutPage from "./Information/AboutPage";
import { setFocus } from "../utils/setFocus";
import Collapsible from "react-native-collapsible";

function SettingsPage({ props, route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pageLoaded, setLoaded] = useState(false);

  let metricSetting = useSelector((state: RootState) => {
    return state.usingMetricSystem;
  });
  let trackingSetting = useSelector((state: RootState) => {
    return state.trackUserActions;
  });
  let currentLanguage = useSelector((state: RootState) => {
    return state.currLanguage;
  });
  let currentRegion = useSelector((state: RootState) => {
    return state.currRegion;
  });
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Only displays on Android side for now since Rakam iOS is not set up
  const PrivacySection = (
    <View style={[Views.settingsRow]}>
      <Text style={[Fonts.p]}>{t("TRACK_SETTINGS")}</Text>
      <Switch
        style={Buttons.switches}
        trackColor={{ false: greyLight, true: primaryLight }}
        thumbColor={Colors.primaryColor}
        accessibilityLabel={t("TRACKING_SETTINGS_TEXT")}
        onValueChange={(value) => {
          if (trackingSetting) {
            dispatch(untrackUser());
            if (pageLoaded) {
              AccessibilityInfo.announceForAccessibility(t("NOT_TRACKING"));
            } else {
              setLoaded(true);
            }
          } else {
            setModalVisible(true);
          }
        }}
        value={trackingSetting}
      />
    </View>
  );

  const [collapsedFirst, setCollapsedFirst] = useState(true);
  const [collapsedSecond, setCollapsedSecond] = useState(true);
  const [collapsedThird, setCollapsedThird] = useState(true);
  const [collapsedFourth, setCollapsedFourth] = useState(true);
  return (
    <View>
      <ScrollView style={Views.scrollView}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedFirst(!collapsedFirst);
            AccessibilityInfo.announceForAccessibility(
              collapsedFirst
                ? "Language section has been maximized."
                : "Language section has been collapsed."
            );
          }}
        >
          <Text style={[Fonts.h2]}>{t("LANGUAGES_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedFirst}>
          <RadioButton.Group
            onValueChange={(value) => {
              var item = languages.filter((data) => {
                return data.key.toUpperCase() == value.toUpperCase();
              });
              dispatch(goToLanguage(item[0]));
              AccessibilityInfo.announceForAccessibility(
                "Changed language to " + item[0].name
              );
              i18n.changeLanguage(value.toLowerCase());
            }}
            value={currentLanguage}
          >
            {languages.map((lang) => (
              <RadioButton.Item
                color={Colors.primaryColor}
                label={lang.name}
                key={lang.key}
                value={lang.key}
              />
            ))}
          </RadioButton.Group>
        </Collapsible>

        <GreyDivider />
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedSecond(!collapsedSecond);
            AccessibilityInfo.announceForAccessibility(
              collapsedSecond
                ? "Region section has been maximized."
                : "Region section has been collapsed."
            );
          }}
          accessibilityRole="button"
        >
          <Text style={Fonts.h2}>{t("REGIONS_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedSecond}>
          <RadioButton.Group
            onValueChange={(value) => {
              var item = regions.filter((data) => {
                return data.properties.name.toUpperCase() == value;
              });
              AccessibilityInfo.announceForAccessibility(
                "Changed region to " + item[0].properties.name
              );
              dispatch(goToRegion(item[0]));
            }}
            value={currentRegion.toUpperCase()}
          >
            {regions.map((region) => (
              <RadioButton.Item
                color={Colors.primaryColor}
                label={region.properties.name}
                value={region.properties.name.toUpperCase()}
                key={region.properties.key}
              />
            ))}
          </RadioButton.Group>
        </Collapsible>

        <GreyDivider />
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedThird(!collapsedThird);
            AccessibilityInfo.announceForAccessibility(
              collapsedThird
                ? "Units section has been maximized."
                : "Units section has been collapsed."
            );
          }}
          accessibilityRole="button"
        >
          <Text style={Fonts.h2}>{t("UNITS_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedThird}>
          <RadioButton.Group
            onValueChange={(value) => {
              if (value) {
                dispatch(useMetricSystem());
              } else {
                dispatch(useImperialSystem());
              }
            }}
            value={metricSetting}
          >
            <RadioButton.Item
              color={Colors.primaryColor}
              label={t("IMPERIAL_TOGGLE_TEXT")}
              value={false}
              key={"imperial"}
            />
            <RadioButton.Item
              color={Colors.primaryColor}
              label={t("METRIC_TOGGLE_TEXT")}
              value={true}
              key={"metric"}
            />
          </RadioButton.Group>
        </Collapsible>

        {Platform.OS === "android" && <GreyDivider />}
        {Platform.OS === "android" && (
          <Text style={[Fonts.h2]}>{t("PRIVACY")}</Text>
        )}
        {Platform.OS === "android" && PrivacySection}

        <GreyDivider />

        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedFourth(!collapsedFourth);
            AccessibilityInfo.announceForAccessibility(
              collapsedFourth
                ? "About section has been maximized."
                : "About section has been collapsed."
            );
          }}
          accessibilityRole="button"
        >
          <Text style={[Fonts.h2]}>{t("ABOUT_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedFourth}>
          <AboutPage />
        </Collapsible>
        <View style={{ height: 50 }}></View>
      </ScrollView>

      {modalVisible && (
        <CustomCard
          dismissCard={() => props.setModalVisible(false)}
          cardVisible={modalVisible}
          content={
            <PrivacyConsentPopupContent
              t={t}
              setModalVisible={setModalVisible}
            />
          }
        />
      )}
    </View>
  );
}

function PrivacyConsentPopupContent(props) {
  const dispatch = useDispatch();
  const { Rakam } = NativeModules;

  return (
    <View style={{ height: "100%" }}>
      <Header
        title={props.t("USER_TRACKING_TITLE")}
        close={() => {
          props.setModalVisible(false)
        }}
      />
      <Text
        ref={setFocus}
        style={[Fonts.p, { paddingRight: 20, paddingBottom: 20 }]}
      >
        {props.t("USER_TRACKING_TEXT")}
      </Text>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BottomCardButton
          style={{ marginRight: 10 }}
          title={props.t("AGREE_TEXT")}
          pressFunction={() => {
            Rakam.toggleTracking();
            dispatch(trackUser());
            AccessibilityInfo.announceForAccessibility(
              props.t("CURRENTLY_TRACKING")
            );
            props.setModalVisible(false);
          }}
        />
        <BottomCardButton
          style={{ marginRight: 20 }}
          title={props.t("DISAGREE_TEXT")}
          pressFunction={() => {
            props.setModalVisible(false);
          }}
        />
      </View>
    </View>
  );
}

export default SettingsPage;
