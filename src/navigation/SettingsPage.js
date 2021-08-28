import {
  Switch,
  ScrollView,
  View,
  Text,
  AccessibilityInfo,
  NativeModules,
  Alert,
} from "react-native";
import React from "react";
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

function SettingsPage({ props, route, navigation }) {
  const { Rakam } = NativeModules;
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

  return (
    <ScrollView style={Views.scrollView}>
      <Text style={[Fonts.h2]}>{t("LANGUAGES_TEXT")}</Text>
      <RadioButton.Group
        onValueChange={(value) => {
          var item = languages.filter((data) => {return data.key.toUpperCase() == value.toUpperCase(); });
          dispatch(goToLanguage(item[0]));
          AccessibilityInfo.announceForAccessibility("Changed language to " + item[0].name);
          i18n.changeLanguage(value.toLowerCase());
        }}
        value={currentLanguage}
      >
        {languages.map((lang) => (
          <RadioButton.Item 
          color={Colors.primaryColor} 
          label={lang.name} 
          key={lang.key}
          value={lang.key} />
        ))}
      </RadioButton.Group>

      <GreyDivider />
      <Text style={Fonts.h2}>{t("REGIONS_TEXT")}</Text>
      <RadioButton.Group
        onValueChange={(value) => {
            var item = regions.filter((data) => { 
              return data.properties.name.toUpperCase() == value; 
            }); 
            AccessibilityInfo.announceForAccessibility("Changed region to " + item[0].properties.name);
            dispatch(goToRegion(item[0]));
        }}
        value={currentRegion.toUpperCase()}
      >
        {regions.map((region) => (
          <RadioButton.Item 
            color={Colors.primaryColor} 
            label={region.properties.name} 
            value={region.properties.name.toUpperCase()} 
            key={region.properties.key}/>
        ))}
      </RadioButton.Group>

      <GreyDivider />
      <Text style={Fonts.h2}>{t("UNITS_TEXT")}</Text>
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
          key={"imperial"}/>
        <RadioButton.Item 
          color={Colors.primaryColor} 
          label={t("METRIC_TOGGLE_TEXT")} 
          value={true} 
          key={"metric"}/>
      </RadioButton.Group>

      <GreyDivider />
      <Text style={[Fonts.h2]}>{t("PRIVACY")}</Text>
      <View style={[Views.settingsRow]}>
        <Text style={[Fonts.p]}>{t("TRACK_SETTINGS")}</Text>
        <Switch
          style={Buttons.switches}
          trackColor={{ false: greyLight, true: primaryLight }}
				  thumbColor={Colors.primaryColor}
          accessibilityLabel={t("TRACKING_SETTINGS_TEXT")}
          onValueChange={(value) => {
            AccessibilityInfo.announceForAccessibility(
              trackingSetting ? t("CURRENTLY_TRACKING") : t("NOT_TRACKING")
            );
            if (trackingSetting) {
              console.log("UNTRACKING USER");
              dispatch(untrackUser());
            } else {
              Alert.alert(t("USER_TRACKING_TITLE"), t("USER_TRACKING_TEXT"), 
                [{ text: "OK", onPress: () => {
                  if (Platform.OS === "android") {
                    Rakam.toggleTracking();
                    dispatch(trackUser());
                  }
                }}, {text: "Cancel"}]);
            }
          }}
          value={trackingSetting}
        />
      </View>
      <View style={{height: 50}}></View>
    </ScrollView>
  );
}

export default SettingsPage;
