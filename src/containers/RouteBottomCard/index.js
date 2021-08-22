// A RouteBottomCard appears at the bottom of the screen after a user selects a start and end
// location for their route. The Card contains information about distance, time, and buttons
// to view the Trip Info and Directions.
import React from "react";
import { View, Text, AccessibilityInfo } from "react-native";
import { Button, Card } from "react-native-elements";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";

import { cancelRoute, closeDirections, closeTripInfo, viewDirections, viewTripInfo } from "../../actions";
import { Buttons, Fonts, Views } from "../../styles";
import Header from "../../components/Header";
import { primaryColor } from "../../styles/colors";

const RouteBottomCard = (props) => {
  const { t, i18n } = useTranslation();

  if (props.viewingDirections || props.viewingTripInfo) {
    return null;
  } else if (!props.route || props.route.code != "Ok") {
    AccessibilityInfo.announceForAccessibility(
      "No possible route found with given start and end locations."
    );
    return (
      <Card containerStyle={[Views.bottomCard]}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 20 }}>{t("NO_ROUTE_TEXT")}</Text>
        </View>
      </Card>
    );
  }

  const route = props.route.routes[0];

  AccessibilityInfo.announceForAccessibility(
    "Route has been found. " +
      "Select Trip info or Directions button for more details"
  );
  return (
    <Card containerStyle={Views.bottomCard}>
      <View style={{ margin: 5, width: "100%" }}>
        <View
          accessible={true}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Header
            title={ "" + (props.usingMetricSystem ? 
              Math.round(route.distance) : 
              Math.round(route.distance * 0.000621371192 * 100) / 100) + " " + 
                (props.usingMetricSystem ? t("METERS_TEXT") : t("MILES_TEXT")) + " (" +
                (Math.round(route.duration / 60)) + " " + t("MINUTES_TEXT") + ")"
            }
            close={props.cancelRoute}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <Button
            buttonStyle={[Buttons.button], {backgroundColor: primaryColor}}
            title={t("TRIP_INFO_TEXT")}
            onPress={() => {
              props.viewTripInfo();
              AccessibilityInfo.announceForAccessibility(
                "Showing Trip details screen."
              );
            }}
            containerStyle={{ flex: 1, marginRight: 10, width: "40%" }}
          />
          <Button
            buttonStyle={[Buttons.button], {backgroundColor: primaryColor}}
            title={t("DIRECTIONS_TEXT")}
            onPress={() => props.viewDirections()}
            containerStyle={{ flex: 1, marginRight: 10, width: "40%" }}
          />
        </View>
      </View>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    route: state.route,
    viewingTripInfo: state.viewingTripInfo,
    viewingDirections: state.viewingDirections,
    usingMetricSystem: state.usingMetricSystem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    viewDirections: () => {
      dispatch(viewDirections());
    },
    viewTripInfo: () => {
      dispatch(viewTripInfo());
    },
    cancelRoute: () => {
      dispatch(cancelRoute());
      dispatch(closeDirections());
      dispatch(closeTripInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouteBottomCard);
