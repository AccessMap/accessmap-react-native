import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';
import styles from './map-styles';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_CANE,
} from '../../constants';

const LayerCrossings = props => {
	var avoidCurbs = props.avoidRaisedCurbs;
	switch (props.mobilityMode) {
		case MOBILITY_MODE_CUSTOM:
			break;
		case MOBILITY_MODE_CANE:
			avoidCurbs = false;
			break;
		default:
			avoidCurbs = true;
			break;
	}

	const isCrossing = ["==", ["get", "footway"], "crossing"];

	const inaccessibleExpression = [
		"all",
		isCrossing,
		avoidCurbs,
		["!", ["to-boolean", ["get", "curbramps"]]],
	];

	const markedExpression = [
		"all",
		isCrossing,
		["!", inaccessibleExpression],
		["==", ["get", "crossing"], "marked"]
	];

	const unmarkedExpression = [
		"all",
		isCrossing,
		["!", inaccessibleExpression],
		["any", ["==", ["get", "crossing"], "unmarked"], ["!", ["has", "crossing"]]]
	];

	return (
		<React.Fragment>
			<MapboxGL.LineLayer
				id="crossing-press"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={81}
				filter={isCrossing}
				style={styles.crossingPress}
			/>
			<MapboxGL.LineLayer
				id="crossing-marked"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
				filter={markedExpression}
				style={{...styles.crossing, ...styles.fadeOut}}
				minZoomLevel={13}
			/>
			<MapboxGL.LineLayer
				id="crossing-marked-outline"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={81}
				filter={markedExpression}
				style={{...styles.crossingOutline, ...styles.fadeOut}}
				minZoomLevel={13}
			/>
			<MapboxGL.LineLayer
				id="crossing-unmarked"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
				filter={unmarkedExpression}
				style={{...styles.crossingUnmarked, ...styles.fadeOut}}
				minZoomLevel={13}
			/>
			<MapboxGL.LineLayer
				id="crossing-inaccessible"
				sourceID="pedestrian"
				sourceLayerID="transportation"
				layerIndex={80}
				filter={inaccessibleExpression}
				style={{...styles.inaccessible, ...styles.fadeOut}}
				minZoomLevel={13}
			/>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		avoidRaisedCurbs: state.avoidRaisedCurbs,
		mobilityMode: state.mobilityMode,
	};
}

export default connect(mapStateToProps)(LayerCrossings);
