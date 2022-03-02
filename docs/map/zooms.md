# Zooming in and out

Here is a quick overview of how zoom in/out is implemented. Since the values in the store are not accurate, it would be ideal to change this in the future.

## Implementation
![Zoom level implementation](./images/zooms.PNG)

The main zooming in/out functionality can be found in `src/containers/MapButtons/Zooms.js`.

The Redux store holds an "relative zoom level" that may or may not reflect the actual Zoom level of the map. When a zoom button is pressed, it dispatches a `ZOOM_IN` or `ZOOM_OUT` action to the store, causing the relative zoom level to increment (zoom in) or decrement (zoom out) for the updated state.

The MapView component found in `src/containers/MapView/index.js` responds to the change in the application state. It compares the previous relative zoom level to the new one in `componentDidUpdate` to determine if the map should zoom in or out. It then retrieves the real zoom level of the map and increments or decrements the real zoom level based on how the relative zoom level changed, which is handled in `zoomPress`.

The advantage of using a relative zoom level is it separates the map's actual zoom level from the rest of the application. Users may change the zoom level without using the zoom buttons, and those changes do not need to be reflected in the store. Changing the zoom via manual map manipulation and via zoom buttons at the same time has led to synchronization issues, so it seems easier to check if the map has zoomed in or not rather than maintaining the map's zoom level at the store's zoom level at all times.

It may be more ideal to have the store's zoom level reflect the actual zoom level of the map, however, so this is something we may consider changing down the line.