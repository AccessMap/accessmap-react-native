// Headers include a title text and an "X" button to close the window.
import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from '../Icon';
import { Fonts } from '../../styles';
import { useTranslation } from 'react-i18next';

const Header = props => {
	// Props:
	// 1) title
	// 2) close function
	const { t, i18n } = useTranslation();

	return (
		<View style={{flexDirection: "row", alignItems: "center", margin: 5}}>
			<Text style={ Fonts.h1 }>
				{props.title}
			</Text>
			<Button
				accessibilityLabel={t("Header-close-accessibilityLabel")}
				buttonStyle={{backgroundColor: "#FFFFFF", borderRadius: 20, marginHorizontal: 5, height: 50}}
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
