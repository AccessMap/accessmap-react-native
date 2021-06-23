import React from 'react';
import { Linking, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

const AboutOverlay = props => {
	const githubURL = "https://github.com/AccessMap/accessmap-react-native";
	const taskarURL = "https://tcat.cs.washington.edu";
	const donateURL = "https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR";
	
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
			<Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>{t("ABOUT_TEXT")}</Text>

			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="github"
							size={25}
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
					<Text>{t("GITHUB_TEXT")}</Text>
				</TouchableOpacity>
			</View>
				<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="graduation-cap"
							size={25}
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
					<Text>{t("UW_TEXT")}</Text>
				</TouchableOpacity>
			</View>

			<Text>{t("ORGANIZATIONS_TEXT")}</Text>

			<View style={{flexDirection: "row", alignItems: "center"}}>
				<Button
					icon={
						<Icon
							name="heart"
							size={25}
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
					<Text>{t("DONATE_TEXT")}</Text>
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
