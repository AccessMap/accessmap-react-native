import React from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import regions from "../../constants/regions";
import { Feature, Position } from "geojson";

const outer_ring = [
  [-180, -90],
  [-180, 90],
  [180, 90],
  [180, -90],
  [-180, -90],
];

const inner_rings = regions.map((feature) => {
  const coords: Position[] = feature.geometry.coordinates[0];
  return coords;
});

const invertedPolygon: Feature = {
  type: "Feature",
  geometry: {
    type: "MultiPolygon",
    coordinates: [[outer_ring, ...inner_rings]],
  },
  properties: {},
};

export default function LayerBoundaries(props) {
  return (
    <React.Fragment>
      <MapboxGL.ShapeSource id="regions-mask" shape={invertedPolygon}>
        <MapboxGL.LineLayer
          id="regions-mask"
          style={{ lineColor: "black", lineWidth: 2 }}
        />
      </MapboxGL.ShapeSource>
    </React.Fragment>
  );
}
