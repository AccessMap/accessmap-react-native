const OUTLINE_WIDTH = 2;

export default {
	sidewalks: (uphillIncline, downhillIncline) => {
		return {
			lineCap: 'round',
			lineColor: [
				'interpolate',
				['exponential', 1.5],
				['*', 100, ['get', 'incline']],
				-1000, 'red',
				(downhillIncline), 'red',
				(downhillIncline * 5 / 8), 'yellow',
				0, 'lime',
				(uphillIncline * 5 / 8), 'yellow',
				(uphillIncline), 'red',
				1000, 'red',
			],
			lineWidth: [
				'interpolate',
				['exponential', 1.5],
				['zoom'],
				10, 0.1,
				16, 5,
				20, 24,
			],
		}
	},
	sidewalkOutlines: {
		lineCap: 'round',
		lineGapWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, 0.1,
			16, 5,
			20, 24,
		],
		lineWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, OUTLINE_WIDTH / 10,
			16, OUTLINE_WIDTH / 5,
			20, OUTLINE_WIDTH,
		],
		lineBlur: 0.5,
	},
	sidewalkInaccessible: {
		lineWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, 0.05,
			16, 1,
			20, 6,
		],
		lineDasharray: [5, 2],
		lineColor: 'red',
	},
	crossing: {
		lineCap: 'round',
		lineColor: '#444444',
		lineWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, 0.07,
			16, 3.5,
			20, 20,
		],
	},
	crossingOutline: {
		lineColor: '#EEEEEE',
		lineCap: 'round',
		lineGapWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, 0.05,
			16, 2,
			20, 14,
		],
		lineWidth: [
			'interpolate',
			['exponential', 1.5],
			['zoom'],
			10, OUTLINE_WIDTH / 10,
			16, OUTLINE_WIDTH / 2,
			20, OUTLINE_WIDTH,
		],
		lineBlur: 0.5,
 
	},
};
