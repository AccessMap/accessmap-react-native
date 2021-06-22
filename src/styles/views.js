import { Position } from "../styles";

// Stylesheet for all general containers and views in the app.
export const container = {
  flex: 1,
  backgroundColor: "#F5FCFF",
};

// A centered floating card with a white background
export const omnicard = {
  position: "absolute",
  justifyContent: "space-evenly",
  backgroundColor: "#FFFFFF",
  flex: 1,
  flexDirection: "column",
  left: 0,
  right: 0,
  top: 0,
  margin: 10,
  zIndex: 10,
};

export const geocoder = {
  flex: 1,
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  margin: 10,
  zIndex: 20,
};

export const map = {
  flex: 1,
};

// any white card that appears over other content
export const overlay = {
  backgroundColor: "white",
  ...Position.fullWidthandHeight,
  padding: 20,
};

export const page = {
  flex: 1,
  backgroundColor: "#F5FCFF",
};

export const searchresult = {
  backgroundColor: "#F5FCFF",
  fontSize: 18,
  padding: 5,
};