const pathExpr = prefs => {
	const expr = {
		isSidewalk = ["==", ["get", "footway"], "sidewalk"],
		isCrossing = ["==", ["get", "footway"], "crossing"],
		isElevator = ["all",
			["==", ["get", "subclass"], "footway"],
			["==", ["get", "elevator"], 1]];
	};
	let accessibleSidewalkExpr =
		["<=", ["abs", ["*", 100, ["get", "incline"]]], prefs.maxUphill];
	expr.isAccessibleSidewalk = ["all", expr.isSidewalk, accessibleSidewalkExpr];

	let inaccessibleCrossingExpr =
		["all", expr.isCrossing, prefs.avoidCurbs,
		["!", ["to-boolean", ["get", "curbramps"]];
	expr.isMarked =
		["all", expr.isCrossing, ["!", inaccessibleCrossingExpr],
		["==", ["get", "crossing"], "marked"];
	expr.isUnmarked =
		["all", isCrossing, ["!", inaccessibleCrossingExpr],
		["any", ["==", ["get", "crossing"], "unmarked"], ["!", ["has", "crossing"]]]
	];

	expr.isInaccessible = ["!", ["any", expr.accessibleSidewalk,
		["!", inaccessibleCrossingExpr], expr.isElevator]];

	return expr;
};

export default pathExpr;
