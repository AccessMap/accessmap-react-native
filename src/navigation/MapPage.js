import React, { Component } from "react";
import { Drawer } from "native-base";
import { View, Dimensions, Alert, AccessibilityInfo } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";

import getInclineLimit from "../utils/get-incline-limit";
import { closeDrawer, closeDirections, closeTripInfo } from "../actions";
import { Views } from "../styles";

import MapView from "../containers/MapView";
import LoadingScreen from "../components/LoadingScreen";
import SpeedLegend from "../components/SpeedLegend";
import Zooms from "../containers/MapButtons/Zooms";
import OmniCard from "../containers/OmniCard";
import SideMenu from "../containers/SideMenu";
import FeatureCard from "../containers/FeatureCard";
import RouteBottomCard from "../containers/RouteBottomCard";

import Directions from "../components/Directions";
import TripInfo from "../components/TripInfo";

// import { useTranslation } from 'react-i18next';
// import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

class MapPage extends Component {
  static navigationOptions = { title: "Map", header: null };

  constructor(props) {
    super(props);
    this.state = {
      screenWidth: Math.round(Dimensions.get("window").width),
    };
    this.onLayout = this.onLayout.bind(this);
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your connection to the internet to use AccessMap.",
          [
            { text: "OK" }
          ]
        );
      }
    });
  }

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) { Alert.alert("You are offline!");}
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.openDrawer && this.props.openDrawer) {
      this.openDrawer();
    }
  }

  closeDrawer() {
    AccessibilityInfo.announceForAccessibility("Drawer menu is closed");
    this.drawer._root.close();
    this.props.closeDrawer();
  }
  openDrawer() {
    this.drawer._root.open();
  }
  onLayout(e) {
    this.setState({
      screenWidth: Math.round(Dimensions.get("window").width),
    });
  }
  render() {
    AccessibilityInfo.announceForAccessibility("Showing Map View.");
    return (
      <View style={{ flex: 1 }} onLayout={this.onLayout}>
        <Drawer
          // ref={(ref) => {
          //   this.drawer = ref;
          // }}
          style={{
            drawer: {
              shadowColor: "#000000",
              shadowOpacity: 0.8,
              shadowRadius: 3,
            },
            main: { paddingLeft: 3 },
          }}
          content={
            <SideMenu 
              closeDrawer={() => this.closeDrawer()} 
              navigation={this.props.navigation}
            />
          }
          onClose={() => this.closeDrawer()}
        >
          <View style={Views.page}>
            <View
              importantForAccessibility={
                this.props.openDrawer ? "no-hide-descendants" : "yes"
              }
              style={Views.container}
            >
              <View style={{ flex: 1 }}> 
                <View
                  importantForAccessibility={
                    this.props.route ? "no-hide-descendants" : "yes"
                  }
                  style={{ flex: 1 }}
                >
                  <MapView/>
                </View>
                {!this.props.viewingDirections &&
                  !this.props.viewingTripInfo && (
                    <OmniCard navigation={this.props.navigation} />
                  )}
                <Zooms />
              </View>
              
              <SpeedLegend maxIncline={this.props.maxIncline} />

              {this.props.isLoading && <LoadingScreen />}
              {this.props.pinFeatures && (
                <FeatureCard navigation={this.props.navigation} />
              )}
              {this.props.route && <RouteBottomCard />}
              {this.props.viewingDirections && (
                <Directions
                  route={this.props.route}
                  close={() => this.props.closeDirections()}
                />
              )}
              {this.props.viewingTripInfo && (
                <TripInfo
                  route={this.props.route}
                  close={() => this.props.closeTripInfo()}
                />
              )}
            </View>
          </View>
        </Drawer>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    openDrawer: state.openDrawer,
    pinFeatures: state.pinFeatures,
    route: state.route,
    viewingDirections: state.viewingDirections,
    viewingTripInfo: state.viewingTripInfo,
    isLoading: state.isLoading,
    maxIncline: getInclineLimit(
      state.customUphill,
      state.customDownhill,
      state.mobilityMode
    )[0],
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    closeDrawer: () => {
      dispatch(closeDrawer());
    },
    closeDirections: () => {
      dispatch(closeDirections());
    },
    closeTripInfo: () => {
      dispatch(closeTripInfo());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
