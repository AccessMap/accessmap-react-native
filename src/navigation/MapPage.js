// The MapPage displays the map, top white card (Omnicard), and the bottom white cards.
import React, { useEffect, useState } from "react";
import { View, AccessibilityInfo, Alert, StatusBar, Platform, } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDirections,
  closeTripInfo,
  toggleMapTutorial,
  toggleMobilityProfile,
  toggleRouteTutorial,
} from "../actions";
import { Views } from "../styles";

import MapView from "../components/organisms/MapView";
import LoadingScreen from "../components/atoms/LoadingScreen";
import Zooms from "../components/atoms/Button/MapButtons/Zooms";
import OmniCard from "../components/molecules/OmniCard";
import FeatureCard from "../components/molecules/FeatureCard";
import RouteBottomCard from "../components/molecules/RouteBottomCard";

import Directions from "../components/organisms/Directions";
import TripInfo from "../components/organisms/TripInfo";

import { useTranslation } from "react-i18next";
import { useNetInfo } from "@react-native-community/netinfo";
import MobilityProfile from "../components/organisms/MobilityProfile";

import ToolTip from "../components/molecules/TutorialComponents/ToolTip";
import { mapTutorialContent, routeTutorialContent } from "../constants/tutorial-content";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootState } from "../reducers";

export default function MapPage(props) {
  let pinFeatures = useSelector((state: RootState) => state.map.pinFeatures);
  let route = useSelector((state: RootState) => state.map.route);
  let viewingDirections = useSelector(
    (state: RootState) => state.map.viewingDirections
  );
  let viewingTripInfo = useSelector(
    (state: RootState) => state.map.viewingTripInfo
  );
  let viewingMobilityProfile = useSelector(
    (state: RootState) => state.mobility.viewingMobilityProfile
  );
  let isLoading = useSelector((state: RootState) => state.mapLoad.isLoading);
  let showingMapTutorial = useSelector(
    (state: RootState) => state.tutorial.showingMapTutorial
  );
  let showingRouteTutorial = useSelector((state: RootState) => 
    state.tutorial.showingRouteTutorial);
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
          close={() => {
            dispatch(toggleMobilityProfile())
            AccessibilityInfo.announceForAccessibility("Mobility Profile closed.")
          }}
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
        edges={null}
        style={{ 
          flex: 1, backgroundColor: "white", 
          paddingTop: (StatusBar.currentHeight && Platform.OS === "android" ? 
            StatusBar.currentHeight - 10 : 0)
        }}
        >

        <StatusBar
          translucent={true}
          barStyle="dark-content"
          backgroundColor={'rgba(52, 52, 52, 0)'}
          />

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
                maxStep={mapTutorialContent.length}
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
                maxStep={routeTutorialContent.length}
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
