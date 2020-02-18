import React, {Component} from 'react';
import { Drawer } from 'native-base';
import {StyleSheet, View, Text, TouchableHighlight, FlatList, Dimensions} from 'react-native';
import { connect } from 'react-redux';

import { closeDrawer, closeDirections, closeTripInfo } from '../actions';
import styles from '../styles';

import MapView from '../containers/MapView';
import LoadingScreen from '../components/LoadingScreen';
import Zooms from '../containers/MapButtons/Zooms';
import OmniCard from '../containers/OmniCard';
import LinkOverlay from '../containers/LinkOverlay';
import FeatureCard from '../containers/FeatureCard';
import RouteBottomCard from '../containers/RouteBottomCard';

import Directions from '../components/Directions';
import TripInfo from '../components/TripInfo';

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
		//console.log(this.props.route);
		return (
			<Drawer ref={ref => {this.drawer = ref;}}
				content={<LinkOverlay closeDrawer={() => this.closeDrawer()} />}
				onClose={() => this.closeDrawer()}>
			<View accessible={false} style={styles.page}>
				<View accessible={false} style={styles.container}>
					<View style={{flex: 1}}>
						<MapView />
						{!this.props.viewingDirections && <OmniCard accessible={true} navigation={this.props.navigation} />}
						<Zooms accessible={true} />
					</View>
					{this.props.isLoading && <LoadingScreen />}
					{this.props.pinFeatures && <FeatureCard />}
					{this.props.route && <RouteBottomCard />}
					{this.props.viewingDirections && <Directions
						route={this.props.route}
						close={() => this.props.closeDirections()}
					/>}
					{this.props.viewingTripInfo && <TripInfo
						route={this.props.route}
						close={() => this.props.closeTripInfo()}
					/>}
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
		viewingDirections: state.viewingDirections,
		viewingTripInfo: state.viewingTripInfo,
		isLoading: state.isLoading,
	};
}
const mapDispatchToProps = dispatch => {
	return {
		closeDrawer: () => { dispatch(closeDrawer()) },
		closeDirections: () => { dispatch(closeDirections()) },
		closeTripInfo: () => { dispatch(closeTripInfo()) },
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
