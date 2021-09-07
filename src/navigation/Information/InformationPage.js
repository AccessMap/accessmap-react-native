import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, AccessibilityInfo, Text, ScrollView } from "react-native";
import GreyDivider from "../../components/GreyDivider";
import MenuButton from "../../components/MenuButton";
import { Fonts, Views } from "../../styles";
import AboutPage from "./AboutPage";

export default function InformationPage({ route, navigation }) {
  const { t, i18n } = useTranslation();
  return (
    <ScrollView style={Views.scrollView}>
        {/* <Text style={[Fonts.h2]}>{"Tutorials"}</Text>
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
        /> */}
    <Text style={[Fonts.h2]}>{t("ABOUT_TEXT")}</Text>
    <AboutPage/>

    </ScrollView>
  );
}
