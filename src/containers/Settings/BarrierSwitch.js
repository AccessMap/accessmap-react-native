import React from 'react';
import { Switch, Text, View } from 'react-native';
import { toggleBarriers } from '../../actions';
import { connect } from 'react-redux';

import { AVOID_BARRIERS_TEXT } from '../../utils/translations';

const BarrierSwitch = props => {
	return (
		<View style={{flex: 1, flexDirection: "row", margin: 10}}>
			<Switch
				onValueChange={props.toggleBarriers}
				value={props.avoidRaisedCurbs}
			/>
			<Text style={{marginLeft: 5}}>{AVOID_BARRIERS_TEXT}</Text>
		</View>
	);
};

const mapStateToProps = state => {
	return ({
		avoidRaisedCurbs: state.avoidRaisedCurbs,	
	});
};

const mapDispatchToProps = dispatch => {
	return ({
		toggleBarriers: () => {
			dispatch(toggleBarriers());
		}
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(BarrierSwitch);
