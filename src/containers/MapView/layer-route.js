import React from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

import { fetchRoute } from '../../actions';
import styles from './map-styles';

const LayerRoute = props => {
	const { route, origin, destination } = props;
	if (!route || route.code != "Ok") {
		return null;
	}
	routeCoords = route.routes[0].geometry.coordinates;

	const routeJogs = {
		type: "FeatureCollection",
		features: [{
				type: "Feature",
				geometry: {
					type: "LineString",
					coordinates: [
						origin,
						routeCoords[0],
					]
				},
				properties: {
					waypoint: "origin"
				}
			},
			{
				type: "Feature",
				geometry: {
					type: "LineString",
					coordinates: [
						routeCoords[routeCoords.length - 1],
						destination
					]
				},
				properties: {
					waypoint: "destination"
				}
			}
		]
	};

	return (
		<React.Fragment>
			<MapboxGL.ShapeSource
				id="route-jogs"
				shape={routeJogs}
			>
				<MapboxGL.LineLayer
					id="route-jogs"
					sourceID="route-jogs"
					layerIndex={59}
					style={styles.jogs}
				/>
			</MapboxGL.ShapeSource>
			<MapboxGL.ShapeSource
				id="route"
				shape={{
					type: "FeatureCollection",
					features: [{
						type: "Feature",
						geometry: {
							coordinates: routeCoords,
							type: "LineString"
						},
						properties: {}
					}]
				}}
			>
				<MapboxGL.LineLayer
					id="route-fill"
					sourceID="route"
					layerIndex={60}
					style={styles.routeFill}
				/>
				<MapboxGL.LineLayer
					id="route-outline"
					sourceID="route"
					layerIndex={61}
					style={styles.routeOutline}
				/>
			</MapboxGL.ShapeSource>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		route: state.route,
		origin: state.origin,
		destination: state.destination,
	};
}

export default connect(mapStateToProps)(LayerRoute);
