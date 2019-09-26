import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import { connect } from 'react-redux';
import { goToLocation, placePin } from '../../actions';

accessToken = 'pk.eyJ1IjoieWVocmljIiwiYSI6ImNqeWl6eG14YTAzOHgzbXBmMGE2eHM0amUifQ.QuULT47s_LKOyGcCYF6iIw';

class Geocoder extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidUpdate(prevProps) {
		if (this.props.search !== prevProps.search) {
			const query = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + this.props.search +'.json?access_token=' + accessToken;
		
			fetch(query)
				.then(response => response.json())
				.then(json => this.setState({ searchList: json.features }))
				.catch(error => console.log('Ran into a problem'));
		}
	}

	_renderItem = ({item, index}) => {
		return (
			<ListItem
				onPress={() => {
					this.props.goToLocation(item);
					this.props.navigation.pop();
				}}
				title={item.place_name}
			/>
		);
	}
	render() {
		return (
			<FlatList
				data={this.state.searchList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={this._renderItem}
			/>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		goToLocation: item => {
			dispatch(goToLocation(item));
			dispatch(placePin(item));
		}
	};
};

export default connect(null, mapDispatchToProps)(Geocoder);
