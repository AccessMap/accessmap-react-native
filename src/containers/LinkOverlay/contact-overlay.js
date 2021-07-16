import React from 'react';
import { Linking, Text, View, TouchableOpacity, AccessibilityInfo, Touchable } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Views } from '../../styles';
import { useTranslation } from 'react-i18next';

const ContactOverlay = props => {
	const twitterURL = "https://twitter.com/accessmapsea";
	const mailURL = "mailto:accessmap.info@gmail.com";

	const openLink = async (url) => {
		const supported = await Linking.canOpenURL(url);
		if (supported) {
			await Linking.openURL(url);
		} else {
			console.log("cannot open url");
		}
	};
	const { t, i18n } = useTranslation();

	return (
		<View style={{width: "100%"}}>
			<Text style={Fonts.h2}>{t("CONTACT_TEXT")}</Text>
				<View style={Views.overlayIconandText}>
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
						openLink(twitterURL);
					}}
				/>
				<TouchableOpacity style={Views.overlayText} onPress={() => {openLink(twitterURL)}} >
					<Text style={Fonts.p}>{t("TWITTER_TEXT")}</Text>
				</TouchableOpacity>
			</View>
				<View style={Views.overlayIconandText}>
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
						openLink(mailURL);
					}}
				/>
				<TouchableOpacity style={Views.overlayText} onPress={() => {openLink(mailURL)}}>
					<Text style={Fonts.p}>{t("EMAIL_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<Button
				title={t("CLOSE_TEXT")}
				type="clear"
				onPress={props.onClose}
			/>

		</View>
	);
}

export default ContactOverlay;
