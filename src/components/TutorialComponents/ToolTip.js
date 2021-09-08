//------------------------------------------------------------------------------------------
// Custom tooltip used in tutorial onboarding screens
import React from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { toggleMapTutorial } from "../../actions";
import {Fonts} from "../../styles";
import { primaryColor, primaryColor2, primaryLight, primaryLight2 } from "../../styles/colors";

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
  }) {

  // TODO: see accesssibility.md
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

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
            <View style={{ width: 100 }}>
              <Button
                buttonStyle={{backgroundColor: numStep == 0 ? primaryColor2 : primaryColor}}
                title={numStep == 0 ? t("END_TOUR") : t("BACK")}
                onPress={() => {
                  if (numStep == 0) {
                    dispatch(toggleMapTutorial());
                  } else {
                    goToNextStep(numStep - 1);
                  }
                }}
              />
            </View>
            <View style={{ width: 100}}>
              <Button
                raised={true}
                buttonStyle={{backgroundColor: primaryLight}}
                title={(numStep < maxStep - 1) ? t("NEXT_TEXT") : t("END_TOUR") }
                onPress={() => { 
                  if (numStep >= maxStep - 1) { // the last step
                    dispatch(toggleMapTutorial()); // turn off the map tutorial
                  } else {
                    goToNextStep(numStep + 1);
                  }
                }}
              />
            </View>
          </View>

          { numStep < maxStep - 1 && numStep > 0 ?
          <Button
            raised={true}
            buttonStyle={{backgroundColor: primaryColor2}}
            containerStyle={{marginTop: 10}}
            title={t("END_TOUR")}
            onPress={() => { 
              dispatch(toggleMapTutorial()); // turn off the map tutorial
            }}
          /> : null}
        </View>
      </View>
    </View>
  );
}
