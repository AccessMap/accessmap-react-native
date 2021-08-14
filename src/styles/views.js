// Stylesheet for all general containers and views in the app.
export const container = {
  flex: 1,
  backgroundColor: "#F5FCFF",
};

// A centered floating card with a white background
export const omnicard = {
  position: "absolute",
  backgroundColor: "#FFFFFF",
  width: "100%",
  flexDirection: "column",
  left: 0,
  top: 0,
  margin: 0,
  padding: 10,
  zIndex: 10,
};

export const bottomCard = {
  position: "absolute", 
  bottom: 0, left: 0, right: 0, 
  width: "100%", margin: 0,
  zIndex: 50
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
  width: "100%",
  height: "100%",
  padding: 20,
};

// Container for the container that holds an icon and text description
// in the About and Contact overlays.
export const overlayIconandText = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  marginVertical: 10,
};

// For the text that appears in the About and Contact cards
export const overlayText = {
  flexDirection: "row",
  flexWrap: "wrap",
  flex: 5,
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

export const searchBarContainer = {
  backgroundColor: "white", color: "white", 
  padding: 0, marginBottom: 5,
  borderBottomColor: 'transparent', borderTopColor: 'transparent'
};

export const searchBarInputContainer = {
  backgroundColor:"#F0F0F0", borderRadius: 10,
};