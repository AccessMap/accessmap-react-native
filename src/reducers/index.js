import { combineReducers } from "redux";
import { mapReducer as map } from "./mapInteraction";
import { mapLoadingReducer as mapLoad } from "./mapLoading";
import { mobilityReducer as mobility } from "./mobilityModes";
import { settingsReducer as setting } from "./settings";
import { tutorialReducer as tutorial } from "./tutorials";
import { signInReducer as signIn } from "./signin";

// Define the states
const rootReducer = combineReducers({
  map,
  mapLoad,
  mobility,
  setting,
  tutorial,
  signIn,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
