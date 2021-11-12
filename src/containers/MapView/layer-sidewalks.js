import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";

import { MapStyles } from "../../styles";
import { useSelector } from "react-redux";
import getInclineLimit from "../../utils/get-incline-limit";
import { RootState } from "../../reducers";

export default function LayerSidewalks(props) {
  let showingUphillColors = useSelector((state: RootState) => 
    state.mobility.showingUphillColors);
  let incline = useSelector((state: RootState) => {
    return getInclineLimit(
        state.mobility.customUphill,
        state.mobility.customDownhill,
        state.mobility.mobilityMode
    )[showingUphillColors ? 0 : 1];
  });
  const maxIncline = Math.abs(incline);

  const isSidewalkExpression = ["==", ["get", "footway"], "sidewalk"];

  const accessibleExpression = [
    "<=",
    ["abs", ["*", 100, ["get", "incline"]]],
    maxIncline,
  ];

  const isAccessibleSidewalk = [
    "all",
    isSidewalkExpression,
    accessibleExpression,
  ];

  return (
    <React.Fragment>
      <MapboxGL.LineLayer
        id="sidewalk-press"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        filter={isSidewalkExpression}
        layerIndex={81}
        style={MapStyles.sidewalkPress}
      />
      <MapboxGL.LineLayer
        id="sidewalk"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        filter={isAccessibleSidewalk}
        layerIndex={80}
        style={MapStyles.sidewalks(incline)}
      />
      <MapboxGL.LineLayer
        id="sidewalk-outline"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        filter={isAccessibleSidewalk}
        layerIndex={80}
        style={{ ...MapStyles.sidewalkOutlines, ...MapStyles.fadeOut }}
        minZoomLevel={13}
      />
      <MapboxGL.LineLayer
        id="sidewalk-inaccessible"
        sourceID="pedestrian"
        sourceLayerID="transportation"
        filter={["!", accessibleExpression]}
        layerIndex={80}
        style={MapStyles.inaccessible}
      />
    </React.Fragment>
  );
};
