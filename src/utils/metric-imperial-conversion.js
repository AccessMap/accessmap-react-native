export const metersToFeet = (meters) => {
	return (Math.round(meters * 3.28084 * 10) / 10);
}

export const metersToMiles = (miles) => {
    return (Math.round(miles * 0.000621371192 * 100) / 100);
}