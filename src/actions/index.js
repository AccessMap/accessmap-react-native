import { Alert } from "react-native";

//---------------------------Loading-related actions---------------------------//
export const MAP_LOADING = "LOADING";
export function mapLoading() {
  return { type: MAP_LOADING };
}

export const MAP_LOADED = "MAP_LOADED";
export function mapLoaded() {
  return { type: MAP_LOADED };
}

//---------------------------Mobility Mode Settings---------------------------//
export const TOGGLE_MOBILITY_PROFILE = "TOGGLE_MOBILITY_PROFILE";
export function toggleMobilityProfile() {
  return { type: TOGGLE_MOBILITY_PROFILE };
}

export const SET_MOBILITY_MODE = "SET_MOBILITY_MODE";
export function setMobilityMode(mode) {
  return { type: SET_MOBILITY_MODE, mode };
}

export const SET_CUSTOM_UPHILL = "SET_CUSTOM_UPHILL";
export function setCustomUphill(incline) {
  return { type: SET_CUSTOM_UPHILL, incline };
}
export const SET_CUSTOM_DOWNHILL = "SET_CUSTOM_DOWNHILL";
export function setCustomDownhill(incline) {
  return { type: SET_CUSTOM_DOWNHILL, incline };
}
export const SHOWING_UPHILL_COLORS = "SHOWING_UPHILL_COLORS";
export function showUphill() {
  return { type: SHOWING_UPHILL_COLORS };
}
export const SHOWING_DOWNHILL_COLORS = "SHOWING_DOWNHILL_COLORS";
export function showDownhill() {
  return { type: SHOWING_DOWNHILL_COLORS };
}

export const TOGGLE_BARRIERS = "TOGGLE_BARRIERS";
export function toggleBarriers() {
  return { type: TOGGLE_BARRIERS };
}

//-------------------------------Sign in actions-------------------------------//
export const AUTHENTICATION_REQUEST = "AUTHENTICATION_REQUEST";
export const authenticate = () => ({ type: AUTHENTICATION_REQUEST });
export const RECEIVED_CREDENTIALS = "RECEIVED_CREDENTIALS";
export const receivedCredentials = (token, token_secret) => ({
  type: RECEIVED_CREDENTIALS,
  payload: { token, token_secret },
  meta: {
    analytics: {
      type: "user-received-credentials",
    },
  },
});
export const AUTHENTICATION_SUCCESS = "AUTHENTICATION_SUCCESS";
export const authenticationSuccess = () => ({ type: AUTHENTICATION_SUCCESS });
export const AUTHENTICATION_FAILURE = "AUTHENTICATION_FAILURE";
export const authenticationFailure = message => ({
  type: AUTHENTICATION_FAILURE,
  payload: { message }
});
export const LOGIN = "LOGIN"
export const logIn = (accessToken, refreshToken) => ({
  type: LOGIN,
  payload: { accessToken, refreshToken },
  meta: {
    analytics: {
      type: "log-in",
      payload: { accessToken, refreshToken }
    }
  }
});

export const LOGOUT = "LOGOUT"
export const logOut = () => ({
  type: LOGOUT,
  meta: {
    analytics: {
      type: "log-out"
    }
  }
});

//---------------------------Map-interacting actions---------------------------//
export const ZOOM_IN = "ZOOM_IN";
export function zoomIn() {
  return { type: ZOOM_IN };
}
export const ZOOM_OUT = "ZOOM_OUT";
export function zoomOut() {
  return { type: ZOOM_OUT };
}

export const GO_TO_LOCATION = "GO_TO_LOCATION";
export function goToLocation(item) {
  return { type: GO_TO_LOCATION, item };
}

export const PLACE_PIN = "PLACE_PIN";
export function placePin(item) {
  return { type: PLACE_PIN, item };
}

export const SET_ORIGIN = "SET_ORIGIN";
export function setOrigin() {
  return { type: SET_ORIGIN };
}
export const SET_DESTINATION = "SET_DESTINATION";
export function setDestination() {
  return { type: SET_DESTINATION };
}

