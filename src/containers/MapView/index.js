import React, {Component} from 'react';
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
		/* default */ 0.75,
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
				animationDuration: 1000,
			});
		}
	}

	featureCollection() {
		const { pinLocation, origin, destination } = this.props;
		const features = [];
		if (pinLocation) {
			features.push({
				type: 'Feature',
				id: 'map-pin',
				properties: {
					icon: 'pin',
				},
				geometry: {
					type: 'Point',
					coordinates: pinLocation,
				},
			});
		}
		if (origin) {
			features.push({
				type: 'Feature',
				id: 'origin',
				properties: {
					icon: 'origin',
				},
				geometry: {
					type: 'Point',
					coordinates: origin,
				},
			});
		}
		if (destination) {
			features.push({
				type: 'Feature',
				id: 'destination',
				properties: {
					icon: 'destination',
				},
				geometry: {
					type: 'Point',
					coordinates: destination,
				},
			});
		}
		return {type: 'FeatureCollection', features};
	}

	_onPress = async e => {
		const center = e.geometry.coordinates;
		this.props.goToLocation({center});

		const {screenPointX, screenPointY} = e.properties;
		const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
				[screenPointX, screenPointY], null, ['sidewalk-press', 'crossing-press']);
		if (featureCollection.features.length) {
			console.log(featureCollection);
		}
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
				onPress={this._onPress}
			>
				<MapboxGL.Camera
					ref={component => this.camera = component}
					animationDuration={200}
					defaultSettings={{ centerCoordinate, zoomLevel }}
				/>

				<MapboxGL.Images images={{
					pin: pinIcon,
					origin: originIcon,
					destination: destinationIcon,
				}}/>
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
		origin: state.origin,
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
