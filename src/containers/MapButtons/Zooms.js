import React from "react";
import { PermissionsAndroid, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "../../components/Icon";
import { connect, useDispatch } from "react-redux";

import { locateUser, zoomIn, zoomOut } from "../../actions";
import { Buttons, Colors, Views } from "../../styles";
import { useTranslation } from "react-i18next";

function Zooms(props) {
  const dispatch = useDispatch();
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
      dispatch(locateUser(true));
    }
  };

  const { t, i18n } = useTranslation();

  return (
    <View accessible={true} style={Buttons.zooms}>
      <Button
        raised={true}
        containerStyle={Buttons.whiteButton}
        accessibilityLabel={t("INFORMATION")}
        buttonStyle={{backgroundColor: "white"}}
        icon={<Icon name="information" size={32} color={Colors.primaryColor} />}
        onPress={() => props.navigation.push(t("INFORMATION"))}
      />
      <Button
        raised={true}
        containerStyle={Buttons.whiteButton}
        accessibilityLabel="Find my location"
        buttonStyle={{backgroundColor: "white"}}
        icon={
          <Icon name="crosshairs-gps" size={32} color={Colors.primaryColor} />
        }
        onPress={locateUserPressed}
      />
      <Button
        raised={true}
        containerStyle={Buttons.whiteButton}
        accessibilityLabel="Select to zoom in"
        buttonStyle={{backgroundColor: "white"}}
        icon={<Icon name="plus" size={32} color={Colors.primaryColor} />}
        onPress={props.onZoomInPressed}
      />
      <Button
        raised={true}
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
