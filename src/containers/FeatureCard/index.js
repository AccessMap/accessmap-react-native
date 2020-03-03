import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Header from '../../components/Header';
import { placePin, setOrigin, setDestination } from '../../actions';
import coordinatesToString from '../../utils/coordinates-to-string';
import parseOpenHours from '../../utils/parse-open-hours';

const InfoText = props => {
	return (
		<View style={{height: 40, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
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
	const info = (props.features.features && props.features.features[0]) ?
					props.features.features[0].properties : null;
	console.log(info);
	var openHours;
	if (info && info.opening_hours) {
		openHours =parseOpenHours(info.opening_hours);
	}

	return (
		<Card
			containerStyle={{bottom: 0, left: 0, right: 0, maxWidth: 400, marginBottom: 10, margin: 10, position: "absolute", zIndex: 50}}
		>
			<View style={{maxWidth: "100%"}}>
				<Header
					title={info ? info.footway == "sidewalk" ? "Sidewalk" :
						info.footway == "crossing" ? "Crossing" :
						coordinatesToString(props.features.center) :
						coordinatesToString(props.features.center)
						}
					close={() => props.placePin(null)}
				/>
			</View>
			{info && <View>
				<InfoText label="Description" info={info.description} />
				{info.footway == "sidewalk" ? 
					<InfoText
						label="Incline"
						info={Math.abs(Math.round(info.incline * 1000) / 10) + "%"}
					/> : info.footway == "crossing" ?
					<InfoText
						label="Curbramps"
						info={info.curbramps ? "Yes" : "No"}
					/> :

					<View style={{height: 120, flexDirection: "row", alignItems: "center", marginBottom: 5}}>
						<Text style={{flex: 2, fontSize: 16, flexWrap: "wrap"}}>
							Open Hours
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
					<InfoText label="Surface" info={info.surface} />
					: info.footway == "crossing" ?
					<InfoText
						label="Marked crosswalk"
						info={info.crossing == "marked" ? "Yes" : "No"}
					/> :
					<InfoText label="Indoor" info={info.indoor ? "Yes" : "No"} />}
			</View>}
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Button
					buttonStyle={{flex: 1, padding: 0}}
					titleStyle={{fontSize: 15}}
					title="ROUTE FROM HERE"
					type="clear"
					onPress={() => props.setOrigin()}
				/>
				<Button
					buttonStyle={{flex: 1}}
					titleStyle={{fontSize: 15}}
					title="ROUTE TO HERE"
					type="clear"
					onPress={() => props.setDestination()}
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
