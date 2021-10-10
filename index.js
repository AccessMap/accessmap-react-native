/**
 * @format
 */

import React, { Component } from "react";
import { AppRegistry } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-async-storage/async-storage';

// https://github.com/software-mansion/react-native-gesture-handler/issues/320
import 'react-native-gesture-handler'; 

import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import "./i18n";

import App from "./src/App";
import { name as appName } from "./app.json";

import rootReducer from "./src/reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

class Index extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => Index);
