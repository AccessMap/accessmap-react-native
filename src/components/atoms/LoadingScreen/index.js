// Contains a simple loading wheel which stops and hides automatically when
// the app is not in a loading state.
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { primaryColor } from "../../../styles/colors";

const LoadingScreen = (props) => {
  return (
    <View 
      style={{ position: "absolute", 
        top: "50%",
        width: "100%",
      }}>
      <View>
        <ActivityIndicator 
          animating={props.isLoading}
          color={primaryColor} 
          style={{transform: [{ scale: 3 }]}}/>
      </View>
    </View>
  );
};

export default LoadingScreen;
