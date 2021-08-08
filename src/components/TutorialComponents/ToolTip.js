//------------------------------------------------------------------------------------------
// Custom tooltip used in tutorial onboarding screens
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text, Button, } from "react-native";
import {Fonts} from "../../styles";

export default function ToolTip({
    cardDescription, // [string] generally describes the card (ex: Route Planning)
    numStep, // [int] current step from 0
    maxStep, // [int] how many total steps there are
    toolTipPositionLeft, // [string] percentage from the left boundary of the screen
    toolTipPositionTop, // [string] percentage from the top boundary of the screen
    arrowPositionLeft,
    arrowPositionTop,
    heading, // [string] bold heading text
    paragraph, // [string] smaller detail text
    goToNextStep, // [function] executed when pressing the 'Next'/'End' Button
    navigation, // [navigation] ability to close the current screen
  }) {

  // TODO: see accesssibility.md
  const { t, i18n } = useTranslation();

  return (
    <View style={{
        position:"absolute", 
        left: toolTipPositionLeft,
        top: toolTipPositionTop,
    }}>
        
      <View // tooltip arrow
        accessible={false}
        style={{
          position: "relative",
          left: arrowPositionLeft,
          top: arrowPositionTop,
          width: 30,
          height: 30,
          backgroundColor: '#0F47A1',
          zIndex: 98,
          transform: [{ rotate: "45deg" }],
        }}
      ></View>

      <View // tooltip rectangle box
        style={{ 
            position: "absolute", 
            zIndex: 99 
        }}
      >
        <View
          style={{
            width: 250,
            padding: 15,
            backgroundColor: '#0F47A1',
            borderRadius: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
              { cardDescription }
            </Text>
            <Text style={{ color: "#E6E6E6", fontSize: 12, marginBottom: 10 }}>
                {numStep + 1}{"/"}{maxStep}
            </Text>
          </View>
          <Text
            // ref={viewRef}
            style={[Fonts.h1, {
              color: "white",
              fontSize: 20,
              marginBottom: 10,
            }]}
          >
            {heading}
          </Text>
          <Text style={[Fonts.p, { marginBottom: 20, color: "white" }]}>
            { paragraph }
          </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ width: 100, opacity: (numStep > 0) ? 1.0 : 0.0 }}>
              <Button
                disabled={(numStep == 0)}
                title={t("BACK")}
                color='#0F47A1'
                onPress={() => goToNextStep(numStep - 1)}
              />
            </View>
            <View style={{ width: 100}}>
              <Button
                title={(numStep < maxStep - 1) ? t("NEXT_TEXT") : t("END_TOUR") }
                color='#0164FF'
                onPress={() => { 
                  if (numStep >= maxStep - 1) {
                    navigation.goBack();
                  } else {
                    goToNextStep(numStep + 1);
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
