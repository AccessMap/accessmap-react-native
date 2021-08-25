// Card details that show on the bottom of the screen when clicking on a sidewalk
// or coordinate. Includes the option to "Route from/to here".
import React from "react";
import { View, Text, AccessibilityInfo } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import { placePin, setOrigin, setDestination } from "../../actions";
import coordinatesToString from "../../utils/coordinates-to-string";
import parseOpenHours from "../../utils/parse-open-hours";
import { Buttons, Views } from "../../styles";
import { primaryColor } from "../../styles/colors";
import { IconButton } from "react-native-paper";

const InfoText = (props) => {
  return (
    <View
      accessible={true}
      style={{
        color: "black",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text style={{ flex: 2, fontSize: 16, flexWrap: "wrap" }}>
        {props.label}
      </Text>
      <Text style={{ flex: 3, fontSize: 16, flexWrap: "wrap" }}>
        {props.info}
      </Text>
    </View>
  );
};

const OpenHours = (props) => {
  const { hours, day } = props;
  const color = hours.open ? "green" : "red";
  return (
    <Text
      style={{
        flex: 1,
        fontSize: 12,
        color: hours.today == day ? color : null,
      }}
    >
      {day}: {hours[day]}
    </Text>
  );
};

const FeatureCard = (props) => {
  const { t, i18n } = useTranslation();
  const info =
    props.features.features && props.features.features[0]
      ? props.features.features[0].properties
      : null;
  var openHours;
  if (info && info.opening_hours) {
    openHours = parseOpenHours(info.opening_hours);
  }

  return (
    <Card containerStyle={Views.bottomCard}>
      <View style={{ maxWidth: "100%" }}>
        <Header
          title={
            props.features.text
              ? props.features.text
              : info
              ? info.footway == "sidewalk"
                ? t("SIDEWALK_TEXT")
                : info.footway == "crossing"
                ? t("CROSSING_TEXT")
                : coordinatesToString(props.features.center)
              : coordinatesToString(props.features.center)
          }
          reportButton={info}
          close={() => props.placePin(null)}
          cs={
            info && (info.footway == "sidewalk" || info.footway == "crossing")
          }
          navigation={props.navigation}
          info={info}
        />
      </View>

      {info && (
        <View>
          <InfoText label={t("DESCRIPTION_TEXT")} info={info.description} />
          {info.footway == "sidewalk" ? (
            <InfoText
              label={t("INCLINE_TEXT")}
              info={Math.abs(Math.round(info.incline * 1000) / 10) + "%"}
            />
          ) : info.footway == "crossing" ? (
            <InfoText
              label={t("CURBRAMPS_TEXT")}
              info={info.curbramps ? t("YES_TEXT") : t("NO_TEXT")}
            />
          ) : (
            <View
              style={{
                height: 120,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <Text style={{ flex: 2, fontSize: 16, flexWrap: "wrap" }}>
                {t("OPEN_HOURS_TEXT")}
              </Text>
              <View style={{ flex: 3 }}>
                <OpenHours hours={openHours} day="Su" />
                <OpenHours hours={openHours} day="Mo" />
                <OpenHours hours={openHours} day="Tu" />
                <OpenHours hours={openHours} day="We" />
                <OpenHours hours={openHours} day="Th" />
                <OpenHours hours={openHours} day="Fr" />
                <OpenHours hours={openHours} day="Sa" />
              </View>
            </View>
          )}

          {info.footway == "sidewalk" ? (
            <InfoText label={t("SURFACE_TEXT")} info={info.surface} />
          ) : info.footway == "crossing" ? (
            <InfoText
              label={t("MARKED_CROSSWALK_TEXT")}
              info={info.crossing == "marked" ? t("YES_TEXT") : t("NO_TEXT")}
            />
          ) : (
            <InfoText
              label={t("INDOOR_TEXT")}
              info={info.indoor ? t("YES_TEXT") : t("NO_TEXT")}
            />
          )}
        </View>
      )}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          buttonStyle={{ backgroundColor: "white", paddingVertical: 13, paddingHorizontal: 15,
          borderColor: primaryColor}}
          titleStyle={{ fontSize: 15, color: primaryColor }}
          title={t("ROUTE_FROM_HERE_TEXT")}
          type="outline"
          raised={true}
          onPress={() => {
            props.setOrigin();
            AccessibilityInfo.announceForAccessibility(
              "Set " + props.features.text + " as route start."
            );
          }}
        />
        <Button
          type="outline"
          raised={true}
          buttonStyle={{ backgroundColor: "white", paddingVertical: 13, paddingHorizontal: 15,
            borderColor: primaryColor}}
          titleStyle={{ fontSize: 15, color: primaryColor }}
          title={t("ROUTE_TO_HERE_TEXT")}
          onPress={() => {
            props.setDestination();
            AccessibilityInfo.announceForAccessibility(
              "Set " + props.features.text + " as route destination."
            );
          }}
        />
      </View>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    features: state.pinFeatures,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    placePin: (features) => {
      dispatch(placePin(features));
    },
    setOrigin: () => {
      dispatch(setOrigin());
    },
    setDestination: () => {
      dispatch(setDestination());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeatureCard);
