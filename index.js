/**
 * @format
 */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './i18n';

import App from './src/App';
import {name as appName} from './app.json';

import mapApp from './src/reducers';

const store = createStore(
	mapApp,
	applyMiddleware(
		thunkMiddleware
	));

class Index extends Component<Props> {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}

AppRegistry.registerComponent(appName, () => Index);
