// Card details that show on the bottom of the screen when clicking on a sidewalk
// or coordinate. Includes the option to "Route from/to here".
import React from 'react';
import { View, Text, AccessibilityInfo } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';

import Header from '../../components/Header';
import { placePin, setOrigin, setDestination } from '../../actions';
import coordinatesToString from '../../utils/coordinates-to-string';
import parseOpenHours from '../../utils/parse-open-hours';


const InfoText = props => {
	return (
		<View accessible={true} style={{color: "black", height: 40, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
			<Text style={{flex: 2, fontSize: 16, flexWrap: "wrap"}}>
				{props.label}
			</Text>
			<Text style={{flex: 3, fontSize: 16, flexWrap: "wrap"}}>
				{props.info}
			</Text>
		</View>
	);
}

const OpenHours = props => {
	const { hours, day } = props;
	const color = hours.open ? "green" : "red";
	return (
		<Text style={{flex: 1, fontSize: 12, color: hours.today == day ? color : null}}>
			{day}: {hours[day]}
		</Text>
);
}

const FeatureCard = props => {
	const { t, i18n } = useTranslation();
	const info = (props.features.features && props.features.features[0]) ?
					props.features.features[0].properties : null;
	var openHours;
	if (info && info.opening_hours) {
		openHours = parseOpenHours(info.opening_hours);
	}

	return (
		<Card
			containerStyle={{bottom: 0, left: 0, right: 0, maxWidth: 400, margin: 10, position: "absolute", zIndex: 50}}
		>
			<View style={{maxWidth: "100%"}}>
				<Header
					title={props.features.text ? props.features.text :
						info ? info.footway == "sidewalk" ? t('SIDEWALK_TEXT') :
							info.footway == "crossing" ? t('CROSSING_TEXT') :
								coordinatesToString(props.features.center) :
							coordinatesToString(props.features.center)
						}
					close={() => props.placePin(null)}
					cs={info &&
						(info.footway == "sidewalk" || info.footway == "crossing")}
					navigation={props.navigation}
					info={info}
				/>
			</View>
			{info && <Button
				accessibilityLabel={t("Header-crowdsourcingInfo-accessibilityLabel")}
				buttonStyle={{flex: 1, padding: 10}}
				titleStyle={{fontSize: 15}}
				title="Report Issue"
				type="clear"
				onPress={()  => {
					props.navigation.push("Crowdsourcing", { info });
				}}
			/>}
			{info && <View>
				<InfoText label={t('DESCRIPTION_TEXT')} info={info.description} />
				{info.footway == "sidewalk" ? 
					<InfoText
						label={t('INCLINE_TEXT')}
						info={Math.abs(Math.round(info.incline * 1000) / 10) + "%"}
					/> : info.footway == "crossing" ?
					<InfoText
						label={t('CURBRAMPS_TEXT')}
						info={info.curbramps ? t('YES_TEXT') : t('NO_TEXT')}
					/> :

					<View style={{height: 120, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
						<Text style={{flex: 2, fontSize: 16, flexWrap: "wrap"}}>
							{t('OPEN_HOURS_TEXT')}
						</Text>
						<View style={{flex: 3}}>
							<OpenHours hours={openHours} day="Su" />
							<OpenHours hours={openHours} day="Mo" />
							<OpenHours hours={openHours} day="Tu" />
							<OpenHours hours={openHours} day="We" />
							<OpenHours hours={openHours} day="Th" />
							<OpenHours hours={openHours} day="Fr" />
							<OpenHours hours={openHours} day="Sa" />
						</View>
					</View>
				}

				{info.footway == "sidewalk" ?
					<InfoText label={t('SURFACE_TEXT')} info={info.surface} />
					: info.footway == "crossing" ?
					<InfoText
						label={t('MARKED_CROSSWALK_TEXT')}
						info={info.crossing == "marked" ? t('YES_TEXT') : t('NO_TEXT')}
					/> :
					<InfoText label={t('INDOOR_TEXT')} info={info.indoor ? t('YES_TEXT') : t('NO_TEXT')} />}
			</View>}
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Button
					buttonStyle={{flex: 1, padding: 0}}
					titleStyle={{fontSize: 15}}
					title={t('ROUTE_FROM_HERE_TEXT')}
					type="clear"
					onPress={() => {
						props.setOrigin();
						AccessibilityInfo.announceForAccessibility("Set " + props.features.text + " as route start.");
					}}
				/>
				<Button
					buttonStyle={{flex: 1}}
					titleStyle={{fontSize: 15}}
					title={t('ROUTE_TO_HERE_TEXT')}
					type="clear"
					onPress={() => {
						props.setDestination();
						AccessibilityInfo.announceForAccessibility("Set " + props.features.text + " as route destination.");
					}}
				/>
			</View>
		</Card>
	);
}

const mapStateToProps = state => {
	return {
		features: state.pinFeatures,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		placePin: features => {
			dispatch(placePin(features));
		},
		setOrigin: () => {
			dispatch(setOrigin());
		},
		setDestination: () => {
			dispatch(setDestination());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FeatureCard);
