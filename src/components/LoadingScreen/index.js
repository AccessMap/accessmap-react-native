import React from "react";
import { Positioning } from "../../styles";
import { View, Text } from "react-native";

const LoadingScreen = (props) => {
  return (
    <View style={[Positioning.center, Positioning.fullWidthandHeight, {position: "absolute"}]}>
      <View>
        <Text>Loading</Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
