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
  Animated,
  Button,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  // authenticate,
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
import languages from "../constants/languages";
import regions from "../constants/regions";
import GreyDivider from "../components/atoms/GreyDivider";
import { RadioButton } from "react-native-paper";
import { greyLight, primaryColor } from "../styles/colors";

import CustomCard from "../components/atoms/Card/CustomCard";
import Header from "../components/molecules/Header";
import BottomCardButton from "../components/atoms/Button/BottomCardButton";
import AboutPage from "./Information/AboutPage";
import Collapsible from "react-native-collapsible";
import { RootState } from "../reducers";

import PostHog from "posthog-react-native";
import { openLink, privacyPolicyURL } from "../constants/urls";

function SettingsPage({ props, route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [pageLoaded, setLoaded] = useState(false);

  let metricSetting = useSelector(
    (state: RootState) => state.setting.usingMetricSystem
  );
  let trackingSetting = useSelector(
    (state: RootState) => state.setting.trackUserActions
  );
  let currentLanguage = useSelector(
    (state: RootState) => state.setting.currLanguage
  );
  let currentRegion = useSelector((state: RootState) => state.map.currRegion);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Only displays on Android side for now since Rakam iOS is not set up
  const PrivacySection = (
    <View style={{}}>
      <TouchableOpacity
        style={{ paddingVertical: 15 }}
        onPress={() => {
          openLink(privacyPolicyURL);
        }}
        accessibilityRole="button"
      >
        <Text style={Fonts.p}>{t("PRIVACY_POLICY")}</Text>
      </TouchableOpacity>
      <View style={[Views.settingsRow, {paddingTop: 0}]}>
        <Text style={[Fonts.p]}>{t("TRACK_SETTINGS")}</Text>
        <Switch
          style={Buttons.switches}
          trackColor={{ false: greyLight, true: primaryColor }}
          thumbColor="white"
          accessibilityLabel={t("TRACKING_SETTINGS_TEXT")}
          onValueChange={(value) => {
            if (trackingSetting) {
              dispatch(untrackUser());
              PostHog.disable();
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
    </View>
  );

  const [collapsedLang, setCollapsedLang] = useState(true);
  const [collapsedRegion, setCollapsedRegion] = useState(true);
  const [collapsedUnits, setCollapsedUnits] = useState(true);
  const [collapsedPrivacy, setCollapsedPrivacy] = useState(true);
  const [collapsedAbout, setCollapsedAbout] = useState(true);

  const panY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ height: "100%" }}>
      <ScrollView style={Views.scrollView}>
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedLang(!collapsedLang);
            AccessibilityInfo.announceForAccessibility(
              collapsedLang
                ? t("Language section has been maximized.")
                : t("Language section has been collapsed.")
            );
          }}
        >
          <Text style={[Fonts.h2]}>{t("LANGUAGES_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedLang}>
          <RadioButton.Group
            onValueChange={(value) => {
              var item = languages.filter((data) => {
                return data.key.toUpperCase() == value.toUpperCase();
              });
              dispatch(goToLanguage(item[0]));
              AccessibilityInfo.announceForAccessibility(
                t("Changed language to ") + item[0].name
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
            setCollapsedRegion(!collapsedRegion);
            AccessibilityInfo.announceForAccessibility(
              collapsedRegion ? t("REGION_MAXIMIZED") : t("REGION_COLLAPSED")
            );
          }}
          accessibilityRole="button"
        >
          <Text style={Fonts.h2}>{t("REGIONS_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedRegion}>
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
            setCollapsedUnits(!collapsedUnits);
            AccessibilityInfo.announceForAccessibility(
              collapsedUnits
                ? t("Units section has been maximized.")
                : t("Units section has been collapsed.")
            );
          }}
          accessibilityRole="button"
        >
          <Text style={Fonts.h2}>{t("UNITS_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedUnits}>
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

        <GreyDivider />
        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedPrivacy(!collapsedPrivacy);
            AccessibilityInfo.announceForAccessibility(
              collapsedPrivacy
                ? t("Privacy section has been maximized.")
                : t("Privacy section has been collapsed.")
            );
          }}
        >
          <Text style={[Fonts.h2]}>{t("PRIVACY")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedPrivacy}>{PrivacySection}</Collapsible>

        <GreyDivider />

        <TouchableOpacity
          style={{ paddingVertical: 10 }}
          onPress={() => {
            setCollapsedAbout(!collapsedAbout);
            AccessibilityInfo.announceForAccessibility(
              collapsedAbout
                ? t("About section has been maximized.")
                : t("About section has been collapsed.")
            );
          }}
          accessibilityRole="button"
        >
          <Text style={[Fonts.h2]}>{t("ABOUT_TEXT")}</Text>
        </TouchableOpacity>
        <Collapsible collapsed={collapsedAbout}>
          <AboutPage />
        </Collapsible>
        <View style={{ height: 50 }}></View>
      </ScrollView>

      {modalVisible && (
        <CustomCard
          dismissCard={() => setModalVisible(false)}
          cardVisible={modalVisible}
          panY={panY}
          content={
            <PrivacyConsentPopupContent
              t={t}
              setModalVisible={setModalVisible}
              panY={panY}
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
    <View style={{ height: "100%", paddingBottom: 15 }}>
      <Header
        title={props.t("USER_TRACKING_TITLE")}
        close={() => {
          props.setModalVisible(false);
        }}
        panY={props.panY}
      />
      <Text style={[Fonts.p, { paddingRight: 20, paddingBottom: 20 }]}>
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
            if (Platform.OS === "android") {
              Rakam.toggleTracking();
            }
            dispatch(trackUser());
            PostHog.enable();
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
