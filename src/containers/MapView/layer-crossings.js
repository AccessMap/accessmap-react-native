import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

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

	const unmarkedExpression = [
		'all',
		isCrossing,
		['!', inaccessibleExpression],
		['any', ['==', ['get', 'crossing'], 'unmarked'], ['!', ['has', 'crossing']]]
	];

	return (
		<MapboxGL.VectorSource
			id='pedestrian'
			url='https://www.accessmap.io/tiles/tilejson/pedestrian.json'
		>
			<MapboxGL.LineLayer
				id='crossing-marked'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				filter={markedExpression}
				style={styles.crossing}
			/>
			<MapboxGL.LineLayer
				id='crossing-marked-outline'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={81}
				filter={markedExpression}
				style={styles.crossingOutline}
			/>
			<MapboxGL.LineLayer
				id='crossing-unmarked'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				filter={unmarkedExpression}
				style={styles.crossingUnmarked}
			/>
			<MapboxGL.LineLayer
				id='crossing-inaccessible'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				filter={inaccessibleExpression}
				style={styles.inaccessible}
			/>
		</MapboxGL.VectorSource>
	);
}

export default LayerCrossings;
