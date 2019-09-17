import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { connect } from 'react-redux';

import LayerSidewalks from './layer-sidewalks';
import LayerCrossings from './layer-crossings';
import LayerRoute from './layer-route';
import styles from '../../styles';
import { goToLocation } from '../../actions';

import pinIcon from '../../../assets/map-pin.png';
import originIcon from '../../../assets/origin.png';
import destinationIcon from '../../../assets/destination.png';

accessToken = 'pk.eyJ1IjoieWVocmljIiwiYSI6ImNqeWl6eG14YTAzOHgzbXBmMGE2eHM0amUifQ.QuULT47s_LKOyGcCYF6iIw';
MapboxGL.setAccessToken(accessToken);

const iconStyle = {
	iconImage: ['get', 'icon'],

	iconSize: [
		'match',
		['get', 'icon'],
		'pin',
		0.75,
		'airport-icon',
		1.2,
		/* default */ 1,
	],
};

const featureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			id: 'focus',
			properties: {
				icon: 'pin',
			},
			geometry: {
				type: 'Point',
				coordinates: [-122.3321, 47.6062],
			},
		},
		{
			type: 'Feature',
			id: 'origin',
			properties: {
				icon: 'pin',
			},
			geometry: {
				type: 'Point',
				coordinates: [-122.33, 47.60],
			},
		},
		{
			type: 'Feature',
			id: 'destination',
			properties: {
				icon: 'pin',
			},
			geometry: {
				type: 'Point',
				coordinates: [-122.335, 47.60],
			},
		},
	],
};

class MapView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		MapboxGL.setTelemetryEnabled(false);
	}

	async componentDidUpdate(prevProps) {
		const { zoomLevel, pinLocation } = this.props;
		if (zoomLevel !== prevProps.zoomLevel) {
			const currZoom = await this._map.getZoom();
			if (zoomLevel > prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom + 1, 200);
			} else if (zoomLevel < prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom - 1, 200);
			}
		}
		if (pinLocation !== prevProps.pinLocation) {
			this.camera.setCamera({
				centerCoordinate: pinLocation,
				//zoomLevel: 20,
				animationDuration: 1000,
			});
		}
	}

	featureCollection() {
		const features = [];
		if (this.props.pinLocation != null) {
			features.push({
				type: 'Feature',
				id: 'map-pin',
				properties: {
					icon: 'pin',
				},
				geometry: {
					type: 'Point',
					coordinates: this.props.pinLocation,
				},
			});
		}
		return {type: 'FeatureCollection', features};
	}

	render() {
		const {
			goToLocation,
			zoomLevel,
			centerCoordinate,
		} = this.props;
		return (
			<MapboxGL.MapView 
				ref={component => this._map = component}
				style={styles.map}
				onPress={(e) => {
					const center = e.geometry.coordinates;
					goToLocation({center});
				}}
			>
				<MapboxGL.Camera
					ref={component => this.camera = component}
					animationDuration={200}
					defaultSettings={{ centerCoordinate, zoomLevel }}
				/>

				<MapboxGL.Images images={{pin: pinIcon}}/>
				<MapboxGL.ShapeSource
					id='annotations'
					shape={this.featureCollection()}
				>
					<MapboxGL.SymbolLayer id='location' style={iconStyle} />
				</MapboxGL.ShapeSource>

				<LayerSidewalks />
				<LayerCrossings />
			</MapboxGL.MapView>
		);
	}
}

const mapStateToProps = state => {
	return {
		centerCoordinate: state.centerCoordinate,
		zoomLevel: state.zoomLevel,
		pinLocation: state.pinLocation,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToLocation: item => {
			dispatch(goToLocation(item));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
