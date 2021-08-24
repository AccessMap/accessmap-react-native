import React, { useState } from "react";
import { Views, Position } from "../../styles";
import { View, AccessibilityInfo } from "react-native";
import { Card, ButtonGroup } from "react-native-elements";
import IconButton from "../../components/IconButton";
import { useTranslation } from "react-i18next";
import UphillSlider from "../Settings/UphillSlider";
import DownhillSlider from "../Settings/DownhillSlider";
import BarrierSwitch from "../Settings/BarrierSwitch";
import coordinatesToString from "../../utils/coordinates-to-string";
import GeocodeBar from "../../components/GeocodeBar";

import {
  reverseRoute,
  closeDirections,
  closeTripInfo,
  cancelRoute,
} from "../../actions";

import MobilityButtonGroup from "./mobility-buttons";
import { MOBILITY_MODE_CUSTOM } from "../../constants";
import { useDispatch, useSelector } from "react-redux";

export default function OmniCard(props) {
  const { t, i18n } = useTranslation();
  const [customMode, setCustomMode] = useState(false);
  const [customIndex, setCustomIndex] = useState(0);
  const [findDirections, setFindDirections] = useState(false);

  let mobilityMode = useSelector((state: RootState) => state.mobilityMode);
  let pinFeatures = useSelector((state: RootState) => state.pinFeatures);
  let origin = useSelector((state: RootState) => state.origin);
  let destination = useSelector((state: RootState) => state.destination);
  let originText = useSelector((state: RootState) => state.originText);
  let destinationText = useSelector((state: RootState) => state.destinationText);

  const dispatch = useDispatch();
  const cancelAndCloseRoute = () => {
    dispatch(cancelRoute());
    dispatch(closeDirections());
    dispatch(closeTripInfo());
  };

  const customButtons = [
    t("UPHILL_TEXT"),
    t("DOWNHILL_TEXT"),
    t("BARRIERS_TEXT"),
  ];
  const updateCustomIndex = (customIndex) => {
    setCustomIndex(customIndex);
  };
  const toggleCustomMode = () => {
    setCustomMode(!customMode);
  };

  let topRow = null;
  let middleRow = null;
  const bottomRow = (
    <View style={{ flex: 1, flexDirection: "row", marginTop: 5 }}>
      <MobilityButtonGroup />
      {mobilityMode == MOBILITY_MODE_CUSTOM && (
        <View>
          <IconButton
            name="pencil"
            accessibilityLabel="Select to modify custom mobility preferences"
            onPress={toggleCustomMode}
          />
        </View>
      )}
    </View>
  );
  const customModeContainer = (
    <View>
      <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
        <ButtonGroup
          onPress={updateCustomIndex}
          selectedIndex={customIndex}
          buttons={customButtons}
          containerStyle={{ flex: 1, minHeight: 50, minWidth: 50 }}
        />
        <IconButton name="close" onPress={toggleCustomMode} />
      </View>

      {customIndex == 0 ? (
        <UphillSlider />
      ) : customIndex == 1 ? (
        <DownhillSlider />
      ) : (
        <BarrierSwitch />
      )}
    </View>
  );

  // User is in the middle of choosing a route start and end
  if (origin || destination || findDirections) {
    topRow = (
      <View style={[{ flex: 1, flexDirection: "row" }, Position.center]}>
        <GeocodeBar
          accessibilityLabel={t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")}
          navigation={props.navigation}
          type="origin"
          value={
            originText ? originText : origin ? coordinatesToString(origin) : ""
          }
          placeholder={t("GEOCODER_PLACEHOLDER_TEXT_START")}
        />
        <IconButton
          name="close"
          accessibilityLabel="Select to exit route finding"
          onPress={() => {
            cancelAndCloseRoute();
            AccessibilityInfo.announceForAccessibility("Cancelled route.");
            setFindDirections(false);
          }}
        />
      </View>
    );
    middleRow = (
      <View style={[{ flex: 1, flexDirection: "row" }]}>
        <GeocodeBar
          accessibilityLabel={"Enter end address"}
          navigation={props.navigation}
          value={
            destinationText
              ? destinationText
              : destination
              ? coordinatesToString(destination)
              : ""
          }
          type="destination"
          placeholder={t("GEOCODER_PLACEHOLDER_TEXT_END")}
        />
        <IconButton
          accessibilityLabel="Select to reverse route."
          name="swap-vert"
          onPress={() => {
            dispatch(reverseRoute());
            AccessibilityInfo.announceForAccessibility(
              "Start and end locations reversed."
            );
          }}
        />
      </View>
    );
  } else { // unselected route
    topRow = (
      <View style={[{ flex: 1, flexDirection: "row", alignItems: "center" }]}>
        <GeocodeBar
          navigation={props.navigation}
          value={pinFeatures && pinFeatures.text ? pinFeatures.text : ""}
          type="search"
          placeholder={t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")}
        />
        <IconButton
          name="directions"
          accessibilityLabel="Select to look up routes"
          onPress={() => {
            setFindDirections(true);
            AccessibilityInfo.announceForAccessibility(
              "Showing route start and end address selection window."
            );
          }}
        />
      </View>
    );
  }

  // Rendering the entire card and bottom row
  let mainContainer = customMode ? (
    customModeContainer
  ) : (
    <View>
      {topRow}
      {middleRow}
      {bottomRow}
    </View>
  );

  return <Card containerStyle={Views.omnicard}>{mainContainer}</Card>;
}
