// Card details that show on the bottom of the screen when clicking on a sidewalk
// or coordinate. Title describes what the feature is, ex: 'Sidewalk'
// Includes the option to "Route from/to here".
import React from "react";
import { View, Text, AccessibilityInfo } from "react-native";
import { Icon, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import { placePin, setOrigin, setDestination } from "../../actions";
import coordinatesToString from "../../utils/coordinates-to-string";
import parseOpenHours from "../../utils/parse-open-hours";
import { days } from "../../utils/parse-open-hours";
import CustomCard from "../../containers/CustomCard";
import BottomCardButton from "../../components/BottomCardButton";
import { primaryColor } from "../../styles/colors";
import { Fonts } from "../../styles";
import { RootState } from "../../reducers";

export default function FeatureCard(props) {
  let features = useSelector((state: RootState) => state.map.pinFeatures);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const info =
    features.features && features.features[0]
      ? features.features[0].properties
      : null;
  var openHours;
  if (info && info.opening_hours) {
    openHours = parseOpenHours(info.opening_hours);
  }

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
        <Text style={[Fonts.p, { flex: 2, flexWrap: "wrap" }]}>
          {props.label}
        </Text>
        <Text style={[Fonts.p, { flex: 3, flexWrap: "wrap" }]}>
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
        style={[Fonts.p], {
          flex: 1,
          fontWeight: hours.today == day ? "bold" : "normal",
          color: hours.today == day ? color : "black",
        }}
      >
        {day}: {hours[day]}{" "}
        {hours.open && day == hours.today ? " (Open)" : null}
        {!hours.open && hours.today == day && hours[day] != "Closed" ? 
          " (Closed)" : null}
      </Text>
    );
  };

  var heading = "Unknown";
  if (features.text) { // elevator
    heading = features.text;
  } else if (info && info.description) {
    heading = info.description;
  } else { // info.footway == "sidewalk" || "crossing"
    heading = coordinatesToString(features.center);
  }

  const header = (
    <Header
      title={heading}
      reportButton={info}
      close={() => {
        dispatch(placePin(null)) 
        AccessibilityInfo.announceForAccessibility("Map feature card has been closed.")
      }}
      cs={info && (info.footway == "sidewalk" || info.footway == "crossing")}
      navigation={props.navigation}
      info={info}
    />
  );

  const details = () => {
    if (!info) { return null; }
    return (
      <View style={{paddingVertical:10}}>
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
              alignItems: "flex-start",
              marginBottom: 10,
            }}
          >
            <Text style={{ flex: 2, fontSize: 16, flexWrap: "wrap" }}>
              {t("OPEN_HOURS_TEXT")}
            </Text>
            <View style={{ flex: 3 }}>
              {days.map((string) =>
                openHours[string] ? (
                  <OpenHours hours={openHours} day={string} />
                ) : null
              )}
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
    );
  };

  const content = (
    <View style={{height:"100%", paddingBottom: 15}}>
      {header}
      {details()}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 5,
          marginRight: 15,
        }}
      >
        <BottomCardButton
          title={t("ROUTE_FROM_HERE_TEXT")}
          style={{ marginRight: 10 }}
          pressFunction={() => {
            dispatch(setOrigin());
            AccessibilityInfo.announceForAccessibility(
              "Set " + features.text + " as route start."
            );
          }}
        />
        <BottomCardButton
          title={t("ROUTE_TO_HERE_TEXT")}
          pressFunction={() => {
            dispatch(setDestination());
            const location = features.text ? features.text : features.center
            AccessibilityInfo.announceForAccessibility(
              "Set " + location + " as route destination."
            );
          }}
        />
      </View>
      {info && info.footway && (
        <Button
          title={t("REPORT_ISSUE")}
          containerStyle={[{ flex: 1, marginTop: 20, marginRight: 15 }]}
          buttonStyle={{
            backgroundColor: "white",
            paddingVertical: 13,
            borderColor: primaryColor,
          }}
          titleStyle={{ fontSize: 15, color: primaryColor }}
          icon={
            <Icon
              name="report"
              size={20}
              color={primaryColor}
              style={{ marginRight: 10 }}
            />
          }
          accessibilityLabel={t("Header-crowdsourcingInfo-accessibilityLabel")}
          onPress={() => {
            props.navigation.push(t("CROWDSOURCING"), { info });
          }}
          type="outline"
        />
      )}
    </View>
  );

  return (
    <CustomCard dismissCard={() => dispatch(placePin(null))} content={content} cardVisible={true}/>
  );
}
