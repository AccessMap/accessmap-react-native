// Reducer for map loading state
import { AccessibilityInfo } from "react-native";
import { MAP_LOADED, MAP_LOADING } from "../actions";

const initialState = { isLoading: true };

export function mapLoadingReducer(state = initialState, action) {
  switch (action.type) {
    case MAP_LOADING:
      return { ...state, isLoading: true };
    case MAP_LOADED:
      AccessibilityInfo.announceForAccessibility("Map successfully loaded.");
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
