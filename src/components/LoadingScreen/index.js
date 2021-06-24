import React from "react";
import { Position } from "../../styles";
import { View, Text } from "react-native";

const LoadingScreen = (props) => {
  return (
    <View style={[Position.center, Position.fullWidthandHeight, {position: "absolute"}]}>
      <View>
        <Text>Loading</Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
