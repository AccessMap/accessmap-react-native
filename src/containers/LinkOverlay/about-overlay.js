import React from 'react';
import { Linking, Text, View, TouchableOpacity, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fonts, Buttons } from '../../styles';
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
			<View style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
				<Button
					icon={
						<Icon
							accessibilityLabel={t("GITHUB_LOGO_ALT_TEXT")}
							name="github"
							size={30}
							color="black"
						/>
					}
					type="clear"
					containerStyle={{flex: 2}}
					onPress={() => {
						openLink(githubURL);
					}}
				/>
				<TouchableOpacity onPress={() => {openLink(githubURL)}} style={{flex: 5, flexWrap: "wrap"}}>
					<Text style={Fonts.p}>{t("GITHUB_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<View style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
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
				<TouchableOpacity onPress={() => {openLink(taskarURL)}} style={{flex: 5, flexWrap: "wrap"}}>
					<Text style={Fonts.p}>{t("UW_TEXT")}</Text>
				</TouchableOpacity>
			</View>
			
			<View style={{flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 10}}>
				<TouchableOpacity onPress={() => {openLink(escienceURL)}} style={Buttons.iconButtons}>
					<Image
						accessibilityLabel={t("ESCIENCE_ALT_TEXT")}
						style={{flex: 1, width: "70%", height: "50%"}}
						source={require("../../../assets/uwescience.jpg")}
						resizeMode="contain"
						resizeMethod="scale"
					/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {openLink(wsdotURL)}} style={Buttons.iconButtons}>
					<Image
						accessibilityLabel={t("WSDOT_ALT_TEXT")}
						style={{flex: 1, width: "70%", height: "50%"}}
						source={require("../../../assets/wsdot.png")}
						resizeMode="contain"
						resizeMethod="scale"
					/>
				</TouchableOpacity>
				<Text style={[Fonts.p, {flex: 4, flexWrap: "wrap"}]}>{t("ORGANIZATIONS_TEXT")}</Text>
			</View>

			<View style={{flexDirection: "row", alignItems: "center", marginVertical: 10}}>
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
				<TouchableOpacity onPress={() => {openLink(donateURL)}} style={{flex: 5, flexWrap: "wrap"}}>
					<Text style={Fonts.p}>{t("DONATE_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<Button
				title="CLOSE"
				type="clear"
				onPress={props.onClose}
			/>
		</View>
	);
}

export default AboutOverlay;
