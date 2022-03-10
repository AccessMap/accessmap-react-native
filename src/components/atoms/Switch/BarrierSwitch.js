import React from "react";
import { AccessibilityInfo, Platform, Text, View } from "react-native";
import { Switch } from "react-native-elements";
import { setMobilityMode, toggleBarriers } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Buttons, Colors, Fonts } from "../../../styles";
import { greyLight, primaryLight } from "../../../styles/colors";
import { MOBILITY_MODE_CANE, MOBILITY_MODE_CUSTOM } from "../../../constants";
import { RootState } from "../../../reducers";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BarrierSwitch(props) {
  const { t, i18n } = useTranslation();

  let avoidRaisedCurbs = useSelector(
    (state: RootState) => state.mobility.avoidRaisedCurbs
  );
  let mobilityMode = useSelector(
    (state: RootState) => state.mobility.mobilityMode
  );
  const dispatch = useDispatch();
  var raisedCurbStatus = true;

  if (mobilityMode == MOBILITY_MODE_CANE) {
    raisedCurbStatus = false;
  } else if (mobilityMode == MOBILITY_MODE_CUSTOM) {
    raisedCurbStatus = avoidRaisedCurbs;
  }

  const toggleSwitch = () => {
	if (avoidRaisedCurbs) {
		AccessibilityInfo.announceForAccessibility(
		  "Currently not avoiding raised curbs."
		);
	} else {
	AccessibilityInfo.announceForAccessibility(
		"Currently avoiding raised curbs."
	);
	}
	dispatch(setMobilityMode(MOBILITY_MODE_CUSTOM));
	dispatch(toggleBarriers());
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        borderWidth: 0.5,
        borderColor: Colors.grey,
        paddingVertical: (Platform.OS === 'android' ? 0 : 5),
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
	  onPress={() => {dispatch(toggleBarriers())}}
    >
      <Text style={[{ flex: 1 }, Fonts.p]}>{t("AVOID_BARRIERS_TEXT")}</Text>
      <Switch
        accessibilityLabel={t("AVOID_BARRIERS_TEXT")}
        style={[Buttons.switches, { marginRight: 0 }]}
        trackColor={{ false: greyLight, true: Colors.primaryColor }}
        thumbColor={"white"}
        onValueChange={() => {toggleSwitch()}}
        value={raisedCurbStatus}
      />
    </TouchableOpacity>
  );
}
