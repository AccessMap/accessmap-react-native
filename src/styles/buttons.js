import { primaryColor } from "./colors";

// Stylesheet for all buttons in the app
export const minTouchTargetSize = {
  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
};

// Used for zooming in and out and other map buttons
export const whiteButton = {
  backgroundColor: "white",
  borderRadius: 30,
  padding: 8,
  margin: 5,
};

// pressable icon buttons on the OmniCard
export const iconButton = {
  backgroundColor: "#FFFFFF",
};

// Represents the container holding the map white buttons (zoom...etc)
export const zooms = {
  flex: 1,
  flexDirection: "column",
  position: "absolute",
  right: 0,
  bottom: 0,
  margin: 10,
  zIndex: 20,
};

// For small image icons that link to an external website
export const iconButtons = {
  width: 50,
  height: 50,
};

export const button = {
  borderRadius: 10,
};

export const switches = [
  minTouchTargetSize,
  {
    marginRight: 10,
    color: primaryColor,
  },
];

export const languageOrRegionSwitch = [
  minTouchTargetSize,
  {
    backgroundColor: "#FFFFFF",
    borderColor: "#0000AA",
    borderWidth: 1,
    margin: 5,
  },
];

// To add more button styles, just add:
// export const ___ = { ... };
