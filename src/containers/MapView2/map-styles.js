import { uphillColorMap } from "../../colors";
const OUTLINE_WIDTH = 2;

const isAccessible = prefs => ["any", isAccessibleSidewalk(prefs), ["!", inaccessibleCrossingExpr(prefs)], isElevator];

// Sidewalk expressions
const isSidewalk = ["==", ["get", "footway"], "sidewalk"];
const accessibleSidewalkExpr = prefs => ["<=", ["abs", ["*", 100, ["get", "incline"]]], prefs.maxUphill];
const isAccessibleSidewalk = prefs => ["all", isSidewalk, accessibleSidewalkExpr(prefs)];

// Crossing expressions
const isCrossing = ["==", ["get", "footway"], "crossing"];
const inaccessibleCrossingExpr = prefs => [
	"all",
	isCrossing,
	prefs.avoidCurbs,
	["!", ["to-boolean", ["get", "curbramps"]]],
];
const markedExpression = prefs => [
	"all",
	isCrossing,
	["!", inaccessibleCrossingExpr(prefs)],
	["==", ["get", "crossing"], "marked"]
];
const unmarkedExpression = prefs => [
	"all",
	isCrossing,
	["!", inaccessibleCrossingExpr(prefs)],
	["any", ["==", ["get", "crossing"], "unmarked"], ["!", ["has", "crossing"]]]
];

// Elevator expressions
const isElevator = ["all",
	["==", ["get", "subclass"], "footway"],
	["==", ["get", "elevator"], 1]];

export default {
	paths: prefs => {
	  const incline = prefs.maxUphill;
		const nSamples = 15;
		const nSide = parseInt(nSamples / 2);
		const range = [...Array(nSamples).keys()].map(d => (d - nSide) / nSide);

		const colorMap = uphillColorMap(incline, incline, incline);
		const inclineSamples = range.map(d => d * incline);
		const inclineStops = [];
		inclineSamples.map(d => {
			const color = colorMap(d);
			inclineStops.push(d);
			inclineStops.push(color.hex());
		});
		return {
			lineCap: "round",
			lineColor: [
				"case",
				isCrossing,
				"#444444",
				isElevator,
				"black",
				["!", isAccessibleSidewalk(prefs)],
				"red",
				[">", ["to-number", ["get", "incline"]], incline],
				"#ff0000",
				["<", ["to-number", ["get", "incline"]], -incline],
				"#ff0000",
				[
					"interpolate",
					["exponential", 1.5],
					["abs", ["*", 100, ["get", "incline"]]],
					...inclineStops
				]
			],
			lineWidth: [
				// Was unable to nest interpolate within case for some reason
				"interpolate",
				["exponential", 1.5],
				["zoom"],
				10, ["case", isAccessibleSidewalk(prefs), 0.1,
					markedExpression(prefs), 0.07, isElevator, 0, 0.05],
				16, ["case", isAccessibleSidewalk(prefs), 5,
					markedExpression(prefs), 3.5, isElevator, 0, 1],
				20, ["case", isAccessibleSidewalk(prefs), 24,
					markedExpression(prefs), 20, isElevator, 0, 6]
			]
		}
	},
	press: {
		lineCap: "round",
		lineOpacity: 0.000001,
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 2,
			16, 10,
			20, 30
		]
	},
	outlines: prefs => {
		return {
			lineColor: "blue",
			lineWidth: 3
		}
	},
	sidewalks: incline => {
		const nSamples = 15;
		const nSide = parseInt(nSamples / 2);
		const range = [...Array(nSamples).keys()].map(d => (d - nSide) / nSide);

		const colorMap = uphillColorMap(incline, incline, incline);
		const inclineSamples = range.map(d => d * incline);
		const inclineStops = [];
		inclineSamples.map(d => {
			const color = colorMap(d);
			inclineStops.push(d);
			inclineStops.push(color.hex());
		});
		return {
			lineCap: "round",
			lineColor: [
				"case",
				[">", ["to-number", ["get", "incline"]], incline],
				"#ff0000",
				["<", ["to-number", ["get", "incline"]], -incline],
				"#ff0000",
				[
				"interpolate",
				["exponential", 1.5],
				["abs", ["*", 100, ["get", "incline"]]],
				...inclineStops
				]
			],
			lineWidth: [
				"interpolate",
				["exponential", 1.5],
				["zoom"],
				10, ["case", isSidewalk, 0.1, isCrossing, 0.07, 0],
				16, ["case", isSidewalk, 5, isCrossing, 3.5, 0],
				20, ["case", isSidewalk, 24, isCrossing, 20, 0],
			],
		}
	},
	sidewalkPress: {
		lineCap: "round",
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 2, //0.1,
			16, 10, //5,
			20, 30, //24,
		],
		lineOpacity: 0.000001,
	},
	sidewalkOutlines: {
		lineCap: "round",
		lineGapWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 0.1,
			16, 5,
			20, 24,
		],
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, OUTLINE_WIDTH / 10,
			16, OUTLINE_WIDTH / 5,
			20, OUTLINE_WIDTH,
		],
		lineBlur: 0.5,
	},
	inaccessible: {
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 0.05,
			16, 1,
			20, 6,
		],
		lineDasharray: [5, 2],
		lineColor: "red",
	},
	crossing: {
		lineCap: "round",
		lineColor: "#444444",
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 0.07,
			16, 3.5,
			20, 20,
		],
	},
	crossingPress: {
		lineCap: "round",
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 1, //0.07,
			16, 5, //3.5,
			20, 25, //20,
		],
		lineOpacity: 0.000001,
	},
	crossingOutline: {
		lineColor: "#EEEEEE",
		lineCap: "round",
		lineGapWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 0.05,
			16, 2,
			20, 14,
		],
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, OUTLINE_WIDTH / 10,
			16, OUTLINE_WIDTH / 2,
			20, OUTLINE_WIDTH,
		],
		lineBlur: 0.5,
	},
	crossingUnmarked: {
		lineColor: "#444444",
		lineCap: "round",
		lineGapWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, 0.05,
			16, 2,
			20, 14,
		],
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			10, OUTLINE_WIDTH / 10,
			16, OUTLINE_WIDTH / 5,
			20, OUTLINE_WIDTH,
		],
		lineBlur: 0.5,
	},
	routeFill: {
		lineColor: "#4BF",
		lineCap: "round",
		lineJoin: "round",
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 5,
			16, 12,
			22, 92,
		],
	},
	routeOutline: {
		lineColor: "black",
		lineCap: "round",
		lineJoin: "round",
		lineGapWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 4.7,
			16, 9.7,
			22, 92,
		],
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 0.5,
			16, 1,
			22, 1,
		],
		lineBlur: 0.5,
	},
	elevatorPath: {
		lineColor: "black",
		lineGapWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 0.3,
			16, 2,
			22, 20,
		],
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 0.1,
			16, 0.6,
			22, 6,
		],
	},
	elevatorPress: {
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 0.3,
			16, 2,
			22, 20,
		],
		lineOpacity: 0.000001,
	},
	fadeOut: {
		lineOpacity: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			13, 0.01,
			14, 0.4,
			16, 1.00
		],
	},
	jogs: {
		lineColor: "black",
		lineOpacity: 0.6,
		lineWidth: [
			"interpolate",
			["exponential", 1.5],
			["zoom"],
			12, 0.2,
			16, 3,
			22, 30,
		],
		lineCap: "round",
		lineJoin: "round",
		lineDasharray: [1, 2],
	},
};
