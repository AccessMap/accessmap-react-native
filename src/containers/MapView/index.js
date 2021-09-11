import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AccessibilityInfo, NativeModules } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";

import LayerSidewalks from "./layer-sidewalks";
import LayerCrossings from "./layer-crossings";
import LayerElevators from "./layer-elevator-paths";
import LayerAnnotations from "./layer-annotations";
import LayerRoute from "./layer-route";
import { Views } from "../../styles";
import {
  //   goToLocation,
  locateUser,
  placePin,
  fetchRoute,
  mapLoaded,
} from "../../actions";
import {
	// MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
	ACCESS_TOKEN,
  } from "../../constants";
  import { usePrevious } from "../../utils/usePreviousHook";

const { Rakam } = NativeModules;

MapboxGL.setAccessToken(ACCESS_TOKEN);
MapboxGL.setTelemetryEnabled(false);

export default function MapView() {
  const dispatch = useDispatch();
  const [userLoc, setUserLoc] = useState(null);
  const map = useRef(null);
  const camera = useRef(null);
  if (Platform.OS === "android") {
    MapboxGL.setConnected(true);
  }

  let mobilityCode = useSelector((state: RootState) => state.mobilityMode);
  let centerCoordinate = useSelector((state: RootState) => state.centerCoordinate);
  let zoomLevel = useSelector((state: RootState) => state.zoomLevel);
  let geocodeCoords = useSelector((state: RootState) => state.geocodeCoords);
  let origin = useSelector((state: RootState) => state.origin);
  let destination = useSelector((state: RootState) => state.destination);
  let route = useSelector((state: RootState) => state.route);
  let viewingDirections = useSelector((state: RootState) => state.viewingDirections);
  let viewingTripInfo = useSelector((state: RootState) => {return state.viewingTripInfo});
  let canAccessLocation = useSelector((state: RootState) => state.canAccessLocation);
  let locateUserSwitch = useSelector((state: RootState) => state.locateUserSwitch);

  let customUphill = useSelector((state: RootState) => state.customUphill);
  let customDownhill = useSelector((state: RootState) => state.customDownhill);
  let avoidRaisedCurbs = useSelector((state: RootState) => state.avoidRaisedCurbs);
//   let bbox = useSelector((state: RootState) => state.bbox);
  //   const bounds = {
  // 	sw: [bbox[1], bbox[0]],
  // 	ne: [bbox[3], bbox[2]],
  //   };
  let prevZoomLevel = usePrevious(zoomLevel);

  useEffect(() => { // changing and displaying routes
    const preferences = getPreferences(mobilityCode);
    const uphill = preferences[0] / 100;
    const downhill = preferences[1] / 100;
    const avoidCurbs = preferences[2];
    dispatch(fetchRoute(origin, destination, uphill, downhill, avoidCurbs));
  }, [origin, destination, mobilityCode]);
  useEffect(() => { // update zoom level
    zoomPress(zoomLevel, prevZoomLevel);
  }, [zoomLevel]);
  useEffect(() => { // set camera coordinates
    if (camera.current && geocodeCoords) {
      camera.current.setCamera({
        centerCoordinate: geocodeCoords,
        animationDuration: 1000,
      });
    }
  }, [geocodeCoords]);
  useEffect(() => { // map pan to user location
    if (locateUserSwitch && userLoc) { userLocationPress() }
  }, [userLoc, locateUserSwitch]);
  useEffect(() => {
    updatePath();
  }, [route]);

  const getPreferences = (mode) => {
    switch (mode) {
      case MOBILITY_MODE_WHEELCHAIR:
        return [8, 10, 1];
      case MOBILITY_MODE_POWERED:
        return [12, 12, 1];
      case MOBILITY_MODE_CANE:
        return [14, 14, 0];
      default:
        return [customUphill, customDownhill, avoidRaisedCurbs,];
    }
  };

  const zoomPress = async (zoom, prevZoom) => {
    if (!map.current || !camera.current || !prevZoom) { return; }
      const currZoom = await map.current.getZoom();
      if (zoom > prevZoom) {
        camera.current.zoomTo(currZoom + 1, 200);
        if (Platform.OS === "android") {
        Rakam.trackEvent("ZOOM_IN", ["newZoom", "" + (currZoom + 1)]); }
        AccessibilityInfo.announceForAccessibility(
          currZoom >= 20
            ? "Zoom level unchanged. Maximum reached."
            : "Zoom level increased to " + Math.round(currZoom + 1)
        );
      } else if (zoom < prevZoom) {
        camera.current.zoomTo(currZoom - 1, 200);
        if (Platform.OS === "android") {
          Rakam.trackEvent("ZOOM_OUT", ["newZoom", "" + (currZoom - 1)]); 
        }
        AccessibilityInfo.announceForAccessibility(
          currZoom <= 10
            ? "Zoom level unchanged. Minimum reached."
            : "Zoom level decreased to " + Math.round(currZoom - 1)
        );
      }
  };

  const userLocationPress = async () => {
    if (!camera.current) { return; } 
    const ul = userLoc.coords;
    const center = [ul.longitude, ul.latitude];

    dispatch(locateUser(false));
    //dispatch(goToLocation({...featureCollection, center}));
    await camera.current.setCamera({
      centerCoordinate: center,
      animationDuration: 1000,
    });

    const pointInView = await map.current.getPointInView(center);
    const featureCollection = await map.current.queryRenderedFeaturesAtPoint(
      pointInView,
      null,
      ["sidewalk-press", "crossing-press", "elevator-press"]
    );
    dispatch(placePin({ ...featureCollection, center }));
  };

  const updatePath = () => {
    if (camera.current && route && route.code == "Ok") {
      var [maxLon, maxLat, minLon, minLat] = [-180, -90, 180, 90];
      var path = route.routes[0].geometry.coordinates;
      // let distance = 0;
      if (path) {
        for (var i = 0; i < path.length; i++) {
          if (path[i][0] > maxLon) {
            maxLon = path[i][0];
          }
          if (path[i][0] < minLon) {
            minLon = path[i][0];
          }
          if (path[i][1] > maxLat) {
            maxLat = path[i][1];
          }
          if (path[i][1] < minLat) {
            minLat = path[i][1];
          }
        }
        var northEast = [maxLon, maxLat];
        var southWest = [minLon, minLat];
        camera.current.fitBounds(northEast, southWest, viewingDirections ? 20 : 100, 100);
      }
    }
  };

  const handleScreenPress = async (e) => {
    if (viewingDirections || viewingTripInfo) {return;}
    const center = e.geometry.coordinates;
    const { screenPointX, screenPointY } = e.properties;
    const featureCollection = await map.current.queryRenderedFeaturesAtPoint(
      [screenPointX, screenPointY], null, 
	  ["sidewalk-press", "crossing-press", "elevator-press"]
    );
    dispatch(placePin({ ...featureCollection, center }));
  };

  const panMap = async (e) => {
    if (e) {
      const center = e.geometry.coordinates;
      if (Platform.OS === "android") {
        Rakam.trackEvent("MOVE_MAP", [
          "lat",
          `${center[0]}`,
          "lon",
          `${center[1]}`,
        ]);
      }
    }
  };

  const updateUserLocation = (location) => {
    // const timestamp = location.timestamp;
    // const latitude = location.coords.latitude;
    // const longitude = location.coords.longitude;
    // const altitude = location.coords.altitude;
    // const heading = location.coords.heading;
    // const accuracy = location.coords.accuracy;
    // const speed = location.coords.speed;
    setUserLoc(location);
  };
  
  return (
    <MapboxGL.MapView
      logoEnabled={false}
      attributionEnabled={false}
      compassViewPosition={3}
      compassViewMargins={{x: 19, y: 190}}
      ref={map}
      style={Views.map}
      onPress={handleScreenPress}
      onLongPress={handleScreenPress}
      onRegionDidChange={panMap}
      onDidFinishLoadingStyle={() => { dispatch(mapLoaded());}}
    >
      {canAccessLocation && (
        <MapboxGL.UserLocation 
			visible={true} 
			onUpdate={updateUserLocation} 
			showsUserHeadingIndicator={true}
		/>
      )}
      <MapboxGL.Camera
        ref={camera}
        animationDuration={200}
        defaultSettings={{ centerCoordinate, zoomLevel }}
        minZoomLevel={10}
        maxZoomLevel={20}
      />

      <LayerAnnotations />

      <MapboxGL.VectorSource
        id="pedestrian"
        url="https://www.accessmap.io/tiles/tilejson/pedestrian.json"
      >
        <LayerSidewalks />
        <LayerCrossings />
        <LayerElevators />
      </MapboxGL.VectorSource>

      {route && route.code == "Ok" && <LayerRoute />}
    </MapboxGL.MapView>
  );
}
