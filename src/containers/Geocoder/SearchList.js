import React, { Component } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';

export default props => {
	const query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + props.search +'.json?access_token=' + accessToken;

	const matches = fetch(query)
		.then(response => response.json())
		.then(json => json.features)
		.catch(error => console.log('Ran into a problem'));

	console.log(matches);

	const _renderItem = ({item, index}) => {
		return (
			<ListItem
				style={styles.geocoderResult}
				onPress={() => {
					console.log('pressed');
					this.props.goToLocation(item);
				}}
				title={item.text}
				titleStyle={styles.geocoderResultText}
			/>
		);
	};
	

	return (
		<View>
			<FlatList
				style={styles.geocoderSearchList}
				data={matches}
				keyExtractor={(item, index) => index.toString()}
				renderItem={this._renderItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	geocoderSearchList: {
		backgroundColor: 'white',
		width: '100%',
	},
	geocoderResult: {
		width: '100%',
		height: 40,
		left: 0,
		right: 0,
		zIndex: 100,
	},
});

