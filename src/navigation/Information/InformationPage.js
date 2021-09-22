import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  AccessibilityInfo,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelRoute,
  closeDirections,
  closeTripInfo,
  toggleMapTutorial,
  toggleRouteTutorial,
} from "../../actions";
import GreyDivider from "../../components/GreyDivider";
import MenuButton from "../../components/MenuButton";
import SpeedLegend from "../../components/SpeedLegend";
import { Fonts, Views } from "../../styles";
import getInclineLimit from "../../utils/get-incline-limit";
import Collapsible from "react-native-collapsible";

export default function InformationPage({ route, navigation }) {
  let showingUphillColors = useSelector(
    (state: RootState) => state.showingUphillColors
  );
  let maxIncline = useSelector((state: RootState) => {
    return getInclineLimit(
      state.customUphill,
      state.customDownhill,
      state.mobilityMode
    )[showingUphillColors ? 0 : 1];
  });
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const ColorsSection = (
    <View style={{ marginBottom: 15 }}>
      <Text style={[Fonts.h2, { marginBottom: 5, marginTop: 10 }]}>
        {t("SIDEWALK_COLORS")}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={"A bright green line representing flat incline."}
      >
        <View
          style={{
            flex: 1,
            height: 5,
            backgroundColor: "#63FF59",
            borderRadius: 10,
            marginRight: 15,
          }}
        />
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Flat Incline"}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={
          "A bright yellow line representing moderate incline."
        }
      >
        <View
          style={{
            flex: 1,
            height: 5,
            backgroundColor: "#FFEE54",
            borderRadius: 10,
            marginRight: 15,
          }}
        />
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Moderate Incline"}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={
          "A bright red line representing significant incline."
        }
      >
        <View
          style={{
            flex: 1,
            height: 5,
            backgroundColor: "#FF8040",
            borderRadius: 10,
            marginRight: 15,
          }}
        />
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Significant Incline"}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={
          "A dotted red line representing inaccessible paths given the current Mobility Profile Setting"
        }
      >
        <View
          style={{
            height: 0,
            borderRadius: 1,
            borderWidth: 1,
            borderColor: "red",
            borderStyle: "dashed",
            zIndex: 0,
            flex: 1,
          }}
        >
          <View
            style={{
              left: -1,
              bottom: 0,
              width: "101%",
              height: 1,
              backgroundColor: "white",
              zIndex: 1,
            }}
          />
        </View>
        <Text
          style={[
            Fonts.p,
            { flex: 3, marginBottom: 5, marginTop: 10, marginLeft: 15 },
          ]}
        >
          {"Inaccessible (with current Mobility Profile Setting)"}
        </Text>
      </View>
      <SpeedLegend maxIncline={maxIncline} />
    </View>
  );

  const FeaturesSection = (
    <View>
      <Text style={[Fonts.h2, { marginBottom: 5, marginTop: 10 }]}>
        {t("Other Features")}
      </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={
          "A thick black line with a white line on the inside representing Marked Crossings."
        }
      >
        <View style={{ flex: 1, marginRight: 15, height: 15 }}>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: "black",
              borderColor: "black",
              borderRadius: 10,
            }}
          />
          <View
            style={{
              position: "absolute",
              zIndex: 2,
              left: 1,
              right: 1,
              bottom: 3,
              top: 3,
              borderRadius: 10,
              borderColor: "white",
              borderWidth: 1,
            }}
          />
        </View>
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Marked Crossing"}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={
          "A rounded white rectangle with a thin black border representing Unmarked Crossings."
        }
      >
        <View
          style={{
            flex: 1,
            height: 15,
            borderRadius: 10,
            borderColor: "black",
            borderWidth: 2,
            marginRight: 15,
          }}
        />
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Unmarked Crossing"}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
        accessibilityLabel={"A thin black double line representing Elevators."}
      >
        <View
          style={{
            flex: 1,
            height: 15,
            borderColor: "black",
            borderWidth: 1,
            borderStartWidth: 0,
            borderEndWidth: 0,
            marginRight: 15,
          }}
        />
        <Text style={[Fonts.p, { flex: 3, marginBottom: 5, marginTop: 10 }]}>
          {"Elevator"}
        </Text>
      </View>
    </View>
  );

  const [collapsedFirst, setCollapsedFirst] = useState(true);
  const [collapsedSecond, setCollapsedSecond] = useState(true);

  return (
    <ScrollView style={Views.scrollView}>
      <TouchableOpacity
        onPress={() => {
          setCollapsedFirst(!collapsedFirst);
          AccessibilityInfo.announceForAccessibility(
            collapsedFirst
              ? "Map Legend section has been maximized."
              : "Map Legend section has been collapsed."
          );
        }}
        accessibilityRole="button"
      >
        <Text style={[Fonts.h1, { marginBottom: 5, marginTop: 10 }]}>
          {t("MAP_HEAD_6")}
        </Text>
      </TouchableOpacity>

      <Collapsible collapsed={collapsedFirst}>
        {ColorsSection}
        {FeaturesSection}
      </Collapsible>

      <GreyDivider />

      <TouchableOpacity
        onPress={() => {
          setCollapsedSecond(!collapsedSecond);
          AccessibilityInfo.announceForAccessibility(
            collapsedSecond
              ? "Tutorials section has been maximized."
              : "Tutorials section has been collapsed."
          );
        }}
        accessibilityRole="button"
      >
        <Text style={[Fonts.h1, { marginBottom: 5, marginTop: 10 }]}>
          {t("TUTORIAL")}
        </Text>
      </TouchableOpacity>

      <Collapsible collapsed={collapsedSecond}>
        <FlatList
          data={[{ key: t("MAP_INTERFACE") }, { key: t("ROUTE_PLANNING") }]}
          renderItem={({ item }) => (
            <MenuButton
              text={item.key}
              onPress={() => {
                navigation.pop();
                if (item.key == t("MAP_INTERFACE")) {
                  dispatch(toggleMapTutorial());
                } else {
                  dispatch(toggleRouteTutorial());
                }
                dispatch(cancelRoute());
                dispatch(closeTripInfo());
                dispatch(closeDirections());
                AccessibilityInfo.announceForAccessibility(
                  "Showing " + item.key + " Tutorial."
                );
              }}
            />
          )}
        />
        <View style={{ height: 200 }} />
      </Collapsible>
    </ScrollView>
  );
}
