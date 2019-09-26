import React from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { placePin, setOrigin, setDestination } from '../../actions';

const InfoText = props => {
	return (
		<View style={{height: 40, flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
			<Text style={{flex: 2, fontSize: 16, flexWrap: 'wrap'}}>
				{props.label}
			</Text>
			<Text style={{flex: 3, fontSize: 16, flexWrap: 'wrap'}}>
				{props.info}
			</Text>
		</View>
	);
}

const coordsString = coords => {
	return (Math.round(1000000 * coords[0]) / 1000000 + ', ' +
			Math.round(1000000 * coords[1]) / 1000000);
}

const FeatureCard = props => {
	const info = (props.features.features && props.features.features[0]) ?
					props.features.features[0].properties : null;
	return (
		<Card
			containerStyle={{bottom: 0, left: 0, right: 0, maxWidth: 400, marginBottom: 10, margin: 10, position: 'absolute', zIndex: 50}}
		>
			<View style={{maxWidth: '100%'}}>
				<View style={{flexDirection: 'row'}}>
					<Text style={{flex: 1, fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
						{info ? info.footway == 'sidewalk' ? 'Sidewalk' :
							'Crossing' :
							coordsString(props.features.center)
						}
					</Text>
					<Button
						buttonStyle={{backgroundColor: '#FFFFFF', borderRadius: 20, marginRight: 5, height: 40}}
						icon={<Icon
							name='times'
							size={20}
							color='#555555'
						/>}
						onPress={() => {
							props.placePin(null);
						}}
					/>
				</View>
			</View>
			{info && <View>
				<InfoText label='Properties' info={info.description} />
				{info.footway == 'sidewalk' ? 
					<InfoText
						label='Incline'
						info={(Math.round(info.incline * 1000) / 10) + '%'}
					/> :
					<InfoText
						label='Curbramps'
						info={info.curbramps ? 'Yes' : 'No'}
					/>}
				{info.footway == 'sidewalk' ?
					<InfoText label='Surface' info={info.surface} /> :
					<InfoText
						label='Marked crosswalk'
						info={info.crossing == 'marked' ? 'Yes' : 'No'}
					/>}
			</View>}
			<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
				<Button
					buttonStyle={{flex: 1, padding: 0}}
					titleStyle={{fontSize: 15}}
					title='ROUTE FROM HERE'
					type='clear'
					onPress={() => props.setOrigin()}
				/>
				<Button
					buttonStyle={{flex: 1}}
					titleStyle={{fontSize: 15}}
					title='ROUTE TO HERE'
					type='clear'
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
