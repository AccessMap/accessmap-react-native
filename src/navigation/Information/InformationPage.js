import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, AccessibilityInfo, Text, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import GreyDivider from "../../components/GreyDivider";
import SpeedLegend from "../../components/SpeedLegend";
import MenuButton from "../../components/MenuButton";
import { Fonts, Views } from "../../styles";
import getInclineLimit from "../../utils/get-incline-limit";
import AboutPage from "./AboutPage";

export default function InformationPage({ route, navigation }) {
  let maxIncline = useSelector((state: RootState) => {
    return getInclineLimit(
        state.customUphill,
        state.customDownhill,
        state.mobilityMode
    )[0];
  });
  const { t, i18n } = useTranslation();
  return (
    <ScrollView style={Views.scrollView}>
        <Text style={[Fonts.h2, {marginBottom: 10}]}>{t("MAP_HEAD_6")}</Text>
        <SpeedLegend maxIncline={maxIncline} />

        <GreyDivider/>

        <Text style={[Fonts.h2]}>{"Tutorials"}</Text>
        <FlatList
        data={[{ key: t("MAP_INTERFACE") }, { key: t("ROUTE_PLANNING") }]}
        renderItem={({ item }) => (
          <MenuButton
            text={item.key}
            onPress={() => {
              navigation.push(item.key);
              AccessibilityInfo.announceForAccessibility(
                "Showing " + item.key + " Page."
              );
            }}
          />
        )}
        />

    <GreyDivider/>
    <Text style={[Fonts.h2]}>{t("ABOUT_TEXT")}</Text>
    <AboutPage/>

    </ScrollView>
  );
}
