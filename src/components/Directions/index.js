import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-elements';

import Header from '../Header';

const DirectionCard = props => {
	// Props:
	// a) footing
	// b) name of segment
	// c) distance
	const action = props.footway == "sidewalk" ? "Use the sidewalk" : "Cross the street";
	return (
		<Card accessible={true}>
			<Text style={{fontSize: 20}}>{action}</Text>
			<Text style={{fontSize: 15}}>{props.name}</Text>
			<Text>{Math.round(props.distance)} meters</Text>
		</Card>
	);
}

const Directions = props => {
	return (
		<View style={{width: "100%", backgroundColor: "white", flex: 1}}>
			<View style={{width: "100%", margin: 5}}>
				<Header
					title="Directions"
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
