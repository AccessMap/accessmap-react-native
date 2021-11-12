import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { metersToFeet }  from "../../utils/metric-imperial-conversion";
import { Card } from 'react-native-elements';
import { Fonts } from '../../styles';
import { Text } from "react-native";

const DirectionCard = (props) => {
	// Props:
	// a) footing
	// b) name of segment
	// c) distance
	// d) index (numbered step of direction)
	const { t, i18n } = useTranslation();
	const action = props.footway == "sidewalk" ? t("USE_SIDEWALK_TEXT") : t("USE_CROSSING_TEXT");
	return (
		<Card accessible={true}>
			<Text style={Fonts.h2}>{action}</Text>
			<Text style={Fonts.p}>{props.name}</Text>
			<Text style={Fonts.p}>
				{ props.usingMetricSystem ? Math.round(props.distance) : metersToFeet(props.distance)} 
				{" "}
				{ props.usingMetricSystem ? t("METERS_TEXT") : t("FEET_TEXT") }
			</Text>
		</Card>
	);
}

function mapStateToProps(state) {
	const props = { usingMetricSystem: state.setting.usingMetricSystem };
	return props;
}

export default connect(mapStateToProps)(DirectionCard);