export const ZOOM_IN = 'ZOOM_IN';
export function zoomIn() {
	return { type: ZOOM_IN };
}

export const ZOOM_OUT = 'ZOOM_OUT';
export function zoomOut() {
	return { type: ZOOM_OUT };
}

export const GO_TO_LOCATION = 'GO_TO_LOCATION';
export function goToLocation(item) {
	return { type: GO_TO_LOCATION, item };
}

export const SET_MOBILITY_MODE = 'SET _MOBILITY_MODE';
export function setMobilityMode(mode) {
	return { type: SET_MOBILITY_MODE, mode };
}

export const SET_CUSTOM_UPHILL = 'SET_CUSTOM_UPHILL';
export function setCustomUphill(incline) {
	return { type: SET_CUSTOM_UPHILL, incline };
}

export const SET_CUSTOM_DOWNHILL = 'SET_CUSTOM_DOWNHILL';
export function setCustomDownhill(incline) {
	return { type: SET_CUSTOM_DOWNHILL, incline };
}

export const OPEN_DRAWER = 'OPEN_DRAWER';
export function openDrawer() {
	return { type: OPEN_DRAWER };
}

export const CLOSE_DRAWER = 'CLOSE_DRAWER';
export function closeDrawer() {
	return { type: CLOSE_DRAWER };
}
