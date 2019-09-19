import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

const InfoText = props => {
	return (
		<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
			<Text style={{flex: 2, fontSize: 16}}>
				{props.label}
			</Text>
			<Text style={{flex: 3, fontSize: 16, flexWrap: 'wrap'}}>
				{props.info}
			</Text>
		</View>
	);
}

const FeatureCard = props => {
	return (
		<Card
			containerStyle={{bottom: 0, left: 0, right: 0, maxWidth: 400, marginBottom: 10, margin: 10, position: 'absolute'}}
		>
			<View style={{maxWidth: '100%'}}>
				<View style={{flexDirection: 'row'}}>
					<Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>Sidewalk</Text>
				</View>
			</View>
			<View>
				<InfoText label='Properties' info='Sidewalk S of JOHN ST yoooo' />
				<InfoText label='Incline' info='1.7%' />
				<InfoText label='Surface' info='Concrete' />
			</View>
		</Card>
	);
}

export default connect(null, null)(FeatureCard);
