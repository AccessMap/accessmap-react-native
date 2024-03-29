// Reducer for map loading state
import {
  SET_CUSTOM_AVOID_CURBS,
  SET_CUSTOM_DOWNHILL,
  SET_CUSTOM_UPHILL,
  SET_MOBILITY_MODE,
  SHOWING_DOWNHILL_COLORS,
  SHOWING_UPHILL_COLORS,
  TOGGLE_BARRIERS,
  TOGGLE_MOBILITY_PROFILE,
} from "../actions";
import { MOBILITY_MODE_CUSTOM } from "../constants";
import { logEvent } from "../actions/trackUser"

const initialState = {
  mobilityMode: MOBILITY_MODE_CUSTOM,
  customUphill: 8,
  customDownhill: 10,
  avoidRaisedCurbs: true,
  showingUphillColors: true, // either uphill or downhill colors on map
  viewingMobilityProfile: false,
};

export function mobilityReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOBILITY_MODE:
      logEvent(action.type, ["mode", action.mode]);
      return { ...state, mobilityMode: action.mode };
    case SET_CUSTOM_UPHILL:
      // logEvent(action.type, ["incline", `${action.incline}`]);
      return { ...state, customUphill: action.incline };
    case SET_CUSTOM_DOWNHILL:
      // logEvent(action.type, ["incline", `${action.incline}`]);
      return { ...state, customDownhill: action.incline };
    case SET_CUSTOM_AVOID_CURBS:
      return { ...state, avoidRaisedCurbs: action.avoid_curbs };
    case TOGGLE_BARRIERS:
      logEvent(action.type, ["avoidRaisedCurbs", `${!state.avoidRaisedCurbs}`]);
      return { ...state, avoidRaisedCurbs: !state.avoidRaisedCurbs };
    case SHOWING_UPHILL_COLORS:
      return { ...state, showingUphillColors: true };
    case SHOWING_DOWNHILL_COLORS:
      return { ...state, showingUphillColors: false };
    case TOGGLE_MOBILITY_PROFILE:
      return {
        ...state,
        viewingMobilityProfile: !state.viewingMobilityProfile,
      };
    default:
      return state;
  }
}
