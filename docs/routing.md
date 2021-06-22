# Routing

This page describes how the requested route is returned and displayed in the app.

## Redux store
If you check `src/actions/index.js`, the `fetchRoute` function is where the route is generated. `MapView` calls `fetchRoute` when any of the route parameters change, in particular the origin, destination, inclines, or whether or not to avoid curbs. If the origin and destination are set, then a new route is calculated.

The AccessMap API already contains an endpoint that returns a route that we can render on our map. We just need to pass the parameters to this request and it will return the route as a JSON, which stores the route in the store state as `route`.

```js
const queryString = Object.keys(data)
    .map(key => key + "=" + encodeURIComponent(data[key]))
    .join("&");

const url = "https://www.accessmap.io/api/v1/routing/directions/wheelchair.json?" + queryString;
return fetch(url)
    .then(response => response.json())
    .then(json => dispatch(receiveRoute(json)))
```

## Rendering the Route on the MapView

`src/containers/MapView/layer-route.js` is where the route is rendered. It takes in the route from the `MapView`, which simply reads the new route from the Redux store.

Like with the annotations for map features, rendering a JSON onto the map requires a ShapeSource, which can hold LineLayers inside of it. The ShapeSource holds the data for the route that will be rendered, and the layers define styles for how to render the route. You can view the map-features or Mapbox docs for more information on styles.

In addition to the main route, we generate some route jogs. Since the user might not be starting exactly on a sidewalk or crossing, these short segments are drawn to direct the user to the nearest sidewalk to start the route. These are just two lines: one connecting the origin location to the first sidewalk in the route, and one connecting the last sidewalk in the route to the destination location.

## Directions and Route Info

The Directions and Trip Info components also use the `route` data in the state and display information to the user. When a user creates a route, the `RouteBottomCard` component (`src/containers/RouteBottomCard`) is displayed and allows users to choose to view the trip info or the directions. The source code for these can be found in `src/components`. Two more booleans in the state, `viewingDirections` and `viewingTripInfo`, track if these are open, and are used to conditionally render these components.