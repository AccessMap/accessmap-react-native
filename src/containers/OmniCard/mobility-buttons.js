import React from 'react';
import { AccessibilityInfo, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '../../components/Icon';
import { useTranslation } from 'react-i18next';
import { Colors, Buttons } from '../../styles';

import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../../constants';

import { setMobilityMode } from '../../actions';
import { connect } from 'react-redux';

const MobilityButtonRender = props => {
	const _onPress = () => {
		AccessibilityInfo.announceForAccessibility("Currently in " + props.label + " mobility mode");
		props.setMobilityMode(props.mode);
	}
	const selected = props.mode == props.mobilityMode;
	const buttonColor = selected ? Colors.primaryColor : "#FFFFFF";
	const iconColor = selected ? "white" : Colors.grey;

	return (
		<Button
			accessibilityLabel={"Mobility Mode: " + props.label}
			buttonStyle={[Buttons.button, {backgroundColor: buttonColor}]}
			icon={<Icon
				name={props.name}
				size={32}
				color={iconColor}
			/>}
			title={selected ? props.label : null}
			titleStyle={{marginLeft: 3, fontSize: 15, color: iconColor}}
			onPress={_onPress}
		/>
	);
}

const mapStateToProps = state => {
	return {
		mobilityMode: state.mobilityMode,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setMobilityMode: mode => {
			dispatch(setMobilityMode(mode));
		},
	};
};

const MobilityButton = connect(mapStateToProps, mapDispatchToProps)(MobilityButtonRender);

const MobilityButtonGroup = props => {
	const { t, i18n } = useTranslation();

	return (
		<View style={{flexDirection: "row"}}>
			<MobilityButton
				name="person-pin"
				label={t("CUSTOM_MODE_TEXT")}
				mode={MOBILITY_MODE_CUSTOM}
			/>
			<MobilityButton
				name="wheelchair"
				label={t("WHEELCHAIR_MODE_TEXT")}
				mode={MOBILITY_MODE_WHEELCHAIR}
			/>
			<MobilityButton
				name="wheelchair-powered"
				label={t("POWERED_MODE_TEXT")}
				mode={MOBILITY_MODE_POWERED}
			/>
			<MobilityButton
				name="cane-user"
				label={t("CANE_MODE_TEXT")}
				mode={MOBILITY_MODE_CANE}
			/>
		</View>
	);
}

export default MobilityButtonGroup;