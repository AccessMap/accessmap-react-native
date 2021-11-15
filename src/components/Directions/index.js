// Index for Directions and Direction Cards
import React from "react";
import { AccessibilityInfo, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import DirectionCard from "./DirectionCard";

import Header from "../Header";
import CustomCard from "../../containers/CustomCard";

const Directions = (props) => {
  const { t, i18n } = useTranslation();
  AccessibilityInfo.announceForAccessibility("Showing Directions screen.");

  const content = (
    <View style={{maxHeight: 250}}>
      <Header title={t("DIRECTIONS_TEXT")} close={props.close} />
      <FlatList
        data={props.route.routes[0].segments.features}
        renderItem={({ item, index }) => (
          <DirectionCard
            footway={item.properties.footway}
            name={item.properties.description}
            distance={item.properties.length}
            index={index}
            totalSteps={props.route.routes[0].segments.features.length}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginBottom: 5, marginLeft: -20}}
      />
    </View>
  );

  return (
    <CustomCard
      cardVisible={props.cardVisible}
      dismissCard={props.close}
      content={content}
    />
  );
};

export default Directions;
