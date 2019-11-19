import React, {Component} from 'react';
import { Drawer } from 'native-base';
import {StyleSheet, View, Text, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import { connect } from 'react-redux';

import { closeDrawer } from '../actions';
import styles from '../styles';

import MapView from '../containers/MapView';
import Zooms from '../containers/MapButtons/Zooms';
import OmniCard from '../containers/OmniCard';
import LinkOverlay from '../containers/LinkOverlay';
import FeatureCard from '../containers/FeatureCard';
import RouteBottomCard from '../containers/RouteBottomCard';

class MapPage extends Component {
	static navigationOptions = {title: "Map", header: null};

	componentDidUpdate(prevProps) {
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
	}
	render() {
		return (
			<Drawer ref={ref => {this.drawer = ref;}}
				content={<LinkOverlay closeDrawer={() => this.closeDrawer()} />}
				onClose={() => this.closeDrawer()}>
			<View style={styles.page}>
				<View style={styles.container}>
					<MapView />
					<OmniCard navigation={this.props.navigation} />
					<Zooms />
					{this.props.pinFeatures && <FeatureCard />}
					{this.props.route && <RouteBottomCard />}
				</View>
			</View>
			</Drawer>
		);
	}
}

const mapStateToProps = state => {
	return {
		openDrawer: state.openDrawer,
		pinFeatures: state.pinFeatures,
		route: state.route,
	};
}
const mapDispatchToProps = dispatch => {
	return { closeDrawer: () => { dispatch(closeDrawer()) } };
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
