import React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

const ContactOverlay = props => {
	const { t, i18n } = useTranslation();

	return (
		<View style={{width: "100%"}}>
			<Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>{t("CONTACT_TEXT")}</Text>
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
				/>
				<Text style={{flex: 5}}>{t("TWITTER_TEXT")}</Text>
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
				/>
				<Text style={{flex: 5, flexWrap: "wrap"}}>{t("EMAIL_TEXT")}</Text>
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
