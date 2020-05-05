import React, { Component } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import styles from './map-styles';
import { connect } from 'react-redux';

import getInclineLimit from '../../utils/get-incline-limit';
import {
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../../constants';

const LayerPaths = props => {
	var incline = getInclineLimit(props.customUphill, props.customDownhill, props.mobilityMode);
	const [maxUphill, maxDownhill] = incline;
	const avoidCurbs = props.avoidCurbs;
	const prefs = {
		maxUphill: maxUphill,
		maxDownhill: maxDownhill,
		avoidCurbs: avoidCurbs
	};

	return (
		<React.Fragment>
			{false && <MapboxGL.LineLayer
				id="press"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={81}
				style={styles.press}
			/>}
			<MapboxGL.LineLayer
				id="path"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
				style={styles.paths(prefs)}
			/>
			{false && <MapboxGL.LineLayer
				id="outline"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
			/>}
			{false && <MapboxGL.LineLayer
				id="inaccessible"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
			/>}
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		avoidCurbs: state.avoidRaisedCurbs,
		mobilityMode: state.mobilityMode,
		customUphill: state.customUphill,
		customDownhill: state.customDownhill,
	};
}

export default connect(mapStateToProps, null)(LayerPaths);
