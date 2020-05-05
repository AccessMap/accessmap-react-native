import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Button, ButtonGroup, SearchBar } from 'react-native-elements';
import Icon from '../../components/Icon';

import Geocoder from '../Geocoder';
import UphillSlider from '../Settings/UphillSlider';
import DownhillSlider from '../Settings/DownhillSlider';
import BarrierSwitch from '../Settings/BarrierSwitch';
import coordinatesToString from '../../utils/coordinates-to-string';

import {
	MOBILITY_MODE_CUSTOM,
} from '../../constants';

import { connect } from 'react-redux';
import {
	openDrawer,
	reverseRoute,
	cancelRoute,
	closeDirections,
	closeTripInfo
} from '../../actions';

import MobilityButtonGroup from './mobility-buttons';
import RegionSwitcher from './region-switcher';

const IconButton = props => {
	return (
		<Button
			buttonStyle={{...styles.iconButton, ...props.style}}
			containerStyle={props.label ? null : {width : 45}}
			icon={<Icon
				name={props.name}
				size={25}
				color={props.label ? "#EEEEEE" : "#555555" }
			/>}
			title={props.label}
			titleStyle={{marginLeft: 3, fontSize: 15}}
			onPress={props.onPress}
		/>);
};

const GeocodeBar = props => {
	return (
		<View style={{flex: 1}}><TouchableWithoutFeedback
			onPress={() => props.navigation.push("Search", {type: props.type})}
		>
			<View pointerEvents="box-only">
				<SearchBar
					placeholder={props.placeholder}
					value={props.value}
					lightTheme={true}
					containerStyle={{backgroundColor: "#EEEEEE", padding: 0}}
					inputContainerStyle={{backgroundColor: "#DDDDDD"}}
					inputStyle={{color: "black", margin: 0, padding: 0, fontSize: 14,}}
					editable={false}
				/>
			</View>
		</TouchableWithoutFeedback></View>
	);
}

class OmniCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customMode: false,
			customIndex: 0,
			findDirections: false,
		};
	}

	updateCustomIndex = customIndex => {
		this.setState({ customIndex });
	}
	
	toggleCustomMode = () => {
		this.setState({ customMode: !this.state.customMode });
	}

	render() {
		const customButtons = ["UPHILL", "DOWNHILL", "BARRIERS"];
		const { pinFeatures, origin, destination, cancelRoute } = this.props;

		return (
			<Card
				accessible={true}
				accessibilityState={{selected: true}}
				importantForAccessibility="yes"
				ref={component => this.omniCard = component}
				containerStyle={styles.omniCardStyle}
			>
				{!this.state.customMode ? <View>

					{(origin || destination || this.state.findDirections) ?
					<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
						<GeocodeBar
							navigation={this.props.navigation}
							type="origin"
							value={origin ? coordinatesToString(origin) : ""}
							placeholder="Enter start address"
						/>
						<IconButton
							name="close"
							onPress={() => {
								cancelRoute();
								this.setState({findDirections: false});
							}}
						/>
					</View>
					:
					<View style={{flex: 1, flexDirection: "row", alignItems: "center" }}>
						<IconButton name="menu"
							onPress={this.props.openDrawer}
						/>
						<Image
							style={{width: "30%", height: "40%"}}
							source={require("../../../assets/accessmap-logo.png")}
							resizeMode="cover"
							resizeMethod="resize"
						/>
						<View style={{flex: 1}}/>
						<RegionSwitcher />
					</View>}

					{(!origin && !destination && !this.state.findDirections) ?
					<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
						<GeocodeBar navigation={this.props.navigation}
							value={pinFeatures && pinFeatures.text ?
									pinFeatures.text : ""}
							type="search"
							placeholder="Enter address"
						/>
						<IconButton
							name="directions"
							onPress={() => this.setState({findDirections: true})}
						/>
					</View> :
					<View  style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
						<GeocodeBar navigation={this.props.navigation}
							value={destination ? coordinatesToString(destination) : ""}
							type="destination"
							placeholder="Enter end address"
						/>
						<IconButton
							name="swap-vert"
							onPress={() => {
								this.props.reverseRoute();
							}}
						/>
					</View>}


					<View style={{flex: 1, flexDirection: "row", right: 0, left: 0, justifyContent: "space-between"}}>
						<MobilityButtonGroup />

						{this.props.mobilityMode == MOBILITY_MODE_CUSTOM  &&
							<View>
								<IconButton name="pencil"
									onPress={this.toggleCustomMode}
								/>
							</View>
						}
					</View>
				</View> : <View>
					<View style={{flexDirection: "row", right: 0, left: 0, justifyContent: "space-between"}}>
						<ButtonGroup
							onPress={this.updateCustomIndex}
							selectedIndex={this.state.customIndex}
							buttons={customButtons}
							containerStyle={{flex: 1}}
						/>
						<IconButton name="close"
							onPress={this.toggleCustomMode}
						/>
					</View>

					{this.state.customIndex == 0 ?
					<UphillSlider /> :
					this.state.customIndex == 1 ?
					<DownhillSlider /> :
					<BarrierSwitch />}
				</View>}
			</Card>
		);
	}
}

const mapStateToProps = state => {
	return {
		mobilityMode: state.mobilityMode,
		pinFeatures: state.pinFeatures,
		origin: state.origin,
		destination: state.destination,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		openDrawer: () => {
			dispatch(openDrawer());
		},
		reverseRoute: () => {
			dispatch(reverseRoute());
		},
		cancelRoute: () => {
			dispatch(cancelRoute());
			dispatch(closeDirections());
			dispatch(closeTripInfo());
		},
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(OmniCard);

const styles = StyleSheet.create({
	omniCardStyle: {
		backgroundColor: "#FFFFFF",
		position: "absolute",
		flex: 1,
		flexDirection: "column", 
		left: 0,
		right: 0,
		maxWidth: 400,
		top: 0,
		margin: 10,
		padding: 5,
		zIndex: 10,
	},
	iconButton: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		marginTop: 5,
		marginRight: 5,
		height: 40,
	}
});
