# Map Features

This page contains info on how the sidewalks and other features are drawn onto the map.

## Displaying features on the map

View the React Native Mapbox documentation for a better idea of how vectors and annotations are rendered onto the map.

All the features on the map are rendered in the `MapView` component. The two main types are annotations and vectors.

### Annotations

For AccessMap, the annotations are the pins that show up when you tap the map or search a location in the geocoder. In `containers/MapView/layer-annotations.js`, you can find the main code for rendering these.

```js
<MapboxGL.Images images={{
    pin: pinIcon,
    origin: originIcon,
    destination: destinationIcon,
}}/>
<MapboxGL.ShapeSource
    id="annotations"
    shape={featureCollection()}
>
    <MapboxGL.SymbolLayer id="location" style={iconStyle} />
</MapboxGL.ShapeSource>
```

Mapbox's [ShapeSource](https://github.com/react-native-mapbox-gl/maps/blob/master/docs/ShapeSource.md) and [SymbolLayer](https://github.com/react-native-mapbox-gl/maps/blob/master/docs/SymbolLayer.md) components are used to render the annotations. There are three different pins that we render for this layer: `pinFeatures`, `origin`, and `destination`, which are all modified via the Redux store.

### Lines (sidewalks)

The line annotations are rendered within multiple [LineLayer](https://github.com/react-native-mapbox-gl/maps/blob/master/docs/LineLayer.md)s, which are contained within a [VectorSource](https://github.com/react-native-mapbox-gl/maps/blob/master/docs/VectorSource.md). The VectorSource receives feature data from:

`https://www.accessmap.io/tiles/tilejson/pedestrian.json`

which gives AccessMap the sidewalk, crossing, and elevator data that must be rendered in the given view.

The code for the main layers can be found in `containers/MapView`, they are `layer-sidewalks.js`, `layer-crossings.js`, and `layer-elevator-paths.js`. Some examples:

```js
<MapboxGL.LineLayer
    id="sidewalk-press"
    sourceID="pedestrian"
    sourceLayerID="transportation"
    filter={isSidewalkExpression}
    layerIndex={81}
    style={styles.sidewalkPress}
/>
<MapboxGL.LineLayer
    id="sidewalk"
    sourceID="pedestrian"
    sourceLayerID="transportation"
    filter={isAccessibleSidewalk}
    layerIndex={80}
    style={styles.sidewalks(maxUphill)}
/>
```

For each layer, we need to filter the vector data to only get the features we want. For example, filtering all the features to only get sidewalks, or filtering to only get inaccessible sidewalks. Then, each of these layers have a unique line style that is defined in `map-styles.js`. You can find more information about defining these styles [here](https://github.com/react-native-mapbox-gl/maps/blob/master/docs/StyleSheet.md).

For the sidewalk layers, you may notice that the map styles for accessible sidewalks is a function. This is because the coloring for the sidewalks differs based on the user's customized uphill incline, which is accessible via the Redux store.

## Pressing on the features

Tapping on, say, a sidewalk, causes a feature card to be displayed, which gives the user information about the sidewalk such as the incline and the name. This information is given by the tile JSON from the `VectorSource` that links to the AccessMap API.

In order to gain this information, we use the `queryRenderedFeaturesAtPoint` function found in `containers/MapView/index.js` when the map is pressed (`_onPress`). We pass the tapping coordinates into `queryRenderedFeaturesAtPoint`, and it returns the features associated with those coordinates, which is fed into the Redux store. The Redux store stores this coordinate and its metadata as `pinLocation` so the `FeatureCard` component can display it to the user.

```js
_onPress = async e => {
    const center = e.geometry.coordinates;
    const {screenPointX, screenPointY} = e.properties;
    const featureCollection = await this._map.queryRenderedFeaturesAtPoint(
            [screenPointX, screenPointY], null, ["sidewalk-press", "crossing-press", "elevator-press"]);

    this.props.placePin({...featureCollection, center});
}
```