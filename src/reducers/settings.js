import { logEvent } from ".";
import {
  GO_TO_LANGUAGE,
  GO_TO_REGION,
  TRACK_USER_ACTIONS,
  UNTRACK_USER_ACTIONS,
  USE_IMPERIAL_SYSTEM,
  USE_METRIC_SYSTEM,
} from "../actions";
import { SEATTLE } from "../constants";
import languages from "../constants/languages";
import regions from "../constants/regions";

const seattleProps = regions[SEATTLE].properties;
const seattleCoords = [seattleProps.lon, seattleProps.lat];
const englishLanguageProps = languages[0];

// Reducer for map loading state
const initialState = {
  usingMetricSystem: false, // meters vs miles
  trackUserActions: false,
  bbox: seattleProps.bounds,
  centerCoordinate: seattleCoords,
  currRegion: seattleProps.name.toUpperCase(),
  currLanguage: englishLanguageProps.key.toLowerCase(),
};

export function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case USE_METRIC_SYSTEM:
      logEvent(action.type, []);
      return { ...state, usingMetricSystem: true };
    case USE_IMPERIAL_SYSTEM:
      logEvent(action.type, []);
      return { ...state, usingMetricSystem: false };
    case TRACK_USER_ACTIONS:
      return { ...state, trackUserActions: true };
    case UNTRACK_USER_ACTIONS:
      return { ...state, trackUserActions: false };
    case GO_TO_REGION:
      logEvent(action.type, ["region", action.region.properties.name]);
      // centerCoordinate, bbox
      return {
        ...state,
        geocodeCoords: [
          action.region.properties.lon,
          action.region.properties.lat,
        ],
        bbox: action.region.properties.bounds,
        currRegion: action.region.properties.name.toUpperCase(),
      };
    case GO_TO_LANGUAGE:
      logEvent(action.type, ["language", action.language.name]);
      // centerCoordinate, bbox
      return {
        ...state,
        language: action.language,
        currLanguage: action.language.key.toLowerCase(),
      };
    default:
      return state;
  }
}
export type SettingState = ReturnType<typeof settingsReducer>;