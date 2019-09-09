import { combineReducers } from 'redux';
import {
	ZOOM_IN,
	ZOOM_OUT,
	GO_TO_LOCATION,
	SET_MOBILITY_MODE,
	SET_CUSTOM_UPHILL,
	SET_CUSTOM_DOWNHILL,
	OPEN_DRAWER,
	CLOSE_DRAWER,
} from '../actions';
import {
	MOBILITY_MODE_CUSTOM,
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../constants';

const defaultState = {
	zoomLevel: 14,
	centerCoordinate: [-122.3321, 47.6062],
	pinLocation: null,
	mobilityMode: MOBILITY_MODE_CUSTOM,
	customUphill: 0.08,
	customDownhill: 0.08,
	drawerOpen: false,
}

export default function mapApp(state = defaultState, action) {
	switch (action.type) {
		case ZOOM_IN:
			return Object.assign({}, state, {
				zoomLevel: state.zoomLevel + 1,
			});
		case ZOOM_OUT:
			return Object.assign({}, state, {
				zoomLevel: state.zoomLevel - 1,
			});
		case GO_TO_LOCATION:
			return Object.assign({}, state, {
				pinLocation: action.item.center,
			});
		case SET_MOBILITY_MODE:
			return Object.assign({}, state, {
				mobilityMode: action.mode,
			});
		case SET_CUSTOM_UPHILL:
			return Object.assign({}, state, {
				customUphill: action.incline
			});
		case SET_CUSTOM_DOWNHILL:
			return Object.assign({}, state, {
				customDownhill: action.incline
			});
		case OPEN_DRAWER:
			return Object.assign({}, state, {
				openDrawer: true,
			});
		case CLOSE_DRAWER:
			return Object.assign({}, state, {
				openDrawer: false,
			});
		default:
			return state;
	}
}
