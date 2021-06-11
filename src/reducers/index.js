import { combineReducers } from 'redux';
import { NativeModules } from 'react-native';
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
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
	SEATTLE
} from '../constants';
import regions from '../../regions';

const { Rakam } = NativeModules;

const seattleProps = regions.features[SEATTLE].properties;
const seattleCoords = [seattleProps.lon, seattleProps.lat];

const logEvent = async (type, props) => {
	Rakam.trackEvent(type, props);
}

const defaultState = {
	isLoading: true,
	zoomLevel: 14,
	bbox: seattleProps.bounds,
	currRegion: seattleProps.name.toUpperCase(),
	centerCoordinate: seattleCoords,
	locateUserSwitch: false,
	canAccessLocation: false,
	geocodeCoords: null,
	pinFeatures: null,
	origin: null,
	destination: null,
	originText: null,
	destinationText: null,
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
			logEvent(action.type, ["lat", `${action.item.center[0]}`, "lon", `${action.item.center[1]}`]);
			return {...state, geocodeCoords: action.item.center };
		case GO_TO_REGION:
			logEvent(action.type, ["region", action.region.properties.name]);
			// centerCoordinate, bbox
			return {...state, geocodeCoords: [action.region.properties.lon, action.region.properties.lat], bbox: action.region.properties.bounds, currRegion: action.region.properties.name.toUpperCase()};
		case PLACE_PIN:
			logEvent(action.type, action.item == null ? ["segment", "null"] : ["segment", action.item.description]);
			return {...state, pinFeatures: action.item};
		case SET_MOBILITY_MODE:
			logEvent(action.type, ["mode", action.mode]);
			return {...state, mobilityMode: action.mode};
		case SET_CUSTOM_UPHILL:
			// logEvent(action.type, ["incline", `${action.incline}`]);
			return {...state, customUphill: action.incline};
		case SET_CUSTOM_DOWNHILL:
			// logEvent(action.type, ["incline", `${action.incline}`]);
			return {...state, customDownhill: action.incline};
		case TOGGLE_BARRIERS:
			logEvent(action.type, ["avoidRaisedCurbs", `${!state.avoidRaisedCurbs}`]);
			return {...state, avoidRaisedCurbs: !state.avoidRaisedCurbs};
		case SET_ORIGIN:
			const originText = state.pinFeatures && state.pinFeatures.text ? state.pinFeatures.text : null;
			logEvent(action.type, ["lat", `${state.pinFeatures.center[0]}`, "lon", `${state.pinFeatures.center[1]}`]);
			return {...state, origin: state.pinFeatures.center, pinFeatures: null, originText };
		case SET_DESTINATION:
			const destinationText = state.pinFeatures && state.pinFeatures.text ? state.pinFeatures.text : null;
			logEvent(action.type, ["lat", `${state.pinFeatures.center[0]}`, "lon", `${state.pinFeatures.center[1]}`]);
			return {...state, destination: state.pinFeatures.center, pinFeatures: null, destinationText};
		case REVERSE_ROUTE:
			logEvent(action.type, []);
			return {
				...state,
				origin: state.destination,
				destination: state.origin,
				originText: state.destinationText,
				destinationText: state.originText
			};
		case CANCEL_ROUTE:
			logEvent(action.type, []);
			return {...state, origin: null, destination: null, originText: null, destinationText: null, route: null};
		case VIEW_TRIP_INFO:
			logEvent(action.type, []);
			return {...state, viewingTripInfo: true};
		case CLOSE_TRIP_INFO:
			logEvent(action.type, []);
			return {...state, viewingTripInfo: false};
		case VIEW_DIRECTIONS:
			logEvent(action.type, []);
			return {...state, viewingDirections: true};
		case CLOSE_DIRECTIONS:
			logEvent(action.type, []);
			return {...state, viewingDirections: false};
		case LOCATE_USER:
			return {...state, locateUserSwitch: action.enable, canAccessLocation: true };
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
