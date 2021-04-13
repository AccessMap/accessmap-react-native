import React, { useCallback } from 'react';
import { Linking, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

const AboutOverlay = props => {
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
						openLink("https://github.com/AccessMap/accessmap-react-native");
					}}
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>{t("GITHUB_TEXT")}</Text>
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
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>{t("UW_TEXT")}</Text>
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
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>{t("DONATE_TEXT")}</Text>
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
