import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../styles";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { renderRedDashedLine } from "../../../styles/map-styles";
import { RootState } from "../../../reducers";

const SpeedLegend = (props) => {
  // Props: Max uphill/downhill incline
  let showingUphillColors = useSelector((state: RootState) => 
    state.mobility.showingUphillColors);
  const maxIncline = Math.abs(Math.round(props.maxIncline));
  const colorMap = (showingUphillColors ? 
    Colors.uphillColorMap(maxIncline, maxIncline, maxIncline) : 
    Colors.downhillColorMap(maxIncline, maxIncline, maxIncline));
  
  const { t, i18n } = useTranslation();

  return (
    <View
      accessible={true}
      accessibilityLabel={"Max incline currently at " + maxIncline + " percent out of 15 maximum."}
      style={{
        height: 50,
        margin: 0,
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <View
        importantForAccessibility="no-hide-descendants"
        style={{
          flex: 3,
          marginTop: 3,
          marginLeft: 3,
          marginRight: 3,
          flexDirection: "column",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{ flex: maxIncline, flexDirection: "row", borderWidth: 1 }}
          >
            {[...Array(maxIncline).keys()].map((d) => {
              // min of calculation and 255
              var red = Math.min((d / (maxIncline - 1)) * 255 * 2, 255);
              var green = Math.min(
                ((maxIncline - 1 - d) / (maxIncline - 1)) * 255 * 2,
                255
              );
              return (
                <View
                  key={d}
                  style={{ 
                    flex: 1, 
                    backgroundColor: `${colorMap(d)}`,
                  }}
                />
              );
            })}
          </View>

          <View style={{ flex: 15 - maxIncline, justifyContent: "center" }}>
            {renderRedDashedLine()}
          </View>
        </View>

        <View style={{ flex: 2, flexDirection: "row" }}>
          {[...Array(15).keys()].map((d) => (
            <View
              key={d}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 12 }}>{d}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        importantForAccessibility="no-hide-descendants"
        style={{ flex: 2, flexDirection: "row", justifyContent: "center" }}
      >
        <Text style={{ fontSize: 13 }}>{t("INCLINE_PERCENT_TEXT")}</Text>
      </View>
    </View>
  );
};

export default SpeedLegend;
