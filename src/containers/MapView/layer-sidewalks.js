import React, { Component } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import styles from './map-styles';
import { connect }  from 'react-redux';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../../constants';

const LayerSidewalks = props => {
	var incline = [100 * props.customUphill, -100 * props.customDownhill];
	switch (props.mobilityMode) {
		case MOBILITY_MODE_WHEELCHAIR:
			incline = [8, -10];
			break;
		case MOBILITY_MODE_POWERED:
			incline = [12, -12];
			break;
		case MOBILITY_MODE_CANE:
			incline = [14, -14];
			break;
	}
	var [maxUphill, maxDownhill] = incline;

	const isSidewalkExpression = ['==', ['get', 'footway'], 'sidewalk'];

	const accessibleExpression = ['all',
		['<', ['*', 100, ['get', 'incline']], maxUphill],
		['>', ['*', 100, ['get', 'incline']], maxDownhill]];

	const isAccessibleSidewalk = ['all', isSidewalkExpression, accessibleExpression];
 
	
	return (
		<MapboxGL.VectorSource
			id='pedestrian'
			url='https://www.accessmap.io/tiles/tilejson/pedestrian.json'
		>
			<MapboxGL.LineLayer
				id='sidewalk'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				filter={isAccessibleSidewalk}
				layerIndex={80}
				style={styles.sidewalks(maxUphill, maxDownhill)}
			/>
			<MapboxGL.LineLayer
				id='sidewalk-outline'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				filter={isAccessibleSidewalk}
				layerIndex={80}
				style={styles.sidewalkOutlines}
			/>
			<MapboxGL.LineLayer
				id='sidewalk-inaccessible'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				filter={['!', accessibleExpression]}
				layerIndex={80}
				style={styles.inaccessible}
			/>
		</MapboxGL.VectorSource>
	);
}

const mapStateToProps = state => {
	return {
		mobilityMode: state.mobilityMode,
		customUphill: state.customUphill,
		customDownhill: state.customDownhill,
	};
}

export default connect(mapStateToProps, null)(LayerSidewalks);
