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
				message: "Can AccessMap track you current location?",
				buttonNegative: "No",
				buttonPostive: "Yes"
			}
		);
		if (granted) {
			console.log("You can use ACCESS_FINE_LOCATION");
			this.props.locateUser();
		}
	}

	render() {
		return (
			<View accessible={true} style={styles.zooms}>
				<Button
					buttonStyle={styles.button}
					icon={<Icon
						name="crosshairs-gps"
						size={20}
						color="blue"
					/>}
					onPress={this.locateUserPressed}
				/>
				<Button
					buttonStyle={styles.button}
					icon={<Icon
						name="plus"
						size={20}
						color="blue"
					/>}
					onPress={this.props.onZoomInPressed}
				/>
				<Button
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
			dispatch(locateUser());
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
