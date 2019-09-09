import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

import styles from './map-styles';

const LayerCrossings = props => {
	const avoidCurbs = true;

	const isCrossing = ['==', ['get', 'footway'], 'crossing'];

	const inaccessibleExpression = [
		'all',
		isCrossing,
		avoidCurbs,
		['!', ['to-boolean', ['get', 'curbramps']]],
	];

	const markedExpression = [
		'all',
		isCrossing,
		['!', inaccessibleExpression],
		['==', ['get', 'crossing'], 'marked']
	];

	return (
		<MapboxGL.VectorSource
			id='pedestrian'
			url='https://www.accessmap.io/tiles/tilejson/pedestrian.json'
		>
			<MapboxGL.LineLayer
				id='crossings'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				filter={isCrossing}
				style={styles.crossing}
			/>
			<MapboxGL.LineLayer
				id='crossings-outline'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={81}
				filter={isCrossing}
				style={styles.crossingOutline}
			/>
		</MapboxGL.VectorSource>
	);
}

export default connect(null, null)(LayerCrossings);
