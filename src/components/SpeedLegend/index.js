import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../styles";
import { useTranslation } from "react-i18next";

const SpeedLegend = (props) => {
  // Props: Max uphill incline
  const maxIncline = Math.round(props.maxIncline);
  const colorMap = Colors.uphillColorMap(maxIncline, maxIncline, maxIncline);
  const { t, i18n } = useTranslation();

  // Represents an incline percentage beyond the maximum on Speed Legend bottom bar
  function renderRedDashedLine() {
    return (
      <View
        style={{
          height: 0,
          borderRadius: 1,
          borderWidth: 1,
          borderColor: "red",
          borderStyle: "dashed",
          zIndex: 0,
        }}
      >
        <View
          style={{
            position: "absolute",
            left: -1,
            bottom: 0,
            width: "101%",
            height: 1,
            backgroundColor: "white",
            zIndex: 1,
          }}
        />
      </View>
    );
  }

  return (
    <View
      accessible={true}
      accessibilityLabel={"Max incline at " + maxIncline + " percent"}
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
