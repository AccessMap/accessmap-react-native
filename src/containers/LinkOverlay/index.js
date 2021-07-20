import React, { Component } from "react";
import {
  View,
  Image,
  NativeModules,
  Switch,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import { Button, Overlay } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Fonts, Views, Position } from "../../styles";
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux';

import AboutOverlay from "./about-overlay";
import ContactOverlay from "./contact-overlay";
import { useImperialSystem, useMetricSystem } from "../../actions";

const { Rakam } = NativeModules;

export const OverlayButton = (props) => {
  return (
    <TouchableOpacity
      style={{ alignItems: "stretch" }}
      disabled={false}
      onPress={props.onPress}
    >
      <Text accessibilityRole="button" style={Fonts.menuItems}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

class LinkOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAbout: false,
      showContact: false,
      trackSettings: false,
    };
  }

  render() {
    return (
      <View style={Views.overlay}>
        <View
          style={{
            marginVertical: 20,
            flexDirection: "row",
            height: 50,
            alignContent: "space-between",
          }}
        >
          <Image
            style={[Position.fullWidthandHeight, { marginRight: 20, flex: 1 }]}
            source={require("../../../assets/accessmap-logo.png")}
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Button
            buttonStyle={{ flex: 1, backgroundColor: "#FFFFFF" }}
            icon={
              <Icon
                name="times"
                size={20}
                color="#555555"
                accessibilityLabel={this.props.t(
                  "Header-close-accessibilityLabel"
                )}
              />
            }
            onPress={this.props.closeDrawer}
          />
        </View>

        <OverlayButton
          text={this.props.t("ABOUT_TEXT")}
          onPress={() => this.setState({ showAbout: true })}
        />
        <OverlayButton
          text={this.props.t("CONTACT_TEXT")}
          onPress={() => this.setState({ showContact: true })}
        />
        <OverlayButton
          text={this.props.t("TUTORIAL")}
          onPress={() => this.props.navigation.push("Tutorials")}
        />

        <View
          style={[
            { flexDirection: "row", alignItems: "center", marginTop: 30 },
          ]}
        >
          <Text style={[{ marginRight: 40 }]}>
            {this.props.t("TRACKING_SETTINGS_TEXT")}
          </Text>
          <Switch
            accessibilityLabel={this.props.t("TRACKING_SETTINGS_TEXT")}
            onValueChange={() => {
              AccessibilityInfo.announceForAccessibility(
                this.state.trackSettings ? 
                this.props.t("NOT_TRACKING") : 
                this.props.t("CURRENTLY_TRACKING")
                );
              Rakam.toggleTracking();
              this.setState({ trackSettings: !this.state.trackSettings });
            }}
            value={this.state.trackSettings}
          />
        </View>

		    <View
          style={[
            { flexDirection: "row", alignItems: "center", marginTop: 30 },
          ]}
        >
          <Text style={[{ marginRight: 40 }]}>
            {this.props.usingMetricSystem ? this.props.t("METRIC_TOGGLE_TEXT"): this.props.t("IMPERIAL_TOGGLE_TEXT")}
          </Text>
          <Switch
            accessibilityLabel={this.props.usingMetricSystem ? this.props.t("METRIC_TOGGLE_TEXT"): this.props.t("IMPERIAL_TOGGLE_TEXT")}
            onValueChange={() => {
              if (this.props.usingMetricSystem) {
                this.props.useImperialSystem();
              } else {
                this.props.useMetricSystem();
              }
            }}
            value={this.props.usingMetricSystem}
          />
        </View>

        <Overlay
          isVisible={this.state.showAbout}
          windowBackgroundColor="rgba(0, 0, 0, 0.5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ showAbout: false })}
          overlayStyle={{ margin: 20, padding: 20 }}
        >
          <AboutOverlay onClose={() => this.setState({ showAbout: false })} />
        </Overlay>

        <Overlay
          isVisible={this.state.showContact}
          windowBackgroundColor="rgba(0, 0, 0, 0.5)"
          width="auto"
          height="auto"
          onBackdropPress={() => this.setState({ showContact: false })}
          overlayStyle={{ margin: 20, padding: 20 }}
        >
          <ContactOverlay
            onClose={() => this.setState({ showContact: false })}
          />
        </Overlay>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usingMetricSystem: state.usingMetricSystem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    useMetricSystem: () => {
      dispatch(useMetricSystem());
    },
    useImperialSystem: () => {
      dispatch(useImperialSystem());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(LinkOverlay));
