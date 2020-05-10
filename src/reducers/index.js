import { combineReducers } from 'redux';
import {
	MAP_LOADED,
	ZOOM_IN,
	ZOOM_OUT,
	GO_TO_LOCATION,
	GO_TO_REGION,
	PLACE_PIN,
	SET_MOBILITY_MODE,
	SET_CUSTOM_UPHILL,
	SET_CUSTOM_DOWNHILL,
	TOGGLE_BARRIERS,
	SET_ORIGIN,
	SET_DESTINATION,
	REVERSE_ROUTE,
	CANCEL_ROUTE,
	VIEW_TRIP_INFO,
	CLOSE_TRIP_INFO,
	VIEW_DIRECTIONS,
	CLOSE_DIRECTIONS,
	OPEN_DRAWER,
	CLOSE_DRAWER,
	LOCATE_USER,
	RECEIVE_ROUTE,
} from '../actions';
import {
	MOBILITY_MODE_CUSTOM,
	SEATTLE
} from '../constants';
import regions from '../../regions';

const seattleProps = regions.features[SEATTLE].properties;
const seattleCoords = [seattleProps.lon, seattleProps.lat];

const defaultState = {
	isLoading: true,
	zoomLevel: 14,
	bbox: seattleProps.bounds,
	currRegion: seattleProps.name.toUpperCase(),
	centerCoordinate: seattleCoords,
	locateUserSwitch: false,
	geocodeCoords: null,
	pinFeatures: null,
	origin: null,
	destination: null,
	mobilityMode: MOBILITY_MODE_CUSTOM,
	customUphill: 8,
	customDownhill: 10,
	avoidRaisedCurbs: true,
	viewingTripInfo: false,
	viewingDirections: false,
	drawerOpen: false,
	route: null,
}

export default function mapApp(state = defaultState, action) {
	switch (action.type) {
		case MAP_LOADED:
			return {...state, isLoading: false};
		case ZOOM_IN:
			return {...state, zoomLevel: state.zoomLevel + 1};
		case ZOOM_OUT:
			return {...state, zoomLevel: state.zoomLevel - 1};
		case GO_TO_LOCATION:
			return {...state, geocodeCoords: action.item.center};
		case GO_TO_REGION:
			// centerCoordinate, bbox
			return {...state, geocodeCoords: [action.region.properties.lon, action.region.properties.lat], bbox: action.region.properties.bounds, currRegion: action.region.properties.name.toUpperCase()};
		case PLACE_PIN:
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
		case CANCEL_ROUTE:
			return {...state, origin: null, destination: null, route: null};
		case VIEW_TRIP_INFO:
			return {...state, viewingTripInfo: true};
		case CLOSE_TRIP_INFO:
			return {...state, viewingTripInfo: false};
		case VIEW_DIRECTIONS:
			return {...state, viewingDirections: true};
		case CLOSE_DIRECTIONS:
			return {...state, viewingDirections: false};
		case LOCATE_USER:
			return {...state, locateUserSwitch: !state.locateUserSwitch };
		case OPEN_DRAWER:
			return {...state, openDrawer: true};
		case CLOSE_DRAWER:
			return {...state, openDrawer: false};
		case RECEIVE_ROUTE:
			return {...state, route: action.route};
		default:
			return state;
	}
}
