// A TutorialPage shows a series of still images of the app, guiding the user through
// main functionalities. Includes a custom tooltip shape.
import React, { useState } from "react";
import { View, Image, AccessibilityInfo, Text, Button } from "react-native";

export default function TutorialPage({ route, navigation }) {
  // states
  // pageNum: represents the page to show corresponding to the step in the walkthrough
  const [pageNum, setCount] = useState(0);

  if (pageNum === 0) {
  }
  return (
    <View style={{ width: "100%" }}>
      <Image
        accessibilityLabel={
          "Search bar located at the top of the app. Gray text inside the bar reads: Enter Address"
        }
        style={{ height: "100%", width: "100%", margin: 0, padding: 0, opacity: 0.5 }}
        source={require("../../assets/tutorial_background.png")}
        resizeMode="contain"
        resizeMethod="scale"
      />

      <View
        style={{
          position: "absolute",
          left: "25%",
          top: "16%",
          width: 30,
          height: 30,
          backgroundColor: "#0F47A1",
          zIndex: 98,
          transform: [{ rotate: "45deg" }],
        }}
      ></View>

      <View
        style={{ position: "absolute", left: "15%", top: "18%", zIndex: 99 }}
      >
        <View
          style={{
            width: 250,
            padding: 15,
            backgroundColor: "#0F47A1",
            borderRadius: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
              Route Planning
            </Text>
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
              1/5
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Find Directions{" "}
          </Text>
          <Text style={{ marginBottom: 20, color: "white" }}>
            Choose a destination by tapping on the map or entering a location via
            the Search Bar.
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 100 }}>
              <Button title="Skip Tour" color="#0F47A1" />
            </View>
            <View style={{ width: 100 }}>
              <Button title="Next" color="#0164FF" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
