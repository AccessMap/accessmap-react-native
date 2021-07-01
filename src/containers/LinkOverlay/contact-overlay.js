import React from 'react';
import { Linking, Text, View, TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts } from '../../styles';
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
						openLink(twitterURL);
					}}
				/>
				<TouchableOpacity onPress={() => {openLink(twitterURL)}} style={{flex: 5, flexWrap: "wrap"}}>
					<Text style={[{flex: 5}, Fonts.p]}>{t("TWITTER_TEXT")}</Text>
				</TouchableOpacity>
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
						openLink(mailURL);
					}}
				/>
				<TouchableOpacity onPress={() => {openLink(mailURL)}} style={{flex: 5, flexWrap: "wrap"}}>
					<Text style={[{flex: 5, flexWrap: "wrap"}], Fonts.p}>{t("EMAIL_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<Button
				title={t("Header-close-accessibilityLabel")}
				type="clear"
				onPress={() => {
					props.onClose;
					// AccessibilityInfo.announceForAccessibility("");
				}}
			/>

		</View>
	);
}

export default ContactOverlay;
