import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
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
			<Text style={{fontSize: 20}}>{action}</Text>
			<Text style={{fontSize: 15}}>{props.name}</Text>
			<Text>{Math.round(props.distance)} meters</Text>
		</Card>
	);
}

const Directions = props => {
	const { t, i18n } = useTranslation();

	return (
		<View style={{width: "100%", backgroundColor: "white", flex: 1}}>
			<View style={{width: "100%", margin: 5}}>
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
