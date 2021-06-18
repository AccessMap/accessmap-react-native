import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";

import { MapStyles } from "../../styles";
import { connect } from "react-redux";

import getInclineLimit from "../../utils/get-incline-limit";
import {
  MOBILITY_MODE_WHEELCHAIR,
  MOBILITY_MODE_POWERED,
  MOBILITY_MODE_CANE,
} from "../../constants";

const LayerSidewalks = (props) => {
  var incline = getInclineLimit(
    props.customUphill,
    props.customDownhill,
    props.mobilityMode
  );
  var [maxUphill, maxDownhill] = incline;

  const isSidewalkExpression = ["==", ["get", "footway"], "sidewalk"];

  const accessibleExpression = [
    "<=",
    ["abs", ["*", 100, ["get", "incline"]]],
    maxUphill,
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
        style={MapStyles.sidewalks(maxUphill)}
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

const mapStateToProps = (state) => {
  return {
    mobilityMode: state.mobilityMode,
    customUphill: state.customUphill,
    customDownhill: state.customDownhill,
  };
};

export default connect(mapStateToProps, null)(LayerSidewalks);
