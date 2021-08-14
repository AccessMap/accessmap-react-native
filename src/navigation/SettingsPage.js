import { Switch, ScrollView, View, Text } from "react-native";
import React from "react";
// import { useImperialSystem, useMetricSystem } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
// import { Buttons } from "../styles";

function SettingsPage({ props, route, navigation }) {
  const state = useSelector(state => state.customReducer);
  const dispatch = useDispatch();
  const useMetric = dispatch(useMetricSystem());
  const useImperial = dispatch(useImperialSystem());

  const { t, i18n } = useTranslation();
  return (
    <ScrollView>
      <View
        style={[{ flexDirection: "row", alignItems: "center", marginTop: 30 }]}
      >
        <Text style={[{ marginRight: 40 }]}>{t("TRACK_SETTINGS")}</Text>
        <Switch
          style={Buttons.switches}
          accessibilityLabel={t("TRACKING_SETTINGS_TEXT")}
          onValueChange={(value) => {
            AccessibilityInfo.announceForAccessibility(
              state.trackingSettings ? t("CURRENTLY_TRACKING") : t("NOT_TRACKING")
            );
            if (Platform.OS === "android") {
              Rakam.toggleTracking();
            }
          }}
          value={state.trackingUserActions}
        />
      </View>

      <View
        style={[{ flexDirection: "row", alignItems: "center", marginTop: 30 }]}
      >
        <Text style={[{ marginRight: 40 }]}>
          { state.trackingSettings
            ? t("METRIC_TOGGLE_TEXT")
            : t("IMPERIAL_TOGGLE_TEXT")}
        </Text>
        <Switch
          style={Buttons.switches}
          accessibilityLabel={t("TOGGLE_UNITS")}
          onValueChange={() => {
            if (usingMetricSystem) {
              useMetric
            } else {
              props.useMetricSystem();
            }
          }}
          value={state}
        />
      </View>
    </ScrollView>
  );
}

export default SettingsPage;
