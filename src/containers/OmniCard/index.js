import React, { Component } from "react";
import { Buttons, Views, Position } from "../../styles";
import {
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button, ButtonGroup, SearchBar } from "react-native-elements";
import Icon from "../../components/Icon";
import React, { Component } from 'react';
import Icon from '../../components/Icon';
import { withTranslation } from 'react-i18next';

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
	closeTripInfo
} from '../../actions';

import MobilityButtonGroup from './mobility-buttons';
import LanguageSwitcher from './language-switcher';
import RegionSwitcher from './region-switcher';

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
    console.log("DEBUG: RENDER OMNICARD");
    const customButtons = [
			this.props.t("UPHILL_TEXT"), 
			this.props.t("DOWNHILL_TEXT"), 
			this.props.t("BARRIERS_TEXT")];
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
    // TODO: X button and directions mode
    if (origin || destination || this.state.findDirections) {
      console.log("\nDEBUG: DIRECTIONS MODE");
      geocodeBarContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
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
            placeholder={this.props.t("GEOCODER_PLACEHOLDER_TEXT_START")}
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
      console.log("\nDEBUG: UNSELECTED MODE");
      geocodeBarContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
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
      console.log("DEBUG: search bar");
      middleRowContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
          <GeocodeBar
            navigation={this.props.navigation}
            value={pinFeatures && pinFeatures.text ? pinFeatures.text : ""}
            type="search"
            placeholder={this.props.t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")}
          />
          <IconButton
            name="directions"
            accessibilityLabel="Select to look up routes"
            onPress={() => this.setState({ findDirections: true })}
          />
        </View>
      );
    } else {
      console.log("DEBUG: DESTINATION MIDDLE TEXT");
      middleRowContents = (
        <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
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
            placeholder={this.props.t("GEOCODER_PLACEHOLDER_TEXT_END")}
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
      console.log("DEBUG: custom mode");
      containerToRender = (
        <View>
          <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
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
      console.log("DEBUG: NOT custom");
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

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(OmniCard));
