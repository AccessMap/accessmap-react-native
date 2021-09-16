import React from "react";
import { useTranslation } from "react-i18next";
import { FlatList, AccessibilityInfo, ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { cancelRoute, closeDirections, closeTripInfo, toggleMapTutorial, toggleRouteTutorial } from "../../actions";
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
              if (item.key == t("MAP_INTERFACE")) {
                dispatch(toggleMapTutorial());
              } else {
                dispatch(toggleRouteTutorial());
              }
              dispatch(closeTripInfo());
              dispatch(closeDirections());
              dispatch(cancelRoute());
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
