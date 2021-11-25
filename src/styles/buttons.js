import { primaryColor } from "./colors";

// Stylesheet for all buttons in the app
export const minTouchTargetSize = {
  transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
};

// Used for zooming in and out and other map buttons
export const whiteButton = {
  backgroundColor: "white",
  borderRadius: 30,
  margin: 5,
  marginTop: 10,
};

// Used in submitting Feedback form
export const submitButtonsContainer = {
  marginTop: 80,
  marginBottom: 10,
  borderRadius: 15,
}

export const submitButtonStyle = {
  backgroundColor: primaryColor,
  paddingVertical: 20,
  borderColor: "white",
  borderRadius: 5,
}

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
  borderRadius: 40,
  paddingHorizontal: 14,
  paddingVertical: 12,
  backgroundColor: primaryColor, 
};

export const switches = {
  marginRight: 10,
  color: primaryColor,
  padding: 10,
};

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
