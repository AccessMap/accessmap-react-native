import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

import { connect } from 'react-redux';
import pinIcon from '../../../assets/map-pin.png';
import originIcon from '../../../assets/origin.png';
import destinationIcon from '../../../assets/destination.png';

const iconStyle = {
	iconImage: ["get", "icon"],

	iconSize: [
		"match",
		["get", "icon"],
		"pin",
		0.75,
		/* default */ 0.75,
	],
};

const LayerAnnotations = props => {
	const { pinFeatures, origin, destination } = props;

	const featureCollection = () => {
		const features = [];
		if (pinFeatures) {
			features.push({
				type: "Feature",
				id: "map-pin",
				properties: {
					icon: "pin",
				},
				geometry: {
					type: "Point",
					coordinates: pinFeatures.center,
				},
			});
		}
		if (origin) {
			features.push({
				type: "Feature",
				id: "origin",
				properties: {
					icon: "origin",
				},
				geometry: {
					type: "Point",
					coordinates: origin,
				},
			});
		}
		if (destination) {
			features.push({
				type: "Feature",
				id: "destination",
				properties: {
					icon: "destination",
				},
				geometry: {
					type: "Point",
					coordinates: destination,
				},
			});
		}
		return {type: "FeatureCollection", features};
	}

	return (
		<React.Fragment>
			<MapboxGL.Images images={{
				pin: pinIcon,
				origin: originIcon,
				destination: destinationIcon,
			}}/>
			<MapboxGL.ShapeSource
				id="annotations"
				shape={featureCollection()}
			>
				<MapboxGL.SymbolLayer id="location" style={iconStyle} />
			</MapboxGL.ShapeSource>
		</React.Fragment>
	);
}

const mapStateToProps = state => {
	return {
		pinFeatures: state.pinFeatures,
		origin: state.origin,
		destination: state.destination,
	};
}

export default connect(mapStateToProps)(LayerAnnotations);
