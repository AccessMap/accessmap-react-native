import React, {Component} from 'react';
import { PermissionsAndroid, StyleSheet, View } from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import Icon from '../../components/Icon';
import { connect } from  'react-redux';

import { locateUser, zoomIn, zoomOut } from '../../actions';
import styles from '../../styles.js';

class Zooms extends Component {
	locateUserPressed = async e => {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			{
				title: "User Location",
				message: "Can AccessMap track your current location?",
				buttonNegative: "No",
				buttonPositive: "Yes"
			}
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			this.props.locateUser(true);
		}
	}

	render() {
		return (
			<View accessible={true} style={styles.zooms}>
				<Button
					accessibilityLabel="Find my location"
					buttonStyle={styles.button}
					icon={<Icon
						name="crosshairs-gps"
						size={20}
						color="blue"
					/>}
					onPress={this.locateUserPressed}
				/>
				<Button
					accessibilityLabel="Select to zoom in"
					buttonStyle={styles.button}
					icon={<Icon
						name="plus"
						size={20}
						color="blue"
					/>}
					onPress={this.props.onZoomInPressed}
				/>
				<Button
					accessibilityLabel="Select to zoom out"
					buttonStyle={styles.button}
					icon={<Icon
						name="minus"
						size={20}
						color="blue"
					/>}
					onPress={this.props.onZoomOutPressed}
				/>
			</View>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		locateUser: () => {
			dispatch(locateUser(true));
		},
		onZoomInPressed: () => {
			dispatch(zoomIn());
		},
		onZoomOutPressed: () => {
			dispatch(zoomOut());
		}
	}
}

export default connect(null, mapDispatchToProps)(Zooms);
