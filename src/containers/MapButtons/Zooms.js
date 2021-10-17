// The Zooms buttons include the buttons on the bottom right of the map
// that control map zooming, the Find My Location button, and the Customize Profile
// button that brings up the Mobility Profile card.
import React from "react";
import { AccessibilityInfo, Alert, PermissionsAndroid, Platform, View } from "react-native";
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import { Button, Icon as RNEIcon } from "react-native-elements";
import Icon from "../../components/Icon";
import { connect, useDispatch, useSelector } from "react-redux";

import { locateUser, toggleMobilityProfile, zoomIn, zoomOut } from "../../actions";
import { Buttons, Colors } from "../../styles";
import { useTranslation } from "react-i18next";
import { RootState } from "../../reducers";

function Zooms(props) {
  let viewingMobilityProfile = useSelector((state: RootState) => 
    state.mobility.viewingMobilityProfile);

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
        // console.log(result);
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
    <View style={Buttons.zooms} pointerEvents="box-none">
      <View style={{ alignSelf: "flex-end" }}>
        <Button
          title=""
          containerStyle={[Buttons.whiteButton]}
          accessibilityLabel="Find my location"
          buttonStyle={{backgroundColor: "white"}}
          icon={
            <Icon name="crosshairs-gps" size={32} color={Colors.primaryColor} />
          }
          onPress={locateUserPressed}
        />
        <Button
          title=""
          containerStyle={Buttons.whiteButton}
          accessibilityLabel="Select to zoom in"
          buttonStyle={{backgroundColor: "white"}}
          icon={<Icon name="plus" size={32} color={Colors.primaryColor} />}
          onPress={props.onZoomInPressed}
        />
        <Button
          title=""
          containerStyle={Buttons.whiteButton}
          accessibilityLabel="Select to zoom out"
          buttonStyle={{backgroundColor: "white"}}
          icon={<Icon name="minus" size={32} color={Colors.primaryColor} />}
          onPress={props.onZoomOutPressed}
        />
      </View>

      <Button 
        containerStyle={Buttons.whiteButton}
        buttonStyle={{backgroundColor: "white", 
          paddingHorizontal: 10, paddingVertical: 12}}
        titleStyle={{color: Colors.primaryColor, marginStart: 5}}
        title={"Modify Profile"}
        icon={<RNEIcon
          size={20}
          color={Colors.primaryColor}
          name="pencil"
          type="material-community"
        />}
        onPress={() => {
          if (viewingMobilityProfile) {
            AccessibilityInfo.announceForAccessibility("Closed Mobility Profile.");
          }
          dispatch(toggleMobilityProfile())
        }}
        accessibilityLabel={"Select to modify mobility preferences. " + 
            "Mobility Profile currently " + (viewingMobilityProfile ? "open" : "closed")}
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
