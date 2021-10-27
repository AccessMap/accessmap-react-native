import { NativeModules, Platform } from "react-native";
import { combineReducers } from "redux";
import { mapReducer as map } from "./mapInteraction";
import { mapLoadingReducer as mapLoad } from "./mapLoading";
import { mobilityReducer as mobility } from "./mobilityModes";
import { settingsReducer as setting } from "./settings";
import { tutorialReducer as tutorial } from "./tutorials";
import { signInReducer as signIn } from "./signin";

const { Rakam } = NativeModules;
export const logEvent = async (type, props) => {
  if (Platform.OS === "android") {
    Rakam.trackEvent(type, props);
  }
};

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
