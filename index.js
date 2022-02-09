/**
 * @format
 */

import React from "react";
import { AppRegistry } from "react-native";

//-------------------------------------------------------------------------------------------------
// https://github.com/software-mansion/react-native-gesture-handler/issues/320
import "react-native-gesture-handler";
import "./i18n";

//-------------------------------------------------------------------------------------------------
// Redux
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/reducers";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//-------------------------------------------------------------------------------------------------

import App from "./src/App";
import { name as appName } from "./app.json";
import { ReactNativeKeycloakProvider } from "@react-keycloak/native";
import keycloak from "./src/keycloak";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  applyMiddleware(thunkMiddleware)
);
const persister = persistStore(store);

const Index = () => (
  <ReactNativeKeycloakProvider
    authClient={keycloak}
    initOptions={{
      redirectUri: "com.accessmap://home",
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </Provider>
  </ReactNativeKeycloakProvider>
);

AppRegistry.registerComponent(appName, () => Index);
