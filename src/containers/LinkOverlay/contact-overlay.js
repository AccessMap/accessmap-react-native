import React from 'react';
import { Linking, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContactOverlay = props => {
	const openLink = async (url) => {
		const supported = await Linking.canOpenURL(url);

		if (supported) {
			await Linking.openURL(url);
		} else {
			console.log("cannot open url");
		}
	};

	return (
		<View style={{width: "100%"}}>
			<Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>Contact</Text>
				<View style={{flexDirection: "row", alignItems: "center", width: "100%"}}>
				<Button
					icon={
						<Icon
							name="twitter"
							size={25}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
					onPress={() => {
						openLink("https://twitter.com/accessmapsea");
					}}
				/>
				<Text style={{flex: 5}}>Follow us on social media.</Text>
			</View>
				<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="envelope"
							size={25}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
					onPress={() => {
						openLink("mailto:accessmap.info@gmail.com");
					}}
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>Email us if you encounter issues or want to help out</Text>
			</View>

			<Button
				title="CLOSE"
				type="clear"
				onPress={props.onClose}
			/>

		</View>
	);
}

export default ContactOverlay;
