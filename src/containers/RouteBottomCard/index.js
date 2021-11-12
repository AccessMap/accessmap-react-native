// A RouteBottomCard appears at the bottom of the screen after a user selects a start and end
// location for their route. The Card contains information about distance, time, and buttons
// to view the Trip Info and Directions.
import React from "react";
import { View, Text, AccessibilityInfo } from "react-native";
import { Card } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { cancelRoute, closeDirections, closeTripInfo, viewDirections, viewTripInfo } from "../../actions";
import { Views } from "../../styles";
import Header from "../../components/Header";
import BottomCardButton from "../../components/BottomCardButton";
import CustomCard from "../CustomCard";
import { RootState } from "../../reducers";

export default function RouteBottomCard(props) {
  let route = useSelector((state: RootState) => state.map.route);
  let viewingTripInfo = useSelector((state: RootState) => state.map.viewingTripInfo);
  let viewingDirections = useSelector((state: RootState) => state.map.viewingDirections);
  let usingMetricSystem = useSelector((state: RootState) => state.setting.usingMetricSystem);

  const dispatch = useDispatch();
  const cancelAndCloseRoute = () => {
    AccessibilityInfo.announceForAccessibility("Route card has been closed. Route has been canceled.");
    dispatch(cancelRoute());
    dispatch(closeDirections());
    dispatch(closeTripInfo());
  }

  const { t, i18n } = useTranslation();

  if (viewingDirections || viewingTripInfo) {
    return null;
  } else if (!route || route.code != "Ok") {
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

  const calculatedRoute = route.routes[0];

  AccessibilityInfo.announceForAccessibility(
    "Route has been found. " +
      "Select Trip info or Directions button for more details"
  );

  const content = (
    <View style={{height: "100%"}}>
      <View>
        <Header
          title={ "" + (usingMetricSystem ? 
            Math.round(calculatedRoute.distance) : 
            Math.round(calculatedRoute.distance * 0.000621371192 * 100) / 100) + " " + 
              (usingMetricSystem ? t("METERS_TEXT") : t("MILES_TEXT")) + " (" +
              (Math.round(calculatedRoute.duration / 60)) + " " + t("MINUTES_TEXT") + ")"
          }
          close={cancelAndCloseRoute}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", marginRight: 15 }}>
        <BottomCardButton
          style={{ marginRight: 10 }}
          title={t("TRIP_INFO_TEXT")}
          pressFunction={() => {
            dispatch(viewTripInfo());
            AccessibilityInfo.announceForAccessibility(
              "Showing Trip details screen."
            );
          }}
        />
        <BottomCardButton
          title={t("DIRECTIONS_TEXT")}
          pressFunction={() => dispatch(viewDirections())}
        />
      </View>
    </View>
  );

  return (
    <CustomCard dismissCard={cancelAndCloseRoute} content={content} cardVisible={true}/>  
  );
};
