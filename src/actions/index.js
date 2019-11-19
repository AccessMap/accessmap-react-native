export const ZOOM_IN = "ZOOM_IN";
export function zoomIn() {
	return { type: ZOOM_IN };
}

export const ZOOM_OUT = "ZOOM_OUT";
export function zoomOut() {
	return { type: ZOOM_OUT };
}

export const GO_TO_LOCATION = "GO_TO_LOCATION";
export function goToLocation(item) {
	return { type: GO_TO_LOCATION, item };
}

export const PLACE_PIN = "PLACE_PIN";
export function placePin(item) {
	return { type: PLACE_PIN, item };
}

export const SET_MOBILITY_MODE = "SET _MOBILITY_MODE";
export function setMobilityMode(mode) {
	return { type: SET_MOBILITY_MODE, mode };
}

export const SET_CUSTOM_UPHILL = "SET_CUSTOM_UPHILL";
export function setCustomUphill(incline) {
	return { type: SET_CUSTOM_UPHILL, incline };
}

export const SET_CUSTOM_DOWNHILL = "SET_CUSTOM_DOWNHILL";
export function setCustomDownhill(incline) {
	return { type: SET_CUSTOM_DOWNHILL, incline };
}

export const TOGGLE_BARRIERS = "TOGGLE_BARRIERS";
export function toggleBarriers() {
	return { type: TOGGLE_BARRIERS };
}

export const SET_ORIGIN = "SET_ORIGIN";
export function setOrigin() {
	return { type: SET_ORIGIN };
}

export const SET_DESTINATION = "SET_DESTINATION";
export function setDestination() {
	return { type: SET_DESTINATION };
}

export const REVERSE_ROUTE = "REVERSE_ROUTE";
export function reverseRoute() {
	return { type: REVERSE_ROUTE };
}

export const OPEN_DRAWER = "OPEN_DRAWER";
export function openDrawer() {
	return { type: OPEN_DRAWER };
}

export const CLOSE_DRAWER = "CLOSE_DRAWER";
export function closeDrawer() {
	return { type: CLOSE_DRAWER };
}

export const RECEIVE_ROUTE = "RECEIVE_ROUTE";
function receiveRoute(json) {
	return {
		type: RECEIVE_ROUTE,
		route: json,
	}
}

export function fetchRoute(origin, destination, uphill, downhill, avoidCurbs) {
	return function(dispatch) {
		if (origin && destination) {
			const data = {
				lon1: origin[0],
				lat1: origin[1],
				lon2: destination[0],
				lat2: destination[1],
				uphill, downhill, avoidCurbs,
			};
			const queryString = Object.keys(data)
				.map(key => key + "=" + encodeURIComponent(data[key]))
				.join("&");

			const url = "https://www.accessmap.io/api/v1/routing/directions/wheelchair.json?" + queryString;
			return fetch(url)
				.then(response => response.json(),
					error => console.log("An error occured.", error))
				.then(json => dispatch(receiveRoute(json)))
		}
		return dispatch(receiveRoute(null));
	}
}
