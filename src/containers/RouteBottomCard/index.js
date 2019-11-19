import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';

import { connect } from 'react-redux';

const RouteBottomCard = props => {
	if (!props.route || props.route.code != "Ok") {
		return (
			<Card containerStyle={styles.routeBottomCard}>
				<View style={{margin: 5}}>
					<Text style={{fontSize: 20, marginRight: 20}}>No route found</Text>
				</View>
			</Card>
		);
	}

	const route = props.route.routes[0];

	return (
		<Card containerStyle={styles.routeBottomCard}>
			<View style={{margin: 5, width: "100%"}}>
				<View style={{flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
					<Text style={{fontSize: 20, marginRight: 20}}>Route</Text>
					<Text style={{marginRight: 20}}>{Math.round(route.distance)} meters</Text>
					<Text>{Math.round(route.duration / 60)} minutes</Text>
				</View>
				<View style={{flex: 1, flexDirection: "row", width: "100%", marginBottom: 5}}>
					<Button title="TRIP INFO" containerStyle={{flex: 1, marginRight: 10, width: "40%"}} />
					<Button title="DIRECTIONS" containerStyle={{flex: 1, marginRight: 10, width: "40%"}} />
				</View>
			</View>
		</Card>
	);
}

const mapStateToProps = state =>  {
	return {
		route: state.route,
	};
}

export default connect(mapStateToProps)(RouteBottomCard);

const styles = StyleSheet.create({
	routeBottomCard: {
		backgroundColor: "#FFFFFF",
		position: "absolute",
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
