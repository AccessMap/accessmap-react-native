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
import {
	GEOCODER_PLACEHOLDER_TEXT_DEFAULT,
	GEOCODER_PLACEHOLDER_TEXT_START,
	GEOCODER_PLACEHOLDER_TEXT_END,
	UPHILL_TEXT,
	DOWNHILL_TEXT,
	BARRIERS_TEXT,
} from '../../utils/translations';

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
			accessibilityLabel={props.accessibilityLabel}
		/>);
};

const GeocodeBar = props => {
	return (
		<View style={{flex: 1}}>
			<TouchableWithoutFeedback
				accessibilityLabel="Enter address"
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
						rightIconContainerStyle={{ width: 0, height: 0}}
						editable={false}
					/>
				</View>
			</TouchableWithoutFeedback>
		</View>
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
		const customButtons = [UPHILL_TEXT, DOWNHILL_TEXT, BARRIERS_TEXT];
		const { pinFeatures, origin, destination, cancelRoute } = this.props;

		return (
			<Card
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
							placeholder={GEOCODER_PLACEHOLDER_TEXT_START}
						/>
						<IconButton
							name="close"
							accessibilityLabel="Select to exit route finding"
							onPress={() => {
								cancelRoute();
								this.setState({findDirections: false});
							}}
						/>
					</View>
					:
					<View style={{flex: 1, flexDirection: "row", alignItems: "center" }}>
						<IconButton name="menu"
							accessibilityLabel="Select to open drawer menu"
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
							placeholder={GEOCODER_PLACEHOLDER_TEXT_DEFAULT}
						/>
						<IconButton
							name="directions"
							accessibilityLabel="Select to look up routes"
							onPress={() => this.setState({findDirections: true})}
						/>
					</View> :
					<View  style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
						<GeocodeBar navigation={this.props.navigation}
							value={destination ? coordinatesToString(destination) : ""}
							type="destination"
							placeholder={GEOCODER_PLACEHOLDER_TEXT_END}
						/>
						<IconButton
							accessibilityLabel="Select to reverse route."
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
									accessibilityLabel="Select to modify custom mobility preferences"
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
