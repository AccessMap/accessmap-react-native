import React, { Component } from 'react';
import { View, Image, NativeModules, StyleSheet, Switch, Text, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AboutOverlay from './about-overlay';
import ContactOverlay from './contact-overlay';

const { Rakam } = NativeModules;

const OverlayButton = props => {
		return (
			<TouchableHighlight style={{alignItems: "stretch"}}
				onPress={props.onPress}>
				<Text style={{fontSize: 15, padding: 20, color: "black"}}>{props.text}</Text>
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
			<View style={styles.overlay}>
				<View style={{flexDirection: "row", margin: 20, height: 50, alignItems: "center"}}>
					<Image
						style={{flex: 1, width: "70%", marginRight: 40}}
						source={require("../../../assets/accessmap-logo.png")}
						resizeMode="center"
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

				<Text style={{fontSize: 13, padding: 20}}>More info</Text>
				<OverlayButton text="About" onPress={() => this.setState({showAbout: true})}/>
				<OverlayButton text="Contact" onPress={() => this.setState({showContact: true})}/>

				<View style={{flexDirection: "row", margin: 20, alignItems: "center"}}>
					<Text style={{fontSize: 13, marginRight: 40}}>Tracking settings</Text>
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

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: "white",
		width: "100%",
		height: "100%",
	},
});

export default LinkOverlay;
