// The MapPage displays the map, top white card (Omnicard), and the bottom white cards.
import React, { useEffect, useState } from "react";
import { View, AccessibilityInfo, Alert, Platform, StatusBar, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDirections,
  closeTripInfo,
  toggleMapTutorial,
  toggleMobilityProfile,
  toggleRouteTutorial,
} from "../actions";
import { Views } from "../styles";

import MapView from "../containers/MapView";
import LoadingScreen from "../components/LoadingScreen";
import Zooms from "../containers/MapButtons/Zooms";
import OmniCard from "../containers/OmniCard";
import FeatureCard from "../containers/FeatureCard";
import RouteBottomCard from "../containers/RouteBottomCard";

import Directions from "../components/Directions";
import TripInfo from "../components/TripInfo";

import { useTranslation } from "react-i18next";
import { useNetInfo } from "@react-native-community/netinfo";
import MobilityProfile from "../containers/MobilityProfile";

import ToolTip from "../components/TutorialComponents/ToolTip";
import { mapTutorialContent, routeTutorialContent } from "../constants/tutorial-content";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function MapPage(props) {
  let pinFeatures = useSelector((state: RootState) => state.pinFeatures);
  let route = useSelector((state: RootState) => state.route);
  let viewingDirections = useSelector(
    (state: RootState) => state.viewingDirections
  );
  let viewingTripInfo = useSelector(
    (state: RootState) => state.viewingTripInfo
  );
  let viewingMobilityProfile = useSelector(
    (state: RootState) => state.viewingMobilityProfile
  );
  let isLoading = useSelector((state: RootState) => state.isLoading);
  let showingMapTutorial = useSelector(
    (state: RootState) => state.showingMapTutorial
  );
  let showingRouteTutorial = useSelector((state: RootState) => state.showingRouteTutorial);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  // Output a log decsribing connection status of device
  const netInfo = useNetInfo({
    reachabilityTest: async (response) => response.status === 204,
    reachabilityLongTimeout: 60 * 1000, // 60s
    reachabilityShortTimeout: 5 * 1000, // 5s
    reachabilityRequestTimeout: 15 * 1000, // 15s
  });
  useEffect(() => {
    if (netInfo.isConnected != null && netInfo.isConnected == false) {
      Alert.alert(t("NO_LOCATION"), t("NO_INTERNET"), [{ text: "OK" }]);
    }
  }, [netInfo]);

  // Tooltip stuff
  const [numStep, goToNextStep] = useState(0);
  useEffect(() => {
    // to reset the tutorial to step 0
    goToNextStep(0);
  }, [showingMapTutorial, showingRouteTutorial]);

  function showBottomCard(navigation) {
    if (viewingMobilityProfile) {
      return (
        <MobilityProfile
          cardVisible={viewingMobilityProfile}
          close={() => dispatch(toggleMobilityProfile())}
        />
      );
    }
    if (viewingDirections) {
      return (
        <Directions
          cardVisible={viewingDirections}
          route={route}
          close={() => dispatch(closeDirections())}
        />
      );
    }
    if (viewingTripInfo) {
      return (
        <TripInfo
          cardVisible={viewingTripInfo}
          route={route}
          close={() => dispatch(closeTripInfo())}
        />
      );
    }
    if (pinFeatures) {
      return <FeatureCard navigation={navigation} />;
    } else if (route) {
      return <RouteBottomCard />;
    } else {
      return null;
    }
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView 
        edges={["top"]}
        style={{ flex: 1, backgroundColor: "white", }}>
        <View style={Views.page}>
          <View style={Views.container}>

            <View style={{ flex: 1}}>
              <View
                importantForAccessibility={
                  route ? "no-hide-descendants" : "yes"
                }
                style={{ flex: 1 }}
              >
                <MapView />
              </View>
              {!viewingDirections && !viewingTripInfo && (
                <OmniCard navigation={props.navigation} />
              )}
              <Zooms navigation={props.navigation} />
            </View>
            
            {isLoading && <LoadingScreen isLoading={isLoading}/>}

            {showingMapTutorial && (
              <ToolTip
                cardDescription={t("MAP_INTERFACE")}
                numStep={numStep}
                maxStep={6}
                toolTipPositionLeft={
                  mapTutorialContent[numStep].toolTipPositionLeft
                }
                toolTipPositionTop={
                  mapTutorialContent[numStep].toolTipPositionTop
                }
                arrowPositionLeft={mapTutorialContent[numStep].arrowPositionLeft}
                arrowPositionTop={mapTutorialContent[numStep].arrowPositionTop}
                heading={t(mapTutorialContent[numStep].heading)}
                paragraph={t(mapTutorialContent[numStep].paragraph)}
                goToNextStep={goToNextStep}
                navigation={props.navigation}
                onEnd={() => dispatch(toggleMapTutorial())}
              />)
            }

            {showingRouteTutorial && 
              <ToolTip 
                cardDescription={t("ROUTE_PLANNING")}
                numStep={numStep}
                maxStep={2}
                toolTipPositionLeft={
                  routeTutorialContent[numStep].toolTipPositionLeft
                }
                toolTipPositionTop={
                  routeTutorialContent[numStep].toolTipPositionTop
                }
                arrowPositionLeft={routeTutorialContent[numStep].arrowPositionLeft}
                arrowPositionTop={routeTutorialContent[numStep].arrowPositionTop}
                heading={t(routeTutorialContent[numStep].heading)}
                paragraph={t(routeTutorialContent[numStep].paragraph)}
                goToNextStep={goToNextStep}
                navigation={props.navigation}
                onEnd={() => dispatch(toggleRouteTutorial())}
              />
            }

            {showBottomCard(props.navigation)}
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
