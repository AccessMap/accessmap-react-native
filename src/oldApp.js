import React, {Component} from 'react';
import { Drawer } from 'native-base';
import {StyleSheet, View, Text, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import { connect } from 'react-redux';

import { closeDrawer } from './actions';
import styles from './styles';

import MapView from './containers/MapView';
import Zooms from './containers/MapButtons/Zooms';
import OmniCard from './containers/OmniCard';
import LinkOverlay from './containers/LinkOverlay';
import MapPage from './navigation/MapPage';

class App extends Component {
	/*componentDidUpdate(prevProps) {
		if (!prevProps.openDrawer && this.props.openDrawer) {
			this.openDrawer();
		}
	}
	

	closeDrawer() {
		this.drawer._root.close();
		this.props.closeDrawer();
	}
	openDrawer() {
		this.drawer._root.open();
	}*/
	render() {
		console.log('rendering');
		return (
			<MapPage />
		);
		/*return (
			<Drawer ref={ref => {this.drawer = ref;}}
				content={<LinkOverlay />}
				onClose={() => this.closeDrawer()}
			>
				<View style={styles.page}>
					<View style={styles.container}>
						<MapView />
						<OmniCard />
						<Zooms />
					</View>
				</View>
			</Drawer>
		);*/
	}
}

const mapStateToProps = state => {
	return { openDrawer: state.openDrawer };
}
const mapDispatchToProps = dispatch => {
	return { closeDrawer: () => { dispatch(closeDrawer()) } };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
