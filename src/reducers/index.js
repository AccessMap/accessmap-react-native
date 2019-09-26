import { combineReducers } from 'redux';
import {
	ZOOM_IN,
	ZOOM_OUT,
	GO_TO_LOCATION,
	PLACE_PIN,
	SET_MOBILITY_MODE,
	SET_CUSTOM_UPHILL,
	SET_CUSTOM_DOWNHILL,
	TOGGLE_BARRIERS,
	SET_ORIGIN,
	SET_DESTINATION,
	REVERSE_ROUTE,
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
	geocodeCoords: null,
	pinFeatures: null,
	origin: null,
	destination: null,
	mobilityMode: MOBILITY_MODE_CUSTOM,
	customUphill: 8,
	customDownhill: 10,
	avoidRaisedCurbs: true,
	drawerOpen: false,
}

export default function mapApp(state = defaultState, action) {
	switch (action.type) {
		case ZOOM_IN:
			return {...state, zoomLevel: state.zoomLevel + 1};
		case ZOOM_OUT:
			return {...state, zoomLevel: state.zoomLevel - 1};
		case GO_TO_LOCATION:
			return {...state, geocodeCoords: action.item.center};
		case PLACE_PIN:
			console.log(action.item);
			return {...state, pinFeatures: action.item};
		case SET_MOBILITY_MODE:
			return {...state, mobilityMode: action.mode};
		case SET_CUSTOM_UPHILL:
			return {...state, customUphill: action.incline};
		case SET_CUSTOM_DOWNHILL:
			return {...state, customDownhill: action.incline};
		case TOGGLE_BARRIERS:
			return {...state, avoidRaisedCurbs: !state.avoidRaisedCurbs};
		case SET_ORIGIN:
			return {...state, origin: state.pinFeatures.center, pinFeatures: null};
		case SET_DESTINATION:
			return {...state, destination: state.pinFeatures.center, pinFeatures: null};
		case REVERSE_ROUTE:
			return {...state, origin: state.destination, destination: state.origin};
		case OPEN_DRAWER:
			return {...state, openDrawer: true};
		case CLOSE_DRAWER:
			return {...state, openDrawer: false};
		default:
			return state;
	}
}
