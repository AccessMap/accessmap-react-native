import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import { Button, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from  'react-redux';

import { zoomIn, zoomOut } from '../../actions';
import styles from '../../styles.js';

class Zooms extends Component {
	render() {
		return (
			<View style={styles.zooms}>
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
		onZoomInPressed: () => {
			dispatch(zoomIn());
		},
		onZoomOutPressed: () => {
			dispatch(zoomOut());
		}
	}
}

export default connect(null, mapDispatchToProps)(Zooms);
