// An CustomSlider contains a Slider for which the user may
// adjust the steepness levels of either Uphill or Downhill steepness.
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Slider } from "react-native-elements";

import { setCustomDownhill, setCustomUphill, setMobilityMode, showDownhill, showUphill } from "../../actions";
import { Colors, Fonts } from "../../styles";
import {
  MOBILITY_MODE_CANE,
  MOBILITY_MODE_CUSTOM,
  MOBILITY_MODE_POWERED,
  MOBILITY_MODE_WHEELCHAIR,
} from "../../constants";
import { RootState } from "../../reducers";

export default function CustomSlider(props) {
  let customUphill = useSelector((state: RootState) => state.mobility.customUphill);
  let customDownhill = useSelector((state: RootState) => state.mobility.customDownhill);
  let avoidRaisedCurbs = useSelector(
    (state: RootState) => state.mobility.avoidRaisedCurbs
  );
  let mobilityMode = useSelector((state: RootState) => state.mobility.mobilityMode);

  const getPreferences = (mode) => {
    switch (mode) {
      case MOBILITY_MODE_WHEELCHAIR:
        return [8, 10, 1];
      case MOBILITY_MODE_POWERED:
        return [12, 12, 1];
      case MOBILITY_MODE_CANE:
        return [14, 14, 0];
      default:
        return [customUphill, customDownhill, avoidRaisedCurbs];
    }
  };

  // t("MAX_UPHILL_STEEPNESS_TEXT")
  // props: title, uphill [boolean]
  let incline = useSelector((state: RootState) => {
    if (mobilityMode == MOBILITY_MODE_CUSTOM) {
      return props.uphill ? state.mobility.customUphill : state.mobility.customDownhill;
    }
    const mode = getPreferences(mobilityMode);
    const incline = mode[props.uphill ? 0 : 1];
    return incline;
  });

  const dispatch = useDispatch();
  const minValue = 4;
  const maxValue = 15;
  var nextIncline =
    ((incline + 0.5 - minValue) % (maxValue - minValue + 0.5)) + minValue;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <TouchableOpacity
        style={{ marginBottom: 5 }}
        disabled={mobilityMode != MOBILITY_MODE_CUSTOM}
        onPress={() => {
          dispatch(
            props.uphill
              ? setCustomUphill(nextIncline)
              : setCustomDownhill(nextIncline)
          );
          dispatch(props.uphill ? showUphill() : showDownhill());
        }}
      >
        <Text style={[Fonts.p]}>
          {props.title}: {incline}%
        </Text>
      </TouchableOpacity>
      <Slider
        value={incline}
        onSlidingComplete={(value) => {
          dispatch(
            props.uphill
              ? setCustomUphill(Math.round(value * 10) / 10)
              : setCustomDownhill(Math.round(value * 10) / 10)
          );
          dispatch(props.uphill ? showUphill() : showDownhill());
          dispatch(setMobilityMode(MOBILITY_MODE_CUSTOM));
        }}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={0.5}
        trackStyle={{ height: 15, borderRadius: 20 }}
        minimumTrackTintColor={
          mobilityMode == MOBILITY_MODE_CUSTOM
            ? Colors.primaryColor
            : Colors.grey
        }
        thumbStyle={{ height: 25, width: 25 }}
        thumbTintColor={
          mobilityMode == MOBILITY_MODE_CUSTOM
            ? Colors.primaryColor
            : Colors.grey
        }
      />
    </View>
  );
}
