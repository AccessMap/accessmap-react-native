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
  toggleMobilityProfile,
  toggleRouteTutorial,
} from "../../actions";
import GreyDivider from "../../components/atoms/GreyDivider";
import MenuButton from "../../components/atoms/Button/MenuButton";
import SpeedLegend from "../../components/molecules/SpeedLegend";
import { Fonts, Views } from "../../styles";
import getInclineLimit from "../../utils/get-incline-limit";
import Collapsible from "react-native-collapsible";
import { RootState } from "../../reducers";

export default function InformationPage({ route, navigation }) {
  let showingUphillColors = useSelector(
    (state: RootState) => state.mobility.showingUphillColors
  );
  let maxIncline = useSelector((state: RootState) => {
    return getInclineLimit(
      state.mobility.customUphill,
      state.mobility.customDownhill,
      state.mobility.mobilityMode
    )[showingUphillColors ? 0 : 1];
  });
  let mobilityProfileShowing = useSelector(
    (state: RootState) => state.mobility.viewingMobilityProfile
  );

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const ColorsSection = (
    <View style={{ marginBottom: 15 }}>
      <Text style={[Fonts.h2, { marginBottom: 5, marginTop: 10 }]}>
        {t("SIDEWALK_COLORS")}
      </Text>
      <Text style={[Fonts.p]}>{t("SIDEWALK_COLORS_EXPLANATION")}</Text>
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
          {t("MILD_INCLINE_TEXT")}
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
          {t("MODERATE_INCLINE_TEXT")}
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
          {t("SIGNIFICANT_INCLINE_TEXT")}
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
          {t("INACCESSIBLE_INCLNE")}
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

  const startTutorial = (tutorialName) => {
    navigation.pop();
    dispatch(cancelRoute());
    dispatch(closeTripInfo());
    dispatch(closeDirections());
    if (mobilityProfileShowing) {
      dispatch(toggleMobilityProfile());
    }
    AccessibilityInfo.announceForAccessibility(
      "Showing " + tutorialName + " Tutorial."
    );
  }

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
        <MenuButton
          text={t("MAP_INTERFACE")}
          onPress={() => {
            dispatch(toggleMapTutorial());
            startTutorial(t("MAP_INTERFACE"));
          }}
        />
        <MenuButton
          text={t("ROUTE_PLANNING")}
          onPress={() => {
            dispatch(toggleRouteTutorial());
            startTutorial(t("ROUTE_PLANNING"))
          }}
        />
        <View style={{ height: 200 }} />
      </Collapsible>
    </ScrollView>
  );
}
