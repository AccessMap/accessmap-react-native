import {
  GO_TO_LANGUAGE,
  TRACK_USER_ACTIONS,
  UNTRACK_USER_ACTIONS,
  USE_IMPERIAL_SYSTEM,
  USE_METRIC_SYSTEM,
} from "../actions";
import languages from "../constants/languages";
import { logEvent } from "../actions/trackUser"

const englishLanguageProps = languages[0];

// Reducer for map loading state
const initialState = {
  usingMetricSystem: false, // meters vs miles
  trackUserActions: false,
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