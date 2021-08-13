// Stylesheet for all buttons in the app
export const minTouchTargetSize = {
  transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
};

// Used for zooming in and out and other map buttons
export const whiteButton = {
  backgroundColor: "white",
  borderRadius: 30,
  paddingTop: 15,
  paddingRight: 15,
  paddingBottom: 15,
  paddingLeft: 15,
  margin: 5,
};

// pressable icon buttons on the OmniCard
export const iconButton = {
  backgroundColor: "#FFFFFF",
  borderRadius: 20,
  marginTop: 5,
  marginRight: 5,
  height: 40,
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
  flex: 1,
  width: "50%",
  marginHorizontal: 0,
};

export const mobilityButton = {
  borderRadius: 10,
  marginTop: 5,
  height: 40,
};

export const switches = [
  minTouchTargetSize,
  {
    padding: 20,
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
