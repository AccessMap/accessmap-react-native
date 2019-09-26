import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const OverlayButton = props => {
		return (
			<TouchableHighlight style={{alignItems: 'stretch'}}
				onPress={props.onPress}>
				<Text style={{fontSize: 15, padding: 20, color: 'black'}}>{props.text}</Text>
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
				<Text>accessmap</Text>
				<Text style={{fontSize: 13, padding: 20}}>More info</Text>
				<OverlayButton text='About'
					onPress={() => this.setState({showAbout: true})}
				/>
				<OverlayButton text='Contact'
					onPress={() => this.setState({showContact: true})}
				/>
				<Text style={{fontSize: 13, padding: 20}}>Tracking settings</Text>
				<Overlay
					isVisible={this.state.showAbout}
					windowBackgroundColor='rgba(0, 0, 0, 0.5)'
					width='auto'
					height='auto'
					onBackdropPress={() => this.setState({ showAbout: false })}
					overlayStyle={{margin: 20, padding: 20}}
				>
					<View style={{width: '100%'}}>
						<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>About</Text>

						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Button
								icon={
									<Icon
										name='github'
										size={25}
										color='black'
									/>
								}
								type='clear'
								containerStyle={{flex: 2}}
							/>
							<Text style={{flex: 5, flexWrap: 'wrap'}}>AccessMap is an open source project.</Text>
						</View>

						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Button
								icon={
									<Icon
										name='graduation-cap'
										size={25}
										color='black'
									/>
								}
								type='clear'
								containerStyle={{flex: 2}}
							/>
							<Text style={{flex: 5, flexWrap: 'wrap'}}>AccessMap is developed via the Taskar Center at the University of Washington.</Text>
						</View>

						<Text>AccessMap has received support from many organizations.</Text>
						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Button
								icon={
									<Icon
										name='heart'
										size={25}
										color='red'
									/>
								}
								type='clear'
								containerStyle={{flex: 2}}
							/>
							<Text style={{flex: 5, flexWrap: 'wrap'}}>Contribute to AccessMap development by donating to the Taskar Center. Mention AccessMap in the comment.</Text>
						</View>
						<Button
							title='CLOSE'
							type='clear'
							onPress={() => this.setState({showAbout: false})}
						/>

					</View>
				</Overlay>

				<Overlay
					isVisible={this.state.showContact}
					windowBackgroundColor='rgba(0, 0, 0, 0.5)'
					width='auto'
					height='auto'
					onBackdropPress={() => this.setState({ showContact: false })}
					overlayStyle={{margin: 20, padding: 20}}
				>
					<View style={{width: '100%'}}>
						<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Contact</Text>

						<View style={{flexDirection: 'row', alignItems: 'center', width: '100%'}}>
							<Button
								icon={
									<Icon
										name='twitter'
										size={25}
										color='black'
									/>
								}
								type='clear'
								containerStyle={{flex: 2}}
							/>
							<Text style={{flex: 5}}>Follow us on social media.</Text>
						</View>

						<View style={{flexDirection: 'row', alignItems: 'center'}}>
							<Button
								icon={
									<Icon
										name='envelope'
										size={25}
										color='black'
									/>
								}
								type='clear'
								containerStyle={{flex: 2}}
							/>
							<Text style={{flex: 5, flexWrap: 'wrap'}}>Email us if you encounter issues or want to help out</Text>
						</View>

						<Button
							title='CLOSE'
							type='clear'
							onPress={() => this.setState({showContact: false})}
						/>

					</View>
				</Overlay>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	overlay: {
		backgroundColor: 'white',
		width: '100%',
		height: '100%',
	},
});

export default LinkOverlay;
