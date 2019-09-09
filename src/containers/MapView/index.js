import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

import LayerSidewalks from './layer-sidewalks';
import LayerCrossings from './layer-crossings';
import LayerRoute from './layer-route';
import styles from '../../styles';

accessToken = 'pk.eyJ1IjoieWVocmljIiwiYSI6ImNqeWl6eG14YTAzOHgzbXBmMGE2eHM0amUifQ.QuULT47s_LKOyGcCYF6iIw';
MapboxGL.setAccessToken(accessToken);

class MapView extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		MapboxGL.setTelemetryEnabled(false);
	}

	async componentDidUpdate(prevProps) {
		if (this.props.zoomLevel !== prevProps.zoomLevel) {
			const currZoom = await this._map.getZoom();
			if (this.props.zoomLevel > prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom + 1, 200);
			} else if (this.props.zoomLevel < prevProps.zoomLevel) {
				this.camera.zoomTo(currZoom - 1, 200);
			}
		}
		if (this.props.pinLocation !== prevProps.pinLocation) {
			this.camera.setCamera({
				centerCoordinate: this.props.pinLocation,
				zoomLevel: 20,
				animationDuration: 1000,
			});
		}
	}

	render() {
		const {
			onUpdateRegion,
			zoomLevel,
			centerCoordinate,
			pinLocation,
		} = this.props;
		return (
			<MapboxGL.MapView 
				ref={component => this._map = component}
				style={styles.map}
			>
				<MapboxGL.Camera
					ref={component => this.camera = component}
					animationDuration={200}
					defaultSettings={{
						centerCoordinate: this.props.centerCoordinate,
						zoomLevel: this.props.zoomLevel,
					}}
				/>
				{pinLocation != null &&
					<MapboxGL.PointAnnotation
						id='location'
						coordinate={pinLocation}
					/>
				}
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

export default connect(mapStateToProps, null)(MapView);
