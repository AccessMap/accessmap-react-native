import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AboutOverlay from './about-overlay';
import ContactOverlay from './contact-overlay';

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
		}
	}
	
	render() {
		return (
			<View style={styles.overlay}>
				<View style={{flexDirection: "row", alignItems: "center"}}>
					<Text style={{flex: 1}}>accessmap</Text>
					<Button
						buttonStyle={{backgroundColor: "#FFFFFF", margin: 5}}
						icon={<Icon
							name="times"
							size={20}
							color="#555555"
						/>}
						onPress={this.props.closeDrawer}
					/>
				</View>
				<Text style={{fontSize: 13, padding: 20}}>More info</Text>
				<OverlayButton text="About"
					onPress={() => this.setState({showAbout: true})}
				/>
				<OverlayButton text="Contact"
					onPress={() => this.setState({showContact: true})}
				/>
				<Text style={{fontSize: 13, padding: 20}}>Tracking settings</Text>
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
