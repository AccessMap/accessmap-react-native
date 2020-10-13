import React, {Component} from 'react';
import { NativeModules } from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

import { connect } from 'react-redux';

import LayerSidewalks from './layer-sidewalks';
import LayerCrossings from './layer-crossings';
import LayerElevators from './layer-elevator-paths';
import LayerAnnotations from './layer-annotations';
import LayerRoute from './layer-route';
import LoadingScreen from '../../components/LoadingScreen';
import styles from '../../styles';
import {
	goToLocation,
	placePin,
	fetchRoute,
	mapLoaded } from '../../actions';

const { Rakam } = NativeModules;

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
		this.state = {
			userLoc: null,
		};
	}

	componentDidMount() {
		console.log("mounted");
		MapboxGL.setTelemetryEnabled(false);
	}

	async zoomPress(zoom, prevZoom) {
		const currZoom = await this._map.getZoom();
		if (zoom > prevZoom) {
			this.camera.zoomTo(currZoom + 1, 200);
			Rakam.trackEvent("ZOOM_IN", ["newZoom", "" + (currZoom + 1)]);
		} else if (zoom < prevZoom) {
			this.camera.zoomTo(currZoom - 1, 200);
			Rakam.trackEvent("ZOOM_OUT", ["newZoom", "" + (currZoom - 1)]);
		}
	}

	async userLocationPress() {
		const { placePin } = this.props;
		const userLoc = this.state.userLoc.coords;
		const center = [userLoc.longitude, userLoc.latitude];
		//goToLocation({...featureCollection, center});
		await this.camera.setCamera({
			centerCoordinate: center,
			animationDuration: 1000,
		});

		const pointInView = await this._map.getPointInView(center);
		const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
			pointInView, null,
			["sidewalk-press", "crossing-press", "elevator-press"]);
		placePin({...featureCollection, center});
	}

	async componentDidUpdate(prevProps) {
		const {
			zoomLevel,
			geocodeCoords,
			route,
			origin,
			destination,
			uphill,
			downhill,
			avoidCurbs,
			locateUser,
			fetchRoute,
			goToLocation,
			placePin
		} = this.props;

		if (zoomLevel !== prevProps.zoomLevel) {
			this.zoomPress(zoomLevel, prevProps.zoomLevel);
		}

		if (geocodeCoords !== prevProps.geocodeCoords) {
			this.camera.setCamera({
				centerCoordinate: geocodeCoords,
				animationDuration: 1000,
			});
		}

		if (locateUser !== prevProps.locateUser && this.state.userLoc != null) {
			this.userLocationPress();
		}

		if (route && route.code == "Ok" && route != prevProps.route) {
		  var [maxLon, maxLat, minLon, minLat] = [-180, -90, 180, 90];
			var path = route.routes[0].geometry.coordinates;
			let distance = 0;
			for (var i = 0; i < path.length; i++) {
				if (path[i][0] > maxLon) {
					maxLon = path[i][0];
				}
				if (path[i][0] < minLon) {
					minLon = path[i][0];
				}
				if (path[i][1] > maxLat) {
					maxLat = path[i][1];
				}
				if (path[i][1] < minLat) {
					minLat = path[i][1];
				}
			}
			var northEast = [maxLon, maxLat];
			var southWest = [minLon, minLat];
			if (this.props.viewingDirections) {
				this.camera.fitBounds(northEast, southWest, 20, 100);
			} else {
				this.camera.fitBounds(northEast, southWest, 100, 100);
			}
		}

		if (origin != prevProps.origin ||
				destination != prevProps.destination ||
				uphill != prevProps.uphill ||
				downhill != prevProps.downhill ||
				avoidCurbs != prevProps.avoidCurbs
		) {
			fetchRoute(origin, destination, uphill, downhill, avoidCurbs);
		}
	}

	_onPress = async e => {
		const center = e.geometry.coordinates;
		const {screenPointX, screenPointY} = e.properties;
		const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
				[screenPointX, screenPointY], null, ["sidewalk-press", "crossing-press", "elevator-press"]);

		this.props.placePin({...featureCollection, center});
	}

	_panMap = async e => {
		const center = e.geometry.coordinates;
		Rakam.trackEvent("MOVE_MAP", ["lat", `${center[0]}`, "lon", `${center[1]}`]);
	}

	onUserLocationUpdate = (location) => {
		// const timestamp = location.timestamp;
		// const latitude = location.coords.latitude;
		// const longitude = location.coords.longitude;
		// const altitude = location.coords.altitude;
		// const heading = location.coords.heading;
		// const accuracy = location.coords.accuracy;
		// const speed = location.coords.speed;
		this.setState({
			userLoc: location
		});
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
				onLongPress={this._onPress}
				onRegionDidChange={this._panMap}
				onDidFinishLoadingStyle={() => {
					console.log("map loaded");
					this.props.mapLoaded();
				}}
			>
				<MapboxGL.UserLocation
					visible={true}
					onUpdate={this.onUserLocationUpdate}
				/>
				<MapboxGL.Camera
					ref={component => this.camera = component}
					animationDuration={200}
					defaultSettings={{ centerCoordinate, zoomLevel }}
				/>

				<LayerAnnotations />

				<MapboxGL.VectorSource
					id="pedestrian"
					url="https://www.accessmap.io/tiles/tilejson/pedestrian.json"
				>
					<LayerSidewalks />
					<LayerCrossings />
					<LayerElevators />
				</MapboxGL.VectorSource>

				{route && route.code == "Ok" && <LayerRoute />}

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
		viewingDirections: state.viewingDirections,
		locateUser: state.locateUserSwitch
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToLocation: features => {
			dispatch(goToLocation(features));
		},
		mapLoaded: () => {
			dispatch(mapLoaded());
		},
		placePin: item => {
			dispatch(placePin(item));
		},
		fetchRoute: (origin, destination, uphill, downhill, avoidCurbs) => {
			dispatch(fetchRoute(origin, destination, uphill, downhill, avoidCurbs));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
