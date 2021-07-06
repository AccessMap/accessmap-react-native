// SearchPage consists of a search bar and the Geocoder results
// Is displayed when the user taps on the search bar in the omnicard.
import React from 'react';
import Geocoder from '../containers/Geocoder';

export default function SearchPage({route, navigation}) {
  const {search, type} = route.params;
  return <Geocoder type={type} navigation={navigation} search={search} />;
}
