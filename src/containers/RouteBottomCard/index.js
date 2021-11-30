// A RouteBottomCard appears at the bottom of the screen after a user selects a start and end
// location for their route. The Card contains information about distance, time, and buttons
// to view the Trip Info and Directions.
import React, { useRef } from "react";
import { View, Text, AccessibilityInfo, Animated } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { cancelRoute, closeDirections, closeTripInfo, viewDirections, viewTripInfo } from "../../actions";
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

  const panY = useRef(new Animated.Value(0)).current;

  if (viewingDirections || viewingTripInfo) {
    return null;
  } else if (!route || route.code != "Ok") {
    console.log(route)
    return (
      <CustomCard 
        cardVisible={true}
        panY={panY}
        dismissCard={cancelAndCloseRoute}
        content={<View style={{paddingBottom: 15}}>
          <Header close={cancelAndCloseRoute} 
            title={t("NO_ROUTE_TEXT")}
            panY={panY}
          />
          <Text style={{color:"red"}}>{route.msg + ". " + t("NO_ROUTE_PARAGRAPH")}</Text>
          </View>
        }
      />
    );
  }

  const calculatedRoute = route.routes[0];

  AccessibilityInfo.announceForAccessibility(
    "Route has been found. " +
      "Select Trip info or Directions button for more details"
  );

  const content = (
    <View style={{height: "100%", paddingBottom: 15}}>
      <View>
        <Header
          title={ "" + (usingMetricSystem ? 
            Math.round(calculatedRoute.distance) : 
            Math.round(calculatedRoute.distance * 0.000621371192 * 100) / 100) + " " + 
              (usingMetricSystem ? t("METERS_TEXT") : t("MILES_TEXT")) + " (" +
              (Math.round(calculatedRoute.duration / 60)) + " " + t("MINUTES_TEXT") + ")"
          }
          close={cancelAndCloseRoute}
          panY={panY}
        />
      </View>
      <View style={{ flex: 1, flexDirection: "row", paddingTop: 10, justifyContent: "space-between",}}>
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
    <CustomCard dismissCard={cancelAndCloseRoute} 
      content={content} 
      cardVisible={true}
      panY={panY}
    />  
  );
};
