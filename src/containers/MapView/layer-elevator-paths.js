import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { MapStyles } from "../../styles";

const LayerElevators = (props) => {
  const elevatorPathFilter = [
    "all",
    ["==", ["get", "subclass"], "footway"],
    ["==", ["get", "elevator"], 1],
  ];

  return (
    <React.Fragment>
      <MapboxGL.LineLayer
        id="elevator-press"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        layerIndex={81}
        filter={elevatorPathFilter}
        style={MapStyles.elevatorPress}
      />
      <MapboxGL.LineLayer
        id="elevator-paths"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        layerIndex={80}
        filter={elevatorPathFilter}
        style={{ ...MapStyles.elevatorPath, ...MapStyles.fadeOut }}
        minZoomLevel={13}
      />
    </React.Fragment>
  );
};

export default LayerElevators;
