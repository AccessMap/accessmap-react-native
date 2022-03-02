import React, { useState } from "react";
import { Views, Buttons } from "../../../styles";
import { View, AccessibilityInfo, useWindowDimensions } from "react-native";
import { Button } from "react-native-elements";
import CustomIcon from "../../atoms/Icon";
import { Card } from "react-native-elements";

import { useTranslation } from "react-i18next";
import coordinatesToString from "../../../utils/coordinates-to-string";
import GeocodeBar from "../GeocodeBar";

import {
  reverseRoute,
  closeDirections,
  closeTripInfo,
  cancelRoute,
  showDownhill,
  showUphill,
} from "../../../actions";

import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../atoms/Button/IconButton";
import { primaryColor } from "../../../styles/colors";
import { RootState } from "../../../reducers";

export default function OmniCard(props) {
  const { t, i18n } = useTranslation();
  const [findDirections, setFindDirections] = useState(false);
  const window = useWindowDimensions();

  //---------------------------------------------------------------------------
  let pinFeatures = useSelector((state: RootState) => state.map.pinFeatures);
  let origin = useSelector((state: RootState) => state.map.origin);
  let destination = useSelector((state: RootState) => state.map.destination);
  let originText = useSelector((state: RootState) => state.map.originText);
  let destinationText = useSelector(
    (state: RootState) => state.map.destinationText
  );
  let uphillMode = useSelector((state: RootState) => 
    state.mobility.showingUphillColors)

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

      <View style={{flexDirection: "row", justifyContent: "space-between", marginHorizontal: 5}}>
        <Button
          buttonStyle={{ backgroundColor: "white"}}
          titleStyle={{color: primaryColor, paddingVertical: 5}}
          containerStyle={[Buttons.whiteButton, 
            {marginTop: 8, borderRadius: 15, paddingHorizontal: 10, paddingTop: 2}]}
          title={uphillMode ? t("UPHILL_TEXT") + " " + t("MODE") : 
            t("DOWNHILL_TEXT") + " " + t("MODE")}
          onPress={() => 
            dispatch(uphillMode ? 
              showDownhill() : showUphill())}
        />

        { window.height > window.width ?
        <Button
          containerStyle={[Buttons.whiteButton, 
            {width: 50, marginTop: 10}]}
          accessibilityLabel={t("INFORMATION")}
          buttonStyle={{ backgroundColor: "white" }}
          icon={<CustomIcon name="information" size={32} color={primaryColor} />}
          onPress={() => props.navigation.push(t("INFORMATION"))}
        /> : null
        }
      </View>
    </View>
  );
}
