import React from "react";
import { Alert, PermissionsAndroid, Platform, View } from "react-native";
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import { Button } from "react-native-elements";
import Icon from "../../components/Icon";
import { connect, useDispatch } from "react-redux";

import { locateUser, zoomIn, zoomOut } from "../../actions";
import { Buttons, Colors } from "../../styles";
import { useTranslation } from "react-i18next";

function Zooms(props) {
  const dispatch = useDispatch();
  const alertPermissionRequest = () => {
    Alert.alert(
      "Failed to retrieve your current location",
      "Please enable location tracking for AccessMap in your device settings.",
      [
        { text: "OK" }
      ]
    );
  }
  const locateUserPressed = async (e) => {
    if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
        console.log(result);
        check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
          .then((result) => {
            switch (result) {
              case RESULTS.UNAVAILABLE:
                console.log('This feature is not available (on this device / in this context)');
                break;
              case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable');
                alertPermissionRequest();
                break;
              case RESULTS.LIMITED:
                console.log('The permission is limited: some actions are possible');
                break;
              case RESULTS.GRANTED:
                dispatch(locateUser(true));
                break;
              case RESULTS.BLOCKED:
                console.log('The permission is denied and not requestable anymore');
                alertPermissionRequest();
                break;
            }
          })
        .catch(error => console.log(error))
      });
    } else if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "User Location",
          message: "May AccessMap track your current location?",
          buttonNegative: "No",
          buttonPositive: "Yes",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        dispatch(locateUser(true));
      } else { alertPermissionRequest(); }
    }
  };

  const { t, i18n } = useTranslation();

  return (
    <View accessible={true} style={Buttons.zooms}>
      <Button
        containerStyle={Buttons.whiteButton}
        accessibilityLabel="Find my location"
        buttonStyle={{backgroundColor: "white"}}
        icon={
          <Icon name="crosshairs-gps" size={32} color={Colors.primaryColor} />
        }
        onPress={locateUserPressed}
      />
      <Button
        containerStyle={Buttons.whiteButton}
        accessibilityLabel="Select to zoom in"
        buttonStyle={{backgroundColor: "white"}}
        icon={<Icon name="plus" size={32} color={Colors.primaryColor} />}
        onPress={props.onZoomInPressed}
      />
      <Button
        containerStyle={Buttons.whiteButton}
        accessibilityLabel="Select to zoom out"
        buttonStyle={{backgroundColor: "white"}}
        icon={<Icon name="minus" size={32} color={Colors.primaryColor} />}
        onPress={props.onZoomOutPressed}
      />
    </View>
  );
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
