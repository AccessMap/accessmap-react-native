import React, { Component } from "react";
import { Buttons, Views, Position, Fonts, Colors } from "../../styles";
import {
  View,
  TouchableWithoutFeedback, 
  AccessibilityInfo
} from "react-native";
import { Card, Button, ButtonGroup } from "react-native-elements";
import Icon from "../../components/Icon";
import { useTranslation, withTranslation } from 'react-i18next';
import UphillSlider from "../Settings/UphillSlider";
import DownhillSlider from "../Settings/DownhillSlider";
import BarrierSwitch from "../Settings/BarrierSwitch";
import coordinatesToString from "../../utils/coordinates-to-string";
import { Searchbar } from "react-native-paper";

import { MOBILITY_MODE_CUSTOM } from "../../constants";

import { connect } from "react-redux";
import {
	reverseRoute,
	cancelRoute,
	closeDirections,
	closeTripInfo
} from '../../actions';

import MobilityButtonGroup from './mobility-buttons';

const IconButton = (props) => {
  return (
    <Button
      buttonStyle={{ ...Buttons.iconButton }}
      icon={
        <Icon
          name={props.name}
          size={35}
          color={props.label ? "#EEEEEE" : Colors.grey}
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
  const { t, i18n } = useTranslation();
  return (
    <View style={{ flex: 1, marginRight: 5 }} 
      accessibilityLabel={t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")} 
      accessibilityRole="button">
      <TouchableWithoutFeedback
        onPress={() => props.navigation.push(t("SEARCH"), { type: props.type })}
      >
        <View pointerEvents="box-only" importantForAccessibility="no-hide-descendants">
          <Searchbar
            placeholder={props.placeholder}
            value={props.value}
            editable={false}
            clearIcon={<View></View>}
            style={{borderColor:"white"}}
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
    var topBarContents = <View></View>;
    var middleRowContents = <View></View>;

    // if the user is in the middle of choosing a route start and end
    // TODO: X button and directions mode
    if (origin || destination || this.state.findDirections) {
      topBarContents = (
        <View style={[{ flex: 1, flexDirection: "row"}, Position.center]}>
          <GeocodeBar
            accessibilityLabel={this.props.t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")}
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
              AccessibilityInfo.announceForAccessibility("Cancelled route.");
              this.setState({ findDirections: false });
            }}
          />
        </View>
      );
    } else {
      // unselected route state
      topBarContents = (
        <View style={[{ flex: 1, flexDirection: "row", alignItems: 'center'}]}>
          <GeocodeBar
            navigation={this.props.navigation}
            value={pinFeatures && pinFeatures.text ? pinFeatures.text : ""}
            type="search"
            placeholder={this.props.t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")}
          />
          <IconButton
            name="directions"
            accessibilityLabel="Select to look up routes"
            onPress={() => {
              this.setState({ findDirections: true }); 
              AccessibilityInfo.announceForAccessibility("Showing route start and end address selection window.");
            }}
          />
        </View>
      );
    }

    // UI elements for the middle row of the Omnicard
    if (origin || destination || this.state.findDirections) {
      middleRowContents = (
        <View style={[{ flex: 1, flexDirection: "row" }]}>
          <GeocodeBar
            accessibilityLabel={"Enter end address"}
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
              AccessibilityInfo.announceForAccessibility("Start and end locations reversed.");
            }}
          />
        </View>
      );
    }

    // Rendering the entire card and bottom row
    if (this.state.customMode) {
      containerToRender = (
        <View>
          <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
            <ButtonGroup
              onPress={this.updateCustomIndex}
              selectedIndex={this.state.customIndex}
              buttons={customButtons}
              containerStyle={{ flex: 1, minHeight: 50, minWidth: 50 }}
            />
            <IconButton 
              name="close" 
              onPress={this.toggleCustomMode} />
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
    } else { // not custom mode
      containerToRender = (
        <View>
          {topBarContents}
          {middleRowContents}
          <View style={{ flex: 1, flexDirection: "row", marginTop: 5}}>
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
      <Card containerStyle={Views.omnicard}>
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
