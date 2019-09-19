import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Card, Button, ButtonGroup, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Geocoder from '../Geocoder';
import UphillSlider from '../Settings/UphillSlider';
import DownhillSlider from '../Settings/DownhillSlider';
import BarrierSwitch from '../Settings/BarrierSwitch';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../../constants';

import { connect } from 'react-redux';
import { setMobilityMode, openDrawer } from '../../actions';

const IconButton = props => {
	return (
		<Button
			buttonStyle={{...styles.iconButton, ...props.style}}
			icon={<Icon
				name={props.name}
				size={20}
				color={props.label == null ? '#555555' : '#EEEEEE' }
			/>}
			title={props.label}
			titleStyle={{marginLeft: 3, fontSize: 15}}
			onPress={props.onPress}
		/>);
};

const ModeButtonRender = props => {
	const _onPress = () => {
		props.setMobilityMode(props.mode);
	}
	const selected = props.mode == props.mobilityMode;
	return (
		<IconButton
			style={selected ? {backgroundColor: '#0000AA'} : null }
			label={selected ? props.label : null}
			name={props.name}
			onPress={_onPress}
		/>
	);
}

const mapStateToProps = state => {
	return {
		mobilityMode: state.mobilityMode,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setMobilityMode: mode => {
			dispatch(setMobilityMode(mode));
		},
		openDrawer: () => {
			dispatch(openDrawer());
		}
	};
}

const ModeButton = connect(mapStateToProps, mapDispatchToProps)(ModeButtonRender);

class OmniCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			customMode: false,
			customIndex: 0,
		};
	}

	updateCustomIndex = customIndex => {
		this.setState({ customIndex });
	}
	
	toggleCustomMode = () => {
		this.setState({ customMode: !this.state.customMode });
	}

	render() {
		const customButtons = ['UPHILL', 'DOWNHILL', 'BARRIERS'];

		return (
			<Card containerStyle={styles.omniCardStyle}>
				{!this.state.customMode ? <View>
					<View style={{flex: 1, flexDirection: 'row',}}>
						<IconButton name='bars'
							onPress={this.props.openDrawer}
						/>
						<Text>accessmap</Text>
					</View>
					<TouchableWithoutFeedback
						onPress={() => this.props.navigation.push('Search')}
					>
						<View pointerEvents='box-only'>
							<SearchBar
								placeholder='Enter address'
								lightTheme={true}
								containerStyle={{backgroundColor: '#EEEEEE', padding: 0}}
								inputContainerStyle={{backgroundColor: '#DDDDDD'}}
								inputStyle={{margin: 0, padding: 0, fontSize: 14,}}
								editable={false}
							/>
						</View>
					</TouchableWithoutFeedback>
					<View style={{flex: 1, flexDirection: 'row', right: 0, left: 0, justifyContent: 'space-between'}}>
						<View style={{flexDirection: 'row'}}>
							<ModeButton name='user-circle'
								label='Custom'
								mode={MOBILITY_MODE_CUSTOM}
							/>
							<ModeButton name='accessible-icon'
								label='Wheelchair'
								mode={MOBILITY_MODE_WHEELCHAIR}
							/>
							<ModeButton name='plug'
								label='Powered'
								mode={MOBILITY_MODE_POWERED}
							/>
							<ModeButton name='candy-cane'
								label='Cane'
								mode={MOBILITY_MODE_CANE}
							/>
						</View>

						{this.props.mobilityMode == MOBILITY_MODE_CUSTOM  &&
							<View>
								<IconButton name='pen'
									onPress={this.toggleCustomMode}
								/>
							</View>
						}
					</View>
				</View> : <View>
					<View style={{flexDirection: 'row', right: 0, left: 0, justifyContent: 'space-between'}}>
						<ButtonGroup
							onPress={this.updateCustomIndex}
							selectedIndex={this.state.customIndex}
							buttons={customButtons}
							containerStyle={{flex: 1}}
						/>
						<IconButton name='times'
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

export default connect(mapStateToProps, mapDispatchToProps)(OmniCard);

const styles = StyleSheet.create({
	omniCardStyle: {
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		flex: 1,
		flexDirection: 'column', 
		left: 0,
		right: 0,
		maxWidth: 400,
		top: 0,
		margin: 10,
		padding: 5,
		zIndex: 10,
	},
	iconButton: {
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		marginTop: 5,
		marginRight: 5,
		height: 40,
	}
});
