import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

import { fetchRoute } from '../../actions';
import styles from './map-styles';

const LayerRoute = props => {
	const { route } = props;

	return (
		<MapboxGL.ShapeSource
			id='route'
			shape={{
				type: 'FeatureCollection',
				features: [{
					type: 'Feature',
					geometry: {
						coordinates: route.routes[0].geometry.coordinates,
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
				style={styles.routeFill}
			/>
		</MapboxGL.ShapeSource>
	);
}

const mapStateToProps = state => {
	return { route: state.route };
}

export default connect(mapStateToProps)(LayerRoute);
