import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, AccessibilityInfo, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { toggleMapTutorial } from "../../actions";
import MenuButton from "../../components/MenuButton";
import { Views } from "../../styles";

export default function InformationPage({ route, navigation }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  return (
    <ScrollView style={Views.scrollView}>
      <FlatList
        data={[{ key: t("MAP_INTERFACE") }, { key: t("ROUTE_PLANNING") }]}
        renderItem={({ item }) => (
          <MenuButton
            text={item.key}
            onPress={() => {
              navigation.pop();
              dispatch(toggleMapTutorial());
              AccessibilityInfo.announceForAccessibility(
                "Showing " + item.key + " Tutorial."
              );
            }}
          />
        )}
      />
    </ScrollView>
  );
}
