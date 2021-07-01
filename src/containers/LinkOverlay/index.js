import React, { Component } from 'react';
import { View, Image, NativeModules, Switch, Text, TouchableHighlight, AccessibilityInfo } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Views, Position } from '../../styles';
import { withTranslation } from 'react-i18next';

import AboutOverlay from './about-overlay';
import ContactOverlay from './contact-overlay';

const { Rakam } = NativeModules;

const OverlayButton = props => {
		return (
			<TouchableHighlight 
				style={{alignItems: "stretch"}}
				disabled={false}
				onPress={ props.onPress }>
				<Text accessibilityRole="button" style={Fonts.menuItems}>{props.text}</Text>
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
				<View style={{marginVertical: 20, flexDirection: "row", height: 50, alignContent: "space-between"}}>
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
							accessibilityLabel={this.props.t("Header-close-accessibilityLabel")}
						/>}
						onPress={() => {
								this.props.closeDrawer;
								// AccessibilityInfo.announceForAccessibility("");
							}
						}
					/>
				</View>

				<OverlayButton text={this.props.t("ABOUT_TEXT")} onPress={() => this.setState({showAbout: true})}/>
				<OverlayButton text={this.props.t("CONTACT_TEXT")} onPress={() => this.setState({showContact: true})}/>

				<View style={[{flexDirection: "row", alignItems: "center", marginTop: 30}]}>
					<Text style={[{marginRight: 40}]}>{this.props.t("TRACKING_SETTINGS_TEXT")}</Text>
					<Switch
						accessibilityLabel={this.props.t("TRACKING_SETTINGS_TEXT")}
						onValueChange={() => {
							// AccessibilityInfo.announceForAccessibility(""); // is only for iOS
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

export default withTranslation()(LinkOverlay);
