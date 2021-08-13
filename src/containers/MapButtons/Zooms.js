import React, { Component } from "react";
import { PermissionsAndroid, View, AccessibilityInfo } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import Icon from "../../components/Icon";
import { connect } from "react-redux";

import { locateUser, zoomIn, zoomOut } from "../../actions";
import { Buttons, Colors, Views } from "../../styles";

function Zooms(props) {
  const locateUserPressed = async (e) => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "User Location",
        message: "Can AccessMap track your current location?",
        buttonNegative: "No",
        buttonPositive: "Yes",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      locateUser(true);
    }
  };

  return (
    <View accessible={true} style={Buttons.zooms}>
      <Button
        accessibilityLabel="Find my location"
        buttonStyle={Buttons.whiteButton}
        icon={<Icon name="crosshairs-gps" size={20} color={Colors.primaryColor} />}
        onPress={locateUserPressed}
      />
      <Button
        accessibilityLabel="Select to zoom in"
        buttonStyle={[Buttons.whiteButton,]}
        icon={<Icon name="plus" size={20} color={Colors.primaryColor} />}
        onPress={props.onZoomInPressed}
      />
      <Button
        accessibilityLabel="Select to zoom out"
        buttonStyle={[Buttons.whiteButton,]}
        icon={<Icon name="minus" size={20} color={Colors.primaryColor} />}
        onPress={props.onZoomOutPressed}
      />
  </View>);
}

const mapDispatchToProps = (dispatch) => {
  return {
    locateUser: () => {
      dispatch(locateUser(true));
    },
    onZoomInPressed: () => {
      dispatch(zoomIn());
    },
    onZoomOutPressed: () => {
      dispatch(zoomOut());
    },
  };
};

export default connect(null, mapDispatchToProps)(Zooms);
