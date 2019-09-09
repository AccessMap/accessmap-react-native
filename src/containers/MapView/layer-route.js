import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { connect } from 'react-redux';

import styles from './map-styles';

const LayerRoute = props => {

	return (
		<MapboxGL.VectorSource
			id='pedestrian'
			url='https://www.accessmap.io/api/v1/routing/directions/wheelchair.json?lon1=-122.33574902838916&lat1=47.60498653712875&lon2=-122.33418993711038&lat2=47.604306969876035&uphill=0.2&downhill=0.1&avoidCurbs=1&timestamp=1562868827948'
		>
			<MapboxGL.LineLayer
				id='route'
				sourceID='pedestrian'
				sourceLayerID='transportation'
				layerIndex={80}
				style={styles.crossing}
			/>
		</MapboxGL.VectorSource>
	);
}

export default connect(null, null)(LayerRoute);
