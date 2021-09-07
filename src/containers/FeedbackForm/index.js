import React, { Component } from "react";
import { Text, View, NativeModules, ScrollView } from "react-native";
import { Button, CheckBox } from "react-native-elements";
import { withTranslation } from "react-i18next";
import { Colors, Fonts } from "../../styles";

import { spreadsheetId, accountId, accountName, keyId, key } from "./secrets";
import { primaryColor } from "../../styles/colors";
import GreyDivider from "../../components/GreyDivider";
const { Rakam, SheetsManager } = NativeModules;

const ZERO_CR = 0;
const ONE_CR = 2;
const TWO_CR = 1;

class FeedbackForm extends Component {
  constructor(props) {
    super(props);
    console.log(props.info);

    this.state = {
      swNotPresent: false,
      swNotPaved: false,
      swSub3Ft: false,
      cxUnsafe: false,
      cxUnmarked: props.info.crossing !== "marked",
      cxCurbramps: props.info.curbramps != 1,
      cxPedSignal: false,
      cxAuditorySignal: false,
      cxTactileSignal: false,
      canPress: true,
    };
  }

  exit = () => {
    this.props.navigation.goBack();
  };

  constructBody = () => {
    const {
      swNotPresent,
      swNotPaved,
      swSub3Ft,
      cxUnsafe,
      cxUnmarked,
      cxCurbramps,
      cxPedSignal,
      cxAuditorySignal,
      cxTactileSignal,
    } = this.state;
    body =
      "The following issues/features has been reported for " +
      this.props.info.description +
      ":\n";
    if (this.props.info.footway == "sidewalk") {
      if (swNotPresent) {
        body += "- Sidewalk is not present\n";
      } else {
        if (swNotPaved) {
          body += "- Sidewalk not paved\n";
        }
        if (swSub3Ft) {
          body += "- Sidewalk below 3 feet at some points\n";
        }
      }
    } else {
      if (cxUnsafe) {
        body += "- This crossing is unsafe\n";
      }
      if (cxUnmarked && this.props.info.crossing == "marked") {
        body += "- This crossing is unmarked\n";
      } else if (cxUnmarked && this.props.info.crossing == "unmarked") {
        body += "- This crossing is marked\n";
      }
      if (cxCurbramps != this.props.info.curbramps) {
        if (cxCurbramps == ZERO_CR) {
          body += "- This crossing has no curbramps\n";
        } else if (cxCurbramps == ONE_CR) {
          body += "- Only one curbramp is present for this crossing\n";
        } else if (cxCurbramps == TWO_CR) {
          body += "- Both curbramps are present for this crossing\n";
        }
      }
      if (cxPedSignal) {
        body += "- This crossing has a pedestrian signal\n";
      }
      if (cxAuditorySignal) {
        body += "- This crossing has an auditory signal\n";
      }
      if (cxTactileSignal) {
        body += "- This crossing has a tactile signal\n";
      }
    }
    return body;
  };

