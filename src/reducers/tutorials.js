// Reducer for map loading state
import {
  TOGGLE_MAP_TUTORIAL,
  TOGGLE_ROUTE_TUTORIAL,
} from "../actions";
import { logEvent } from "../actions/trackUser"

const initialState = {
    showingMapTutorial: false,
    showingRouteTutorial: false,
};

export function tutorialReducer(state = initialState, action) {
  logEvent(action.type, []);
  switch (action.type) {
    case TOGGLE_MAP_TUTORIAL:
      return {
        ...state,
        showingMapTutorial: !state.showingMapTutorial,
        showingRouteTutorial: false,
      };
    case TOGGLE_ROUTE_TUTORIAL:
      return {
        ...state,
        showingRouteTutorial: !state.showingRouteTutorial,
        showingMapTutorial: false,
      };
    default:
      return state;
  }
}

export type TutorialState = ReturnType<typeof tutorialReducer>;
