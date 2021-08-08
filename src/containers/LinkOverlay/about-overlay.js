import React from 'react';
import { Linking, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Buttons, Position, Views } from '../../styles';
import { useTranslation } from 'react-i18next';

const AboutOverlay = props => {
	const githubURL = "https://github.com/AccessMap/accessmap-react-native";
	const taskarURL = "https://tcat.cs.washington.edu";
	const donateURL = "https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR";
	const escienceURL = "https://escience.washington.edu/";
	const wsdotURL = "https://wsdot.wa.gov/";
	
	const { t, i18n } = useTranslation();

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
			<Text style={Fonts.h2}>{t("ABOUT_TEXT")}</Text>
			<View style={Views.overlayIconandText}>
				<Button
					icon={
						<Icon
							accessibilityLabel={t("GITHUB_LOGO_ALT_TEXT")}
							name="github"
							size={30}
							color="black"
						/>
					}
					containerStyle={{flex: 2}}
					type="clear"
					onPress={() => {
						openLink(githubURL);
					}}
				/>
				<TouchableOpacity style={Views.overlayText} onPress={() => {openLink(githubURL)}}>
					<Text style={Fonts.p}>{t("GITHUB_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<View style={Views.overlayIconandText}>
				<Button
					icon={
						<Icon
							name="graduation-cap"
							accessibilityLabel={t("TCAT_LINK_ALT_TEXT")}
							size={30}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
					onPress={() => {
						openLink(taskarURL);
					}}
				/>
				<TouchableOpacity style={Views.overlayText} onPress={() => {openLink(taskarURL)}}>
					<Text style={Fonts.p}>{t("UW_TEXT")}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={Views.overlayIconandText}>
				<TouchableOpacity onPress={() => {openLink(escienceURL)}} style={Buttons.iconButtons}>
					<Image
						accessibilityLabel={t("ESCIENCE_ALT_TEXT")}
						style={{flex: 1, width: "70%", height: "50%"}}
						source={require("../../../res/images/uwescience.jpg")}
						resizeMode="contain"
						resizeMethod="scale"
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {openLink(wsdotURL)}} style={Buttons.iconButtons}>
					<Image
						accessibilityLabel={t("WSDOT_ALT_TEXT")}
						style={{flex: 1, width: "70%", height: "50%"}}
						source={require("../../../res/images/wsdot.png")}
						resizeMode="contain"
						resizeMethod="scale"
					/>
				</TouchableOpacity>
				<Text style={[Fonts.p, Views.overlayText]}>{t("ORGANIZATIONS_TEXT")}</Text>
			</View>

			<View style={Views.overlayIconandText}>
				<Button
					icon={
						<Icon
							name="heart"
							accessibilityLabel={t("DONATE_ALT_TEXT")}
							size={30}
							color="red"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
					onPress={() => {
						openLink(donateURL);
					}}
				/>
				<TouchableOpacity style={Views.overlayText} onPress={() => {openLink(donateURL)}}>
					<Text style={Fonts.p}>{t("DONATE_TEXT")}</Text>
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

export default AboutOverlay;
