// Reducer for map interactions
import { logEvent } from ".";
import {
  CANCEL_ROUTE,
  CLOSE_DIRECTIONS,
  CLOSE_TRIP_INFO,
  GO_TO_LOCATION,
  LOCATE_USER,
  PLACE_PIN,
  RECEIVE_ROUTE,
  REVERSE_ROUTE,
  SET_DESTINATION,
  SET_ORIGIN,
  VIEW_DIRECTIONS,
  VIEW_TRIP_INFO,
  ZOOM_IN,
  ZOOM_OUT,
} from "../actions";

import { SEATTLE } from "../constants";
import regions from "../constants/regions";

console.log(regions)
const seattleProps = regions[SEATTLE].properties;
const seattleCoords = [seattleProps.lon, seattleProps.lat];

const initialState = {
  locateUserSwitch: false,
  canAccessLocation: false,
  zoomLevel: 14,
  centerCoordinate: seattleCoords,
  geocodeCoords: null,
  pinFeatures: null,
  origin: null,
  destination: null,
  originText: null,
  destinationText: null,
  viewingTripInfo: false,
  viewingDirections: false,
  route: null,
};

export function mapReducer(state = initialState, action) {
  switch (action.type) {
    case ZOOM_IN:
      return { ...state, zoomLevel: state.zoomLevel + 1 };
    case ZOOM_OUT:
      return { ...state, zoomLevel: state.zoomLevel - 1 };
    case GO_TO_LOCATION:
      logEvent(action.type, [
        "lat",
        `${action.item.center[0]}`,
        "lon",
        `${action.item.center[1]}`,
      ]);
      return { ...state, geocodeCoords: action.item.center };
    case PLACE_PIN:
      logEvent(
        action.type,
        action.item == null
          ? ["segment", "null"]
          : ["segment", action.item.description]
      );
      return { ...state, pinFeatures: action.item };
    case LOCATE_USER:
      return {
        ...state,
        locateUserSwitch: action.enable,
        canAccessLocation: true,
      };
    case RECEIVE_ROUTE:
      return { ...state, route: action.route };
    case SET_ORIGIN:
      const originText =
        state.pinFeatures && state.pinFeatures.text
          ? state.pinFeatures.text
          : null;
      logEvent(action.type, [
        "lat",
        `${state.pinFeatures.center[0]}`,
        "lon",
        `${state.pinFeatures.center[1]}`,
      ]);
      return {
        ...state,
        origin: state.pinFeatures.center,
        pinFeatures: null,
        originText,
      };
    case SET_DESTINATION:
      const destinationText =
        state.pinFeatures && state.pinFeatures.text
          ? state.pinFeatures.text
          : null;
      logEvent(action.type, [
        "lat",
        `${state.pinFeatures.center[0]}`,
        "lon",
        `${state.pinFeatures.center[1]}`,
      ]);
      return {
        ...state,
        destination: state.pinFeatures.center,
        pinFeatures: null,
        destinationText,
      };
    case REVERSE_ROUTE:
      logEvent(action.type, []);
      return {
        ...state,
        origin: state.destination,
        destination: state.origin,
        originText: state.destinationText,
        destinationText: state.originText,
      };
    case CANCEL_ROUTE:
      logEvent(action.type, []);
      return {
        ...state,
        origin: null,
        destination: null,
        originText: null,
        destinationText: null,
        route: null,
      };
    case VIEW_TRIP_INFO:
      logEvent(action.type, []);
      return { ...state, viewingTripInfo: true };
    case CLOSE_TRIP_INFO:
      logEvent(action.type, []);
      return { ...state, viewingTripInfo: false };
    case VIEW_DIRECTIONS:
      logEvent(action.type, []);
      return { ...state, viewingDirections: true };
    case CLOSE_DIRECTIONS:
      logEvent(action.type, []);
      return { ...state, viewingDirections: false };
    default:
      return state;
  }
}

export type MapState = ReturnType<typeof mapReducer>;