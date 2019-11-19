import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import styles from './map-styles';

const LayerElevators = props => {
	const elevatorPathFilter = ["all",
					["==", ["get", "subclass"], "footway"],
					["==", ["get", "elevator"], 1]];

	return (
		<React.Fragment>
			<MapboxGL.LineLayer
				id="elevator-press"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={81}
				filter={elevatorPathFilter}
				style={styles.elevatorPress}
			/>
			<MapboxGL.LineLayer
				id="elevator-paths"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
				filter={elevatorPathFilter}
				style={styles.elevatorPath}
			/>
		</React.Fragment>
	);
}

export default LayerElevators;
