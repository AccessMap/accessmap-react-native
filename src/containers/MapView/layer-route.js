import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

import styles from './map-styles';

const fetchRoute = async (query) => {
	const route = await fetch(query)
		.then(response => response.json())
		.then(json => json.routes[0]);
	
	return {
		type: 'Feature',
		geometry: route.geometry,
		properties: {},
	}
}

const LayerRoute = props => {
	const query='https://www.accessmap.io/api/v1/routing/directions/wheelchair.json?lon1=-122.335499&lat1=47.609501&lon2=-122.33231&lat2=47.609482&uphill=0.2&downhill=0.1&avoidCurbs=1&timestamp=1562868827948';
	var route = null;

	const findRoute = async query => {
		route = await fetchRoute(query);
		console.log(route);
	}
	findRoute(query);

	return (
		<MapboxGL.ShapeSource
			id='route'
			shape={{
				type: 'FeatureCollection',
				features: [{
					type: 'Feature',
					geometry: {
						coordinates: [
							[-122.33547895535392, 47.60945309656686],
							[-122.3348250399999, 47.60972671999999],
							[-122.3346806199999, 47.60957426],
							[-122.3343648799999, 47.60922922999999],
							[-122.3341993699999, 47.60929852],
						],
						type: 'LineString'
					},
					properties: {}
				}]
			}}
		>
			<MapboxGL.LineLayer
				id='route-fill'
				sourceID='route'
				layerIndex={60}
				style={{lineColor: '#0000FF', lineWidth: 25}}
			/>
		</MapboxGL.ShapeSource>
	);
}

export default connect(null, null)(LayerRoute);
