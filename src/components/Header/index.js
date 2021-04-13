import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';

const Header = props => {
	// Props:
	// 1) title
	// 2) close function
	const { t, i18n } = useTranslation();

	return (
		<View style={{flexDirection: "row", alignItems: "center", margin: 5}}>
			<Text style={{flex: 1, fontSize: 20, fontWeight: "bold"}}>
				{props.title}
			</Text>
			{props.cs && <Button
				accessibilityLabel={t("Header-crowdsourcingInfo-accessibilityLabel")}
				buttonStyle={{backgroundColor: "#FFFFFF", borderRadius: 20, marginRight: 5, height: 40}}
				icon={<Icon
					name="information"
					size={20}
					color="#0000AA"
				/>}
				onPress={() => {
					props.navigation.push("Crowdsourcing", {info: props.info});
				}}
			/>}
			<Button
				accessibilityLabel={t("Header-close-accessibilityLabel")}
				buttonStyle={{backgroundColor: "#FFFFFF", borderRadius: 20, marginRight: 5, height: 40}}
				icon={<Icon
					name="close"
					size={20}
					color="#555555"
				/>}
				onPress={props.close}
			/>
		</View>
	);
}

export default Header;
