import React, {Component} from 'react';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { connect } from 'react-redux';

import LayerSidewalks from './layer-sidewalks';
import LayerCrossings from './layer-crossings';
import LayerAnnotations from './layer-annotations';
import LayerRoute from './layer-route';
import styles from '../../styles';
import { placePin, fetchRoute } from '../../actions';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
	ACCESS_TOKEN } from '../../constants';

MapboxGL.setAccessToken(ACCESS_TOKEN);

class MapView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('mounted');
		MapboxGL.setTelemetryEnabled(false);
	}

	async componentDidUpdate(prevProps) {
		const {
			zoomLevel,
			geocodeCoords,
			origin,
			destination,
			uphill,
			downhill,
			avoidCurbs,
			fetchRoute
		} = this.props;

		if (zoomLevel !== prevProps.zoomLevel) {
			const currZoom = await this._map.getZoom();
			if (zoomLevel > prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom + 1, 200);
			} else if (zoomLevel < prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom - 1, 200);
			}
		}
		if (geocodeCoords !== prevProps.geocodeCoords) {
			this.camera.setCamera({
				centerCoordinate: geocodeCoords,
				animationDuration: 1000,
			});
		}
		if (origin && destination && (
				origin != prevProps.origin ||
				destination != prevProps.destination ||
				uphill != prevProps.uphill ||
				downhill != prevProps.downhill ||
				avoidCurbs != prevProps.avoidCurbs
		)) {
			fetchRoute(origin, destination, uphill, downhill, avoidCurbs);
		}
	}

	_onPress = async e => {
		const center = e.geometry.coordinates;
		const {screenPointX, screenPointY} = e.properties;
		const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
				[screenPointX, screenPointY], null, ['sidewalk-press', 'crossing-press']);

		this.props.placePin({...featureCollection, center});
	}

	render() {
		const {
			zoomLevel,
			centerCoordinate,
			route,
		} = this.props;

		return (
			<MapboxGL.MapView 
				ref={component => this._map = component}
				style={styles.map}
				onPress={this._onPress}
				onDidFinishLoadingStyle={() => console.log('map loaded')}
			>
				<MapboxGL.Camera
					ref={component => this.camera = component}
					animationDuration={200}
					defaultSettings={{ centerCoordinate, zoomLevel }}
				/>

				<LayerAnnotations />

				<MapboxGL.VectorSource
					id='pedestrian'
					url='https://www.accessmap.io/tiles/tilejson/pedestrian.json'
				>
					<LayerSidewalks />
					<LayerCrossings />
				</MapboxGL.VectorSource>

				{route && route.code == 'Ok' && <LayerRoute />}

			</MapboxGL.MapView>
		);
	}
}

const getPreferences = (mode, state) => {
	switch(mode) {
		case MOBILITY_MODE_WHEELCHAIR:
			return [8, 10, 1];
		case MOBILITY_MODE_POWERED:
			return [12, 12, 1];
		case MOBILITY_MODE_CANE:
			return [14, 14, 0];
		default:
			return [state.customUphill, state.customDownhill, state.avoidRaisedCurbs];
	}
}

const mapStateToProps = state => {
	var preferences = getPreferences(state.mobilityMode, state);

	return {
		centerCoordinate: state.centerCoordinate,
		zoomLevel: state.zoomLevel,
		geocodeCoords: state.geocodeCoords,
		origin: state.origin,
		destination: state.destination,
		uphill: preferences[0] / 100,
		downhill: preferences[1] / 100,
		avoidCurbs: preferences[2],
		route: state.route,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		placePin: item => {
			dispatch(placePin(item));
		},
		fetchRoute: (origin, destination, uphill, downhill, avoidCurbs) => {
			dispatch(fetchRoute(origin, destination, uphill, downhill, avoidCurbs));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
