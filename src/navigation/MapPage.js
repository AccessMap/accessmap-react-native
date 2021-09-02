// The MapPage displays the map, top white card (Omnicard), and the bottom white cards.
import React, { useEffect } from "react";
import { View, AccessibilityInfo, Alert, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { closeDirections, closeTripInfo } from "../actions";
import { Views } from "../styles";

import MapView from "../containers/MapView";
import LoadingScreen from "../components/LoadingScreen";
import Zooms from "../containers/MapButtons/Zooms";
import OmniCard from "../containers/OmniCard";
import FeatureCard from "../containers/FeatureCard";
import RouteBottomCard from "../containers/RouteBottomCard";

import Directions from "../components/Directions";
import TripInfo from "../components/TripInfo";

import { useTranslation } from 'react-i18next';
import { useNetInfo } from "@react-native-community/netinfo";

export default function MapPage(props) {
  let pinFeatures = useSelector((state: RootState) => {return state.pinFeatures});
  let route = useSelector((state: RootState) => {return state.route});
  let viewingDirections = useSelector((state: RootState) => {return state.viewingDirections});
  let viewingTripInfo = useSelector((state: RootState) => {return state.viewingTripInfo});
  let isLoading = useSelector((state: RootState) => {return state.isLoading});
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

  AccessibilityInfo.announceForAccessibility("Showing Map View.");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Views.page}>
        <View style={Views.container}>
          <View style={{ flex: 1 }}>
            <View
              importantForAccessibility={route ? "no-hide-descendants" : "yes"}
              style={{ flex: 1 }}
            >
              <MapView />
            </View>
            {!viewingDirections && !viewingTripInfo && (
              <OmniCard navigation={props.navigation} />
            )}
            <Zooms navigation={props.navigation}/>
          </View>

          {isLoading && <LoadingScreen />}
          {pinFeatures && (<FeatureCard navigation={props.navigation} />)}
          {route && !pinFeatures && <RouteBottomCard />}
          {viewingDirections && (
            <Directions
              route={route}
              close={() => dispatch(closeDirections())}
            />
          )}
          {viewingTripInfo && (
            <TripInfo
              route={route}
              close={() => dispatch(closeTripInfo())}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
