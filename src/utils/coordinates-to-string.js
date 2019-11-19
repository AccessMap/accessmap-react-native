const coordinatesToString = coordinates => {
	return (Math.round(1000000 * coordinates[0]) / 1000000 + ", " +
			Math.round(1000000 * coordinates[1]) / 1000000);
}

export default coordinatesToString;
