import React from 'react';
import { Switch, Text, View } from 'react-native';
import { toggleBarriers } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Buttons, Colors, Fonts } from '../../styles';
import { greyLight, primaryLight } from '../../styles/colors';

export default function BarrierSwitch(props) {
	const { t, i18n } = useTranslation();
	let avoidRaisedCurbs = useSelector((state: RootState) => state.avoidRaisedCurbs);
	const dispatch = useDispatch();
	return (
		<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
			<Text style={[{marginLeft: 5, flex: 1}, Fonts.p]}>{t("AVOID_BARRIERS_TEXT")}</Text>
			<Switch
				style={Buttons.switches}
				trackColor={{ false: greyLight, true: primaryLight }}
				thumbColor={Colors.primaryColor}
				onValueChange={() => dispatch(toggleBarriers())}
				value={avoidRaisedCurbs}
			/>
		</View>
	);
};