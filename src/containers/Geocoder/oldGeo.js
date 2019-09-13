import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStore } from 'redux';
import { connect } from 'react-redux';

import { goToLocation } from '../../actions';

accessToken = 'pk.eyJ1IjoieWVocmljIiwiYSI6ImNqeWl6eG14YTAzOHgzbXBmMGE2eHM0amUifQ.QuULT47s_LKOyGcCYF6iIw';

class Geocoder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: '',
			showSearchList: false,
		};
	}

	_updateSearch = search => {
		this.setState({search, showSearchList: true});
		const query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + search +'.json?access_token=' + accessToken;

		fetch(query)
			.then(response => response.json())
			.then(json => this.setState({ searchList: json.features }))
			.catch(error => console.log('Ran into a problem'));
	};

	_renderItem = ({item, index}) => {
		return (
			<ListItem
				style={styles.geocoderResult}
				onPress={() => {
					console.log('pressed');
					this.setState({
						search: item.text,
						showSearchList: false,
					});
					this.props.goToLocation(item);
				}}
				title={item.text}
				titleStyle={styles.geocoderResultText}
			/>
		);
	};

	render() {
		return (
			<View style={styles.geocoder}>
				<SearchBar
					placeholder='Enter address'
					onChangeText={this._updateSearch}
					value={this.state.search}
					lightTheme={true}
					containerStyle={{backgroundColor: '#EEEEEE', padding: 0}}
					inputContainerStyle={{backgroundColor: '#DDDDDD'}}
					inputStyle={styles.geocoderInput}
				/>
				<View>
				<View style={{
					position: 'absolute',
					left: 0,
					right: 0,
					zIndex: 20
				}}>
					{false && <FlatList
						style={styles.geocoderSearchList}
						data={this.state.searchList}
						keyExtractor={(item, index) => index.toString()}
						renderItem={this._renderItem}
					/>}
				</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	geocoder: {
		flex: 1,
		left: 0,
		right: 0,
		top: 0,
		zIndex: 20,
	},
	geocoderSearchList: {
		backgroundColor: 'white',
		width: '100%',
	},
	geocoderResult: {
		width: '100%',
		height: 40,
		left: 0,
		right: 0,
		zIndex: 100,
	},
	geocoderResultText: {
		fontSize: 16,
	},
	geocoderInput: {
		margin: 0,
		padding: 0,
		fontSize: 14,
	}
});

const mapStateToProps = state => {
	return {
		pinLocation: state.pinLocation,
	};
}

const mapDispatchToProps = dispatch => {
	return {
		goToLocation: (item) => {
			dispatch(goToLocation(item));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Geocoder);
