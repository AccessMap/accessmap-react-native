# Geocoding

This page describes how the geocoder is implemented. The geocoder allows for searching for named locations, which pans the map to the location's coordinates and places a pin.

## Overview

For Android, the geocoder search bar is located on the OmniCard, and when the search bar is tapped, it navigates the user to a new screen that allows the user to search for places within the selected region.

Within `src/containers/OmniCard/index.js`, this geocode search bar is represented as the `GeocodeBar` component. It is wrapped in a touchable view that triggers a navigation change to the `Search` page when pressed (see `src/navigation/SearchPage.js`).

The main geocoding functionality is in the `Geocoder` component, which is found in `src/containers/Geocoder/index.js`. This component receives the search terms from the parameters in `SearchPage.js`, then passes the query into an call to Mapbox's geocoding API.

```js
const query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.props.search +
    ".json?bbox=" + this.props.bbox +
    "&limit=10&access_token=" + accessToken;

fetch(query)
    .then(response => response.json())
    .then(json => this.setState({ searchList: json.features }))
```

The state is set to a list of the names of the returned locations. Upon selecting an option from that list, an action is dispatched to update the Redux store state based on the type of search:
- Normal searches will update the `pinLocation` by calling `goToLocation`
- Searches "from" a location updates the `origin` by calling `setOrigin`
- Searches "to" a location updates the `destination` by calling `setDestination`

Finally, within the reducer and MapView code, the map responds to these parameter changes by moving the map camera to that location and placing the pin in the location. Additionally, the `FeatureCard` gets automatically updated since `pinFeatures` is set to a non-null value. Using the geocoder causes a name to appear on the `FeatureCard` and on the `OmniCard`'s geocode bar instead of just coordinates, retrieved from `pinFeatures.text`, `originText`, and `destinationText`.