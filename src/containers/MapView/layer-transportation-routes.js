import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { MapStyles } from "../../styles";

const testGeoJSON = require("../../../res/geojson/king_county_metro.geojson")

const LayerTransportationRoutes = (props) => {
  return (
    <React.Fragment>
      <MapboxGL.ShapeSource id="transportation-mask" shape={testGeoJSON}>
        <MapboxGL.LineLayer
          id="transport-route"
          style={MapStyles.transportation_routes}
        />
      </MapboxGL.ShapeSource>
    </React.Fragment>
  );
};

export default LayerElevators;
