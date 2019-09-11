import React, { Component } from 'react';
import {View, FlatList, Text} from 'react-native';
import {SearchBar} from 'react-native-elements';

export default class SearchPage extends Component {
	static navigationOptions = {title: 'Search'};

	render() {
		return (
			<View>
				<Text>Itsa me!</Text>
			</View>
		);
	}
}
