import React from 'react';
import { AccessibilityInfo, Switch, Text, View } from 'react-native';
import { toggleBarriers } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Buttons, Colors, Fonts } from '../../styles';
import { greyLight, primaryLight } from '../../styles/colors';
import { MOBILITY_MODE_CANE, MOBILITY_MODE_CUSTOM } from '../../constants';
import { RootState } from '../../reducers';

export default function BarrierSwitch(props) {
	const { t, i18n } = useTranslation();

	let avoidRaisedCurbs = useSelector((state: RootState) => state.mobility.avoidRaisedCurbs);
	let mobilityMode = useSelector((state: RootState) => state.mobility.mobilityMode);
	const dispatch = useDispatch();
	var raisedCurbStatus = true;
	
	if (mobilityMode == MOBILITY_MODE_CANE) {
		raisedCurbStatus = false;
	} else if (mobilityMode == MOBILITY_MODE_CUSTOM) {
		raisedCurbStatus = avoidRaisedCurbs;
	}
	return (
		<View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
			<Text style={[{flex: 1}, Fonts.p]}>{t("AVOID_BARRIERS_TEXT")}</Text>
			<Switch
				style={Buttons.switches}
				trackColor={{ false: greyLight, true: mobilityMode == MOBILITY_MODE_CUSTOM ? primaryLight : Colors.grey}}
				thumbColor={mobilityMode == MOBILITY_MODE_CUSTOM ? Colors.primaryColor : Colors.grey}
				onValueChange={() => {
					if (avoidRaisedCurbs) {
						AccessibilityInfo.announceForAccessibility("Currently not avoiding raised curbs.")
					} else {
						AccessibilityInfo.announceForAccessibility("Currently avoiding raised curbs.")
					}
					dispatch(toggleBarriers())
				}}
				value={raisedCurbStatus}
				disabled={mobilityMode != MOBILITY_MODE_CUSTOM}
			/>
		</View>
	);
};