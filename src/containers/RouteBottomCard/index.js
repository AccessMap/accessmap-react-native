import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

import { connect } from 'react-redux';

const RouteBottomCard = props => {
	return (
		<Card containerStyle={styles.routeBottomCard}>
			<View>
				<Text style={{fontSize: 20}}>Route</Text>
			</View>
		</Card>
	);
}

export default RouteBottomCard;

const styles = StyleSheet.create({
	routeBottomCard: {
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		left: 0,
		right: 0,
		maxWidth: 380,
		bottom: 0,
		margin: 10,
		marginBottom: 10,
		padding: 5,
		zIndex: 20,
	},
});
