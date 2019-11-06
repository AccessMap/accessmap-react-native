import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import styles from './map-styles';

const LayerElevators = props => {
	return (
		<React.Fragment>
			<MapboxGL.LineLayer
				id='elevator'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				filter={isCrossing}
				style={styles.crossingPress}
			/>
		</React.Fragment>
	);
}

export default LayerElevators;
