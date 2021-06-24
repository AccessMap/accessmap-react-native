// Index for Directions and Direction Cards
import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import { Fonts } from '../../styles'
import { useTranslation } from 'react-i18next';

import Header from '../Header';

const DirectionCard = props => {
	// Props:
	// a) footing
	// b) name of segment
	// c) distance
	const { t, i18n } = useTranslation();
	const action = props.footway == "sidewalk" ? t("USE_SIDEWALK_TEXT") : t("USE_CROSSING_TEXT");
	return (
		<Card accessible={true}>
			<Text style={Fonts.h2}>{action}</Text>
			<Text style={Fonts.p}>{props.name}</Text>
			<Text style={Fonts.p}>{Math.round(props.distance)} meters</Text>
		</Card>
	);
}

const Directions = props => {
	const { t, i18n } = useTranslation();

	return (
		<View style={{width: "100%", backgroundColor: "white", flex: 1}}>
			<View style={{ marginLeft: 10 }}>
				<Header
					title={t("DIRECTIONS_TEXT")}
					close={props.close}
				/>
			</View>
		  <FlatList
			  data={props.route.routes[0].segments.features}
				renderItem={({ item }) =>
					<DirectionCard
						footway={item.properties.footway}
						name={item.properties.description}
						distance={item.properties.length}
					/>
				}
				keyExtractor={(item, index) => index.toString()}
				style={{marginBottom: 5}}
			/>
		</View>
	);
}

export default Directions;
