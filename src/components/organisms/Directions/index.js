// Index for Directions and Direction Cards
import React, { useRef } from "react";
import { AccessibilityInfo, Animated, FlatList, View } from "react-native";
import { useTranslation } from "react-i18next";
import DirectionCard from "./DirectionCard";

import Header from "../../molecules/Header";
import CustomCard from "../../atoms/Card/CustomCard";

const Directions = (props) => {
  const { t, i18n } = useTranslation();
  AccessibilityInfo.announceForAccessibility("Showing Directions screen.");

  const panY = useRef(new Animated.Value(0)).current;

  const content = (
    <View style={{ maxHeight: 350 }}>
      <Header title={t("DIRECTIONS_TEXT")} close={props.close} panY={panY} />
      <FlatList
        onStartShouldSetResponder={() => true}
        onStartShouldSetResponderCapture={() => true}
        onMoveShouldSetResponderCapture={() => true}
        onMoveShouldSetResponder={() => true}
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
        style={{ marginBottom: 5, marginLeft: -20, height: "100%" }}
      />
    </View>
  );

  return (
    <CustomCard
      cardVisible={props.cardVisible}
      dismissCard={props.close}
      content={content}
      panY={panY}
    />
  );
};

export default Directions;
