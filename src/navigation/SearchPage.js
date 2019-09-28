import React, { Component } from 'react';
import {View, FlatList, Text, TextInput} from 'react-native';
import {Button, SearchBar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Geocoder from '../containers/Geocoder';

export default class SearchPage extends Component {
	static navigationOptions = ({navigation}) => {
		return {
			headerLeftContainerStyle: {
				width: '100%',
			},
			headerLeft: (
				<View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
					<Button
						icon={<Icon
							name='arrow-left'
							size={20}
						/>}
						buttonStyle={{backgroundColor: 'transparent', margin: 5}}
						onPress={() => navigation.goBack()}
					/>
					<TextInput
						style={{flex: 1}}
						placeholder='Search address'
						autoFocus={true}
						onChangeText={search => navigation.setParams({search})}
					/>
				</View>
			),
		}
	};

	render() {
	const { params } = this.props.navigation.state;

		return (
			<View>
				<Geocoder
					type={params.type}
					navigation={this.props.navigation}
					search={this.props.navigation.getParam('search', '')}
				/>
			</View>
		);
	}
}
