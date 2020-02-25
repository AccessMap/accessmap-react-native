import {
	MOBILITY_MODE_WHEELCHAIR,
	MOBILITY_MODE_POWERED,
	MOBILITY_MODE_CANE,
} from '../constants';

const getInclineLimit = (customUphill, customDownhill, mobilityMode) => {
	switch (mobilityMode) {
		case MOBILITY_MODE_WHEELCHAIR:
			return [8, -10];
		case MOBILITY_MODE_POWERED:
			return [12, -12];
		case MOBILITY_MODE_CANE:
			return [14, -14];
	}
	return [customUphill, customDownhill];
}

export default getInclineLimit;
