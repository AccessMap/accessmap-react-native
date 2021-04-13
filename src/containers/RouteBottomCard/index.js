import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { viewDirections, viewTripInfo } from '../../actions';

const RouteBottomCard = props => {
	const { t, i18n } = useTranslation();
	
	if (props.viewingDirections || props.viewingTripInfo) {
		return null;
	} else if (!props.route || props.route.code != "Ok") {
		return (
			<Card containerStyle={styles.routeBottomCard}>
				<View style={{margin: 5}}>
					<Text style={{fontSize: 20, marginRight: 20}}>{t("NO_ROUTE_TEXT")}</Text>
				</View>
			</Card>
		);
	}

	const route = props.route.routes[0];

	return (
		<Card containerStyle={styles.routeBottomCard}>
			<View style={{margin: 5, width: "100%"}}>
				<View accessible={true} style={{flex: 1, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
					<Text style={{fontSize: 20, marginRight: 20}}>{t("ROUTE_TEXT")}</Text>
					<Text style={{marginRight: 20}}>{Math.round(route.distance)} {t("METERS_TEXT")}</Text>
					<Text>{Math.round(route.duration / 60)} {t("MINUTES_TEXT")}</Text>
				</View>
				<View style={{flex: 1, flexDirection: "row", width: "100%", marginBottom: 5}}>
					<Button
						title={t("TRIP_INFO_TEXT")}
						onPress={() => props.viewTripInfo()}
						containerStyle={{flex: 1, marginRight: 10, width: "40%"}}
					/>
					<Button
						title={t("DIRECTIONS_TEXT")}
						onPress={() => props.viewDirections()}
						containerStyle={{flex: 1, marginRight: 10, width: "40%"}}
					/>
				</View>
			</View>
		</Card>
	);
}

const mapStateToProps = state =>  {
	return {
		route: state.route,
		viewingTripInfo: state.viewingTripInfo,
		viewingDirections: state.viewingDirections,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		viewDirections: () => {
			dispatch(viewDirections());
		},
		viewTripInfo: () => {
			dispatch(viewTripInfo());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteBottomCard);

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