export const VIEW_TRIP_INFO = "VIEW_TRIP_INFO";
export function viewTripInfo() {
  return { type: VIEW_TRIP_INFO };
}
export const CLOSE_TRIP_INFO = "CLOSE_TRIP_INFO";
export function closeTripInfo() {
  return { type: CLOSE_TRIP_INFO };
}

export const VIEW_DIRECTIONS = "VIEW_DIRECTIONS";
export function viewDirections() {
  return { type: VIEW_DIRECTIONS };
}
export const CLOSE_DIRECTIONS = "CLOSE_DIRECTIONS";
export function closeDirections() {
  return { type: CLOSE_DIRECTIONS };
}

export const LOCATE_USER = "LOCATE_USER";
export function locateUser(enable) {
  return { type: LOCATE_USER, enable };
}

//---------------------------Route-finding actions---------------------------//

export const CANCEL_ROUTE = "CANCEL_ROUTE";
export function cancelRoute() {
  return { type: CANCEL_ROUTE };
}

export const REVERSE_ROUTE = "REVERSE_ROUTE";
export function reverseRoute() {
  return { type: REVERSE_ROUTE };
}

export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
function receiveRoute(json) {
  return {
    type: RECEIVE_ROUTE,
    route: json,
  };
}

export function fetchRoute(origin, destination, uphill, downhill, avoidCurbs) {
  // console.log("Fetching route: o=" + origin + ", d=" + destination 
  //   + ", u=" + uphill + ", d=" + downhill  + ", avoidCurbs=" + avoidCurbs)
  return (dispatch) => {
    if (origin && destination) {
      dispatch(mapLoading());
      const data = {
        lon1: origin[0],
        lat1: origin[1],
        lon2: destination[0],
        lat2: destination[1],
        uphill,
        downhill,
        avoidCurbs,
      };
      const queryString = Object.keys(data)
        .map((key) => key + "=" + encodeURIComponent(data[key]))
        .join("&");

      const url =
        "https://www.accessmap.io/api/v1/routing/directions/" +
        "wheelchair.json?" +
        queryString; // send to unweaver server for shortest path algorithm
      return fetch(url)
        .then((response) => response.json())
        .then((json) => {
          dispatch(receiveRoute(json));
          dispatch(mapLoaded());
        })
        .catch((error) => {
          console.log(error);
          dispatch(mapLoaded());
          Alert.alert("Failed to retrieve route data", error.message, [
            { text: "OK" },
          ]);
        });
    }
    return dispatch(receiveRoute(null));
  };
}

//---------------------------App-setting actions---------------------------//
export const GO_TO_LANGUAGE = "GO_TO_LANGUAGE";
export function goToLanguage(language) {
  return { type: GO_TO_LANGUAGE, language };
}

export const GO_TO_REGION = "GO_TO_REGION";
export function goToRegion(region) {
  return { type: GO_TO_REGION, region };
}

export const USE_METRIC_SYSTEM = "USE_METRIC_SYSTEM";
export function useMetricSystem() {
  // changes units to meters
  return { type: USE_METRIC_SYSTEM };
}
export const USE_IMPERIAL_SYSTEM = "USE_IMPERIAL_SYSTEM";
export function useImperialSystem() {
  // changes units to miles
  return { type: USE_IMPERIAL_SYSTEM };
}

export const TRACK_USER_ACTIONS = "TRACK_USER_ACTIONS";
export function trackUser() {
  return { type: TRACK_USER_ACTIONS };
}
export const UNTRACK_USER_ACTIONS = "UNTRACK_USER_ACTIONS";
export function untrackUser() {
  return { type: UNTRACK_USER_ACTIONS };
}

//---------------------------Tutorial Tooltips---------------------------//
export const TOGGLE_MAP_TUTORIAL = "TOGGLE_MAP_TUTORIAL";
export function toggleMapTutorial() {
  return { type: TOGGLE_MAP_TUTORIAL };
}
export const TOGGLE_ROUTE_TUTORIAL = "TOGGLE_ROUTE_TUTORIAL";
export function toggleRouteTutorial() {
  return { type: TOGGLE_ROUTE_TUTORIAL };
}
