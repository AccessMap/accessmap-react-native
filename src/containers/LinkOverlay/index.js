import React, { Component } from 'react';
import { View, Image, NativeModules, StyleSheet, Switch, Text, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Views, Position } from '../../styles';

import AboutOverlay from './about-overlay';
import ContactOverlay from './contact-overlay';

const { Rakam } = NativeModules;

const OverlayButton = props => {
		return (
			<TouchableHighlight style={{alignItems: "stretch"}}
				onPress={props.onPress}>
				<Text style={Fonts.menuItems}>{props.text}</Text>
			</TouchableHighlight>
		);
	}

class LinkOverlay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showAbout: false,
			showContact: false,
			trackSettings: false
		}
	}
	
	render() {
		return (
			<View style={Views.overlay}>
				<View style={{marginTop: 20, flexDirection: "row", height: 50, alignContent: "space-between"}}>
					<Image
						style={[Position.fullWidthandHeight, {marginRight: 20, flex: 1}, ]}
						source={require("../../../assets/accessmap-logo.png")}
						resizeMode="contain"
						resizeMethod="scale"
					/>
					<Button
						buttonStyle={{flex: 1, backgroundColor: "#FFFFFF"}}
						icon={<Icon
							name="times"
							size={20}
							color="#555555"
						/>}
						onPress={this.props.closeDrawer}
					/>
				</View>

				<Text style={Fonts.menuItems}>More info</Text>
				<OverlayButton text="About" onPress={() => this.setState({showAbout: true})}/>
				<OverlayButton text="Contact" onPress={() => this.setState({showContact: true})}/>

				<View style={[{flexDirection: "row", alignItems: "center", marginTop: 30}]}>
					<Text style={[{marginRight: 40}]}>Tracking settings</Text>
					<Switch
						onValueChange={() => {
							Rakam.toggleTracking();
							this.setState({ trackSettings: !this.state.trackSettings });
						}}
						value={this.state.trackSettings}
					/>
				</View>

				<Overlay
					isVisible={this.state.showAbout}
					windowBackgroundColor="rgba(0, 0, 0, 0.5)"
					width="auto"
					height="auto"
					onBackdropPress={() => this.setState({ showAbout: false })}
					overlayStyle={{margin: 20, padding: 20}}
				>
					<AboutOverlay onClose={() => this.setState({showAbout: false})} />
				</Overlay>

				<Overlay
					isVisible={this.state.showContact}
					windowBackgroundColor="rgba(0, 0, 0, 0.5)"
					width="auto"
					height="auto"
					onBackdropPress={() => this.setState({ showContact: false })}
					overlayStyle={{margin: 20, padding: 20}}
				>
					<ContactOverlay onClose={() => this.setState({showContact: false})} />
				</Overlay>

			</View>
		);
	}
}

export default LinkOverlay;
