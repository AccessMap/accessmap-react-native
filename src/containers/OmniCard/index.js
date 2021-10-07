import React, { useState } from "react";
import { Views, Buttons } from "../../styles";
import { View, AccessibilityInfo } from "react-native";
import { Button } from "react-native-elements";
import CustomIcon from "../../components/Icon";
import { Card } from "react-native-elements";

import { useTranslation } from "react-i18next";
import coordinatesToString from "../../utils/coordinates-to-string";
import GeocodeBar from "../../components/GeocodeBar";

import {
  reverseRoute,
  closeDirections,
  closeTripInfo,
  cancelRoute,
} from "../../actions";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../components/IconButton";
import { primaryColor } from "../../styles/colors";

export default function OmniCard(props) {
  const { t, i18n } = useTranslation();
  const [findDirections, setFindDirections] = useState(false);

  //---------------------------------------------------------------------------
  let pinFeatures = useSelector((state: RootState) => state.pinFeatures);
  let origin = useSelector((state: RootState) => state.origin);
  let destination = useSelector((state: RootState) => state.destination);
  let originText = useSelector((state: RootState) => state.originText);
  let destinationText = useSelector(
    (state: RootState) => state.destinationText
  );

  //---------------------------------------------------------------------------
  const dispatch = useDispatch();
  const cancelAndCloseRoute = () => {
    dispatch(cancelRoute());
    dispatch(closeDirections());
    dispatch(closeTripInfo());
  };

  let topRow = null;
  let middleRow = null;

  // User is in the middle of choosing a route start and end
  if (origin || destination || findDirections) {
    topRow = (
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
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
          size={40}
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
  } else {
    // unselected route
    topRow = (
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
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

  //---------------------------------------------------------------------------
  // Rendering the entire card and bottom row
  return (
    <View 
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        margin: 0,
        flexDirection: "column",
      }}
    >
      <Card containerStyle={Views.omnicard}>
        {
          <View>
            {topRow}
            {middleRow}
          </View>
        }
      </Card>
      <Button
        containerStyle={[Buttons.whiteButton, 
          {width: 50, alignSelf: "flex-end", marginTop: 10}]}
        accessibilityLabel={t("INFORMATION")}
        buttonStyle={{ backgroundColor: "white" }}
        icon={<CustomIcon name="information" size={32} color={primaryColor} />}
        onPress={() => props.navigation.push(t("INFORMATION"))}
      />
    </View>
  );
}
