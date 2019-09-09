import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import {AppRegistry} from 'react-native';

import App from './src/App';

import mapApp from './src/reducers';

const store = createStore(mapApp);

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
