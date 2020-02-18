import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';

import thunkMiddleware from 'redux-thunk';

import App from './src/App';

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

AppRegistry.registerComponent('AccessMap', () => Index);
