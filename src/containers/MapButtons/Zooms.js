import React from "react";
import { PermissionsAndroid, View } from "react-native";
import { Button } from "react-native-elements";
import Icon from "../../components/Icon";
import { connect } from "react-redux";

import { locateUser, zoomIn, zoomOut } from "../../actions";
import { Buttons, Colors, Views } from "../../styles";
import { useTranslation } from "react-i18next";

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

  const { t, i18n } = useTranslation();

  return (
    <View accessible={true} style={Buttons.zooms}>
      <Button
        accessibilityLabel={"Tutorial"}
        buttonStyle={Buttons.whiteButton}
        icon={<Icon name="information" size={30} color={Colors.primaryColor} />}
        onPress={() => props.navigation.push(t("TUTORIAL"))}
      />
      <Button
        accessibilityLabel="Find my location"
        buttonStyle={Buttons.whiteButton}
        icon={
          <Icon name="crosshairs-gps" size={30} color={Colors.primaryColor} />
        }
        onPress={locateUserPressed}
      />
      <Button
        accessibilityLabel="Select to zoom in"
        buttonStyle={[Buttons.whiteButton]}
        icon={<Icon name="plus" size={30} color={Colors.primaryColor} />}
        onPress={props.onZoomInPressed}
      />
      <Button
        accessibilityLabel="Select to zoom out"
        buttonStyle={[Buttons.whiteButton]}
        icon={<Icon name="minus" size={30} color={Colors.primaryColor} />}
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
