// Map Styles describe how the sidewalks, crossings, etc should be displayed.
import React from "react";
import { Platform, View } from "react-native";
import { useSelector } from "react-redux";
import { Colors } from "./index";
import { RootState } from "../reducers";

const OUTLINE_WIDTH = 2;

// Represents an incline percentage beyond the maximum on Speed Legend bottom bar
// and Map Legend
export function renderRedDashedLine() {
  return (
    <View
      style={{
        height: 0,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: "red",
        borderStyle: "dashed",
        zIndex: 0,
      }}
    >
      <View
        style={{
          left: -1,
          bottom: 0,
          width: "101%",
          height: 1,
          backgroundColor: "white",
          zIndex: 1,
        }}
      />
    </View>
  );
}

// Returns an object describing the style for a MapboxGL.LineLayer
export const sidewalks = (incline) => { // ex incline: maxUphill
  let showingUphillColors = useSelector((state: RootState) => 
    state.mobility.showingUphillColors);
  const maxIncline = Math.abs(incline);

  const nSamples = 15;
  const nSide = parseInt(nSamples / 2);
  const range = [...Array(nSamples).keys()].map((d) => (d - nSide) / nSide);

  const colorMap = (showingUphillColors ? 
    Colors.uphillColorMap(maxIncline, maxIncline, maxIncline) : 
    Colors.downhillColorMap(maxIncline, maxIncline, maxIncline));

  const inclineSamples = range.map((d) => d * maxIncline);
  const inclineStops = [];
  inclineSamples.map((d) => {
    const color = colorMap(d);
    inclineStops.push(d);
    inclineStops.push(color.hex());
  });

  // https://docs.mapbox.com/mapbox-gl-js/style-spec/expressions/
  // filters for Mapbox GL JS to categorize sidewalk colors.
  const widthRules = [ // changes line width depending on zoom level
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10, 0.1,
    16, 5,
    20, 24,
  ];

  const parameters = {
    lineCap: "round",
    lineWidth: widthRules,
    lineColor: ["interpolate", 
      ["exponential", 1.5],
      ["abs", ["*", 100, ["get", "incline"]]], ...inclineStops,
    ],
  };

  if (Platform.OS === 'ios') { return parameters; }
  parameters.lineColor = [
    "case",
    [">", ["to-number", ["get", "incline"]], maxIncline],
    "#ff0000",
    ["<", ["to-number", ["get", "incline"]], -maxIncline],
    "#ff0000",
    [
      "interpolate",
      ["exponential", 1.5],
      ["abs", ["*", 100, ["get", "incline"]]],
      ...inclineStops,
    ],
  ];
  return parameters;
};

export const sidewalkPress = {
  lineCap: "round",
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    2, //0.1,
    16,
    10, //5,
    20,
    30, //24,
  ],
  lineOpacity: 0.000001,
};

export const sidewalkOutlines = {
    lineCap: "round",
    lineGapWidth: [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      10,
      0.1,
      16,
      5,
      20,
      24,
    ],
    lineWidth: [
      "interpolate",
      ["exponential", 1.5],
      ["zoom"],
      10,
      OUTLINE_WIDTH / 10,
      16,
      OUTLINE_WIDTH / 5,
      20,
      OUTLINE_WIDTH,
    ],
    lineBlur: 0.5,
}

export const inaccessible = {
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    0.05,
    16,
    1,
    20,
    6,
  ],
  lineDasharray: [5, 2],
  lineColor: "red",
};

export const crossing = {
  lineCap: "round",
  lineColor: "#444444",
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10, 0.3, 
    16, 6.0,
    20, 30, 
  ],
};

export const crossingPress = {
  lineCap: "round",
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    1, //0.07,
    16,
    5, //3.5,
    20,
    25, //20,
  ],
  lineOpacity: 0.000001,
};

export const crossingOutline = {
  lineColor: "#EEEEEE",
  lineCap: "round",
  lineGapWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    0.05,
    16,
    2,
    20,
    14,
  ],
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    OUTLINE_WIDTH / 10,
    16,
    OUTLINE_WIDTH / 2,
    20,
    OUTLINE_WIDTH,
  ],
  lineBlur: 0.5,
};

export const crossingUnmarked = {
  lineColor: "#444444",
  lineCap: "round",
  lineGapWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    0.05,
    16,
    2,
    20,
    14,
  ],
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    10,
    OUTLINE_WIDTH / 10,
    16,
    OUTLINE_WIDTH / 5,
    20,
    OUTLINE_WIDTH,
  ],
  lineBlur: 0.5,
};

export const routeFill = {
  lineColor: "#4BF",
  lineCap: "round",
  lineJoin: "round",
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    5,
    16,
    12,
    22,
    92,
  ],
};

export const routeOutline = {
  lineColor: "black",
  lineCap: "round",
  lineJoin: "round",
  lineGapWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    4.7,
    16,
    9.7,
    22,
    92,
  ],
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    0.5,
    16,
    1,
    22,
    1,
  ],
  lineBlur: 0.5,
};

export const elevatorPath = {
  lineColor: "black",
  lineGapWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    0.3,
    16,
    2,
    22,
    20,
  ],
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    0.1,
    16,
    0.6,
    22,
    6,
  ],
};

export const elevatorPress = {
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    0.3,
    16,
    2,
    22,
    20,
  ],
  lineOpacity: 0.000001,
};

export const fadeOut = {
  lineOpacity: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    13,
    0.01,
    14,
    0.4,
    16,
    1.0,
  ],
};

export const jogs = {
  lineColor: "black",
  lineOpacity: 0.6,
  lineWidth: [
    "interpolate",
    ["exponential", 1.5],
    ["zoom"],
    12,
    0.2,
    16,
    3,
    22,
    30,
  ],
  lineCap: "round",
  lineJoin: "round",
  lineDasharray: [1, 2],
};
