// Index for Directions and Direction Cards
import React from 'react';
import { AccessibilityInfo, FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import DirectionCard from "./DirectionCard";

import Header from '../Header';

const Directions = props => {
	const { t, i18n } = useTranslation();
	AccessibilityInfo.announceForAccessibility("Showing Directions screen.")

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
				renderItem={({ item, index }) =>
					<DirectionCard
						footway={item.properties.footway}
						name={item.properties.description}
						distance={item.properties.length}
						index={index}
					/>
				}
				keyExtractor={(item, index) => index.toString()}
				style={{marginBottom: 5}}
			/>
		</View>
	);
}

export default Directions;
