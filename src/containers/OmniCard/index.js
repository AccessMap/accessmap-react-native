import React, { Component } from "react";
import { Buttons, Views, Positioning } from "../../styles";
import {
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button, ButtonGroup, SearchBar } from "react-native-elements";
import Icon from "../../components/Icon";

import Geocoder from "../Geocoder";
import UphillSlider from "../Settings/UphillSlider";
import DownhillSlider from "../Settings/DownhillSlider";
import BarrierSwitch from "../Settings/BarrierSwitch";
import coordinatesToString from "../../utils/coordinates-to-string";

import { MOBILITY_MODE_CUSTOM } from "../../constants";

import { connect } from "react-redux";
import {
  openDrawer,
  reverseRoute,
  cancelRoute,
  closeDirections,
  closeTripInfo,
} from "../../actions";
import {
  GEOCODER_PLACEHOLDER_TEXT_DEFAULT,
  GEOCODER_PLACEHOLDER_TEXT_START,
  GEOCODER_PLACEHOLDER_TEXT_END,
  UPHILL_TEXT,
  DOWNHILL_TEXT,
  BARRIERS_TEXT,
} from "../../utils/translations";

import MobilityButtonGroup from "./mobility-buttons";
import RegionSwitcher from "./region-switcher";

const IconButton = (props) => {
  return (
    <Button
      buttonStyle={{ ...Buttons.iconButton, ...props.style }}
      containerStyle={props.label ? null : { width: 45 }}
      icon={
        <Icon
          name={props.name}
          size={25}
          color={props.label ? "#EEEEEE" : "#555555"}
        />
      }
      title={props.label}
      titleStyle={{ marginLeft: 3, fontSize: 15 }}
      onPress={props.onPress}
      accessibilityLabel={props.accessibilityLabel}
    />
  );
};

const GeocodeBar = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        accessibilityLabel="Enter address"
        onPress={() => props.navigation.push("Search", { type: props.type })}
      >
        <View pointerEvents="box-only">
          <SearchBar
            placeholder={props.placeholder}
            value={props.value}
            lightTheme={true}
            containerStyle={{ backgroundColor: "#EEEEEE", padding: 0 }}
            inputContainerStyle={{ backgroundColor: "#DDDDDD" }}
            inputStyle={{ color: "black", margin: 0, padding: 0, fontSize: 14 }}
            rightIconContainerStyle={{ width: 0, height: 0 }}
            editable={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

class OmniCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customMode: false,
      customIndex: 0,
      findDirections: false,
    };
  }

  updateCustomIndex = (customIndex) => {
    this.setState({ customIndex });
  };

  toggleCustomMode = () => {
    this.setState({ customMode: !this.state.customMode });
  };

  render() {
    const customButtons = [UPHILL_TEXT, DOWNHILL_TEXT, BARRIERS_TEXT];
    const {
      pinFeatures,
      origin,
      destination,
      originText,
      destinationText,
      cancelRoute,
    } = this.props;
    var containerToRender = <View></View>;
    var geocodeBarContents = <View></View>;
    var middleRowContents = <View></View>;

    // if the user is in the middle of choosing a route start and end
    if (this.state.findDirections) {
      geocodeBarContents = (
        <View>
          <GeocodeBar
            navigation={this.props.navigation}
            type="origin"
            value={
              originText
                ? originText
                : origin
                ? coordinatesToString(origin)
                : ""
            }
            placeholder={GEOCODER_PLACEHOLDER_TEXT_START}
          />
          <IconButton
            name="close"
            accessibilityLabel="Select to exit route finding"
            onPress={() => {
              cancelRoute();
              this.setState({ findDirections: false });
            }}
          />
        </View>
      );
    } else {
      // unselected route state
      geocodeBarContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Positioning.center]}>
          <IconButton
            name="menu"
            accessibilityLabel="Select to open drawer menu"
            onPress={this.props.openDrawer}
          />
          <Image
            style={{ flex: 1, height: "70%" }}
            source={require("../../../assets/accessmap-logo.png")}
            resizeMode="center"
            resizeMethod="scale"
          />
          <RegionSwitcher />
        </View>
      );
    }

    // UI elements for the middle row of the Omnicard
    if (!origin && !destination && !this.state.findDirections) {
      middleRowContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Positioning.center]}>
          <GeocodeBar
            navigation={this.props.navigation}
            value={pinFeatures && pinFeatures.text ? pinFeatures.text : ""}
            type="search"
            placeholder={GEOCODER_PLACEHOLDER_TEXT_DEFAULT}
          />
          <IconButton
            name="directions"
            accessibilityLabel="Select to look up routes"
            onPress={() => this.setState({ findDirections: true })}
          />
        </View>
      );
    } else {
      middleRowContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Positioning.center]}>
          <GeocodeBar
            navigation={this.props.navigation}
            value={
              destinationText
                ? destinationText
                : destination
                ? coordinatesToString(destination)
                : ""
            }
            type="destination"
            placeholder={GEOCODER_PLACEHOLDER_TEXT_END}
          />
          <IconButton
            accessibilityLabel="Select to reverse route."
            name="swap-vert"
            onPress={() => {
              this.props.reverseRoute();
            }}
          />
        </View>
      );
    }

    // Rendering the entire card and bottom row
    if (this.state.customMode) {
      containerToRender = (
        <View>
          <View style={[{ flex: 1, flexDirection: "row" }, Positioning.center]}>
            <ButtonGroup
              onPress={this.updateCustomIndex}
              selectedIndex={this.state.customIndex}
              buttons={customButtons}
              containerStyle={{ flex: 1 }}
            />
            <IconButton name="close" onPress={this.toggleCustomMode} />
          </View>

          {this.state.customIndex == 0 ? (
            <UphillSlider />
          ) : this.state.customIndex == 1 ? (
            <DownhillSlider />
          ) : (
            <BarrierSwitch />
          )}
        </View>
      );
    } else {
      containerToRender = (
        <View>
          {geocodeBarContents}
          {middleRowContents}
          <View style={{ flex: 1, flexDirection: "row",  }}>
            <MobilityButtonGroup />
            {this.props.mobilityMode == MOBILITY_MODE_CUSTOM && (
              <View>
                <IconButton
                  name="pencil"
                  accessibilityLabel="Select to modify custom mobility preferences"
                  onPress={this.toggleCustomMode}
                />
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <Card
        ref={(component) => (this.omniCard = component)}
        containerStyle={Views.omnicard}
      >
        {containerToRender}
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mobilityMode: state.mobilityMode,
    pinFeatures: state.pinFeatures,
    origin: state.origin,
    destination: state.destination,
    originText: state.originText,
    destinationText: state.destinationText,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openDrawer: () => {
      dispatch(openDrawer());
    },
    reverseRoute: () => {
      dispatch(reverseRoute());
    },
    cancelRoute: () => {
      dispatch(cancelRoute());
      dispatch(closeDirections());
      dispatch(closeTripInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OmniCard);
