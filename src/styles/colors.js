// Represents the colors used on the map
import chroma from "chroma-js";

import { uphillSpeed, downhillSpeed } from "../profiles/cost-function";
import { DIVISOR } from "../constants";

const inclineColorScale = chroma
  .scale(
    [chroma("red"), chroma("yellow"), chroma("lime")].map((c) =>
      c.brighten(1.5)
    )
  )
  .mode("lab");

const SIDEWALK_STEEP = inclineColorScale(0).hex();
const SIDEWALK_MID = inclineColorScale(0.5).hex();
const SIDEWALK_FLAT = inclineColorScale(1).hex();

const colorFromSpeed = (speed, maxSpeed) => {
  const minSpeed = maxSpeed / DIVISOR;
  // Scale to 0-1
  const relativeSpeed = (speed - minSpeed) / (maxSpeed - minSpeed);
  return inclineColorScale(relativeSpeed);
};

const uphillColorMap = (uphillMax, downhillMax, speedMax) => {
  const colorMap = (incline) => {
    const speed = uphillSpeed(incline, uphillMax, downhillMax, speedMax);
    return colorFromSpeed(speed, speedMax);
  };
  return colorMap;
};

const downhillColorMap = (uphillMax, downhillMax, speedMax) => {
  const colorMap = (incline) => {
    const speed = downhillSpeed(incline, uphillMax, downhillMax, speedMax);
    return colorFromSpeed(speed, speedMax);
  };
  return colorMap;
};

export {
  SIDEWALK_FLAT,
  SIDEWALK_MID,
  SIDEWALK_STEEP,
  inclineColorScale,
  colorFromSpeed,
  uphillColorMap,
  downhillColorMap,
};

export const primaryColor = "#0D47A1";
export const primaryLight = "#5C9BFB";
export const grey = "#4E4E4E";
export const greyLight= "#D4D4D4";
export const disabled = {
  color: "#AAAAAA"
};
export const error = "#B30000";