  render() {
    const {
      swNotPresent,
      swNotPaved,
      swSub3Ft,
      cxUnsafe,
      cxUnmarked,
      cxCurbramps,
      cxPedSignal,
      cxAuditorySignal,
      cxTactileSignal,
    } = this.state;

    const CustomCheckbox = (props) => (
      <CheckBox
        title={props.title}
        checked={props.checked}
        onPress={props.onPress}
        containerStyle={{ height: 70, width: "100%", justifyContent: "center"}}
      />
    );

    return (
      <ScrollView style={{ flex: 1 }}>
		  <View style={{marginHorizontal: 15,}}> 
			<Text style={[Fonts.p, { marginTop: 20, marginBottom: 20}]}>
			{this.props.t("CROWDSOURCING_INFO_TEXT")}
			</Text>
			<Text style={[Fonts.h1]}>{this.props.t("ISSUES")}</Text>
		</View>
        {this.props.info.footway == "sidewalk" ? (
          <View style={{ width: "100%", paddingVertical: 10 }}>
            <CustomCheckbox
              title={this.props.t("SIDEWALK_PRESENT_TEXT")}
              checked={swNotPresent}
              onPress={() => this.setState({ swNotPresent: !swNotPresent })}
            />
            <CustomCheckbox
              title={this.props.t("SIDEWALK_PAVED_TEXT")}
              checked={!swNotPresent && swNotPaved}
              textStyle={swNotPresent ? Colors.disabled : {}}
              onPress={() => {
                if (!swNotPresent) {
                  this.setState({ swNotPaved: !swNotPaved });
                }
              }}
            />
            <CustomCheckbox
              title={this.props.t("SIDEWALK_WIDTH_TEXT")}
              checked={swSub3Ft}
              textStyle={swNotPresent ? Colors.disabled : {}}
              onPress={() => {
                if (!swNotPresent) {
                  this.setState({ swSub3Ft: !swSub3Ft });
                }
              }}
            />
          </View>
        ) : (
          <View style={{ width: "100%" }}>
            <CustomCheckbox
              title={this.props.t("CROSSING_SAFE_TEXT")}
              checked={cxUnsafe}
              onPress={() => this.setState({ cxUnsafe: !cxUnsafe })}
            />
            <CustomCheckbox
              title={this.props.t("CROSSING_MARKED_TEXT")}
              checked={cxUnmarked}
              onPress={() => this.setState({ cxUnmarked: !cxUnmarked })}
            />
            <CustomCheckbox
              title={this.props.t("CROSSING_CURBRAMPS_TEXT")}
              checked={cxCurbramps}
              onPress={() => this.setState({ cxCurbramps: !cxCurbramps })}
            />

			<GreyDivider />
			<Text style={[Fonts.h1, {marginLeft: 15}]}>{this.props.t("FEATURES")}</Text>
            <CustomCheckbox
              title={this.props.t("CROSSING_PEDESTRIAN_SIGNAL_TEXT")}
              checked={cxPedSignal}
              onPress={() => this.setState({ cxPedSignal: !cxPedSignal })}
            />
            <CustomCheckbox
              title={this.props.t("CROSSING_AUDITORY_SIGNAL_TEXT")}
              checked={cxAuditorySignal}
              onPress={() =>
                this.setState({ cxAuditorySignal: !cxAuditorySignal })
              }
            />
            <CustomCheckbox
              title={this.props.t("CROSSING_TACTILE_SIGNAL_TEXT")}
              checked={cxTactileSignal}
              onPress={() =>
                this.setState({ cxTactileSignal: !cxTactileSignal })
              }
            />
          </View>
        )}
        <Button
          buttonStyle={{
            backgroundColor: primaryColor,
            paddingVertical: 20,
            borderColor: "white",
          }}
          titleStyle={{ fontSize: 18, color: "white" }}
          type="outline"
          raised={true}
          title={this.props.t("SUBMIT_TEXT")}
          disabled={!this.state.canPress}
          containerStyle={{ marginTop: 20, marginBottom: 40, marginHorizontal: 15 }}
          onPress={() => {
            if (!this.state.canPress) {
              return;
            }
            this.setState({ canPress: false });
            data = "";
            data += new Date().toLocaleString() + "\t";
            data += this.props.info.description + "\t";
            if (this.props.info.footway == "sidewalk") {
              data += !swNotPresent + "\t";
              data += !swNotPaved + "\t";
              data += !swSub3Ft;
              Rakam.trackEvent("SUBMIT_FORM", [
                "footway",
                "sidewalk",
                "description",
                this.props.info.description,
              ]);
              SheetsManager.sendData(
                accountId,
                accountName,
                key,
                keyId,
                spreadsheetId,
                "Sidewalks",
                data
              );
            } else if (this.props.info.footway == "crossing") {
              data += !cxUnsafe + "\t";
              data +=
                !(cxUnmarked ^ (this.props.info.crossing == "marked")) + "\t";
              data += (cxCurbramps == 0 ? 0 : cxCurbramps == 1 ? 2 : 1) + "\t";
              data += cxPedSignal + "\t";
              data += cxAuditorySignal + "\t";
              data += cxTactileSignal;
              Rakam.trackEvent("SUBMIT_FORM", [
                "footway",
                "crossing",
                "description",
                this.props.info.description,
              ]);
              SheetsManager.sendData(
                accountId,
                accountName,
                key,
                keyId,
                spreadsheetId,
                "Crossings",
                data
              );
            }
            this.exit();
          }}
        />
      </ScrollView>
    );
  }
}

export default withTranslation()(FeedbackForm);
