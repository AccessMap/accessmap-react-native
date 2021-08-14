import {
  Switch,
  ScrollView,
  View,
  Text,
  AccessibilityInfo,
  NativeModules,
} from "react-native";
import React from "react";
import {
  goToLanguage,
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
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { Radio } from "native-base";

function SettingsPage({ props, route, navigation }) {
  const { Rakam } = NativeModules;
  let metricSetting = useSelector((state: RootState) => {
    return state.usingMetricSystem;
  });
  let trackingSetting = useSelector((state: RootState) => {
    return state.trackUserActions;
  });

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  return (
    <ScrollView style={Views.scrollView}>
      <Text style={[Fonts.h2]}>{t("LANGUAGES_TEXT")}</Text>
      <FlatList
        style={{marginBottom: 50}} 
        data={languages}
        renderItem={(item) => (
          <TouchableHighlight
            style={{paddingVertical: 10}}
            onPress={() => {
              i18n.changeLanguage(item.item.key);
              goToLanguage(item.item);
              AccessibilityInfo.announceForAccessibility(
                "Changed language to " + item.item.name
              );
            }}
          >
            <Text style={[Fonts.p]}>{item.item.name}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={Fonts.h2}>{t("REGIONS_TEXT")}</Text>
      <FlatList
        style={{marginBottom: 50}} 
        data={regions}
        renderItem={(item) => (
          <TouchableHighlight
          style={{paddingVertical: 10}}
            onPress={() => { goToRegion(item.item);}}
          >
            <Text style={[Fonts.p]}>{item.item.properties.name}</Text>
          </TouchableHighlight>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    <Radio.Group name="ex" defaultValue="1">
      <Radio value="1" colorScheme="red" size="sm" my={1}>
        Small
      </Radio>
      <Radio value="2" colorScheme="green" size="md" my={1}>
        Medium
      </Radio>
      <Radio value="3" colorScheme="yellow" size="lg" my={1}>
        Large
      </Radio>
    </Radio.Group>

      <Text style={Fonts.h2}>{t("OTHER_TEXT")}</Text>
      <View style={[Views.settingsRow]}>
        <Text style={[Fonts.p]}>{t("TRACK_SETTINGS")}</Text>
        <Switch
          style={Buttons.switches}
          accessibilityLabel={t("TRACKING_SETTINGS_TEXT")}
          onValueChange={(value) => {
            AccessibilityInfo.announceForAccessibility(
              trackingSetting ? t("CURRENTLY_TRACKING") : t("NOT_TRACKING")
            );
            if (Platform.OS === "android") {
              Rakam.toggleTracking();
            }
            trackingSetting ? dispatch(untrackUser()) : dispatch(trackUser());
          }}
          value={trackingSetting}
        />
      </View>
      <View style={[Views.settingsRow]}>
        <Text style={[Fonts.p]}>
          {metricSetting ? t("METRIC_TOGGLE_TEXT") : t("IMPERIAL_TOGGLE_TEXT")}
        </Text>
        <Switch
          style={Buttons.switches}
          accessibilityLabel={t("TOGGLE_UNITS")}
          onValueChange={() => {
            metricSetting
              ? dispatch(useImperialSystem())
              : dispatch(useMetricSystem());
          }}
          value={metricSetting}
        />
      </View>
    </ScrollView>
  );
}

export default SettingsPage;
