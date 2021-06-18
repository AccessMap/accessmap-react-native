// Stylesheet for all buttons in the app

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

// To add more button styles, just add:
// export const ___ = { ... };
