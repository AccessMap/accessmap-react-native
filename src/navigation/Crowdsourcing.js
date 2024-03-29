import React from 'react';

import FeedbackForm from '../components/organisms/FeedbackForm';


export default function Crowdsourcing({ route, navigation }) {
	const { info } = route.params;
	return (
		<FeedbackForm
			info={info}
			navigation={navigation}
		/>
	);
}
