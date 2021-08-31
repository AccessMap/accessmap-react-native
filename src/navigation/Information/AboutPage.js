// Contains information about TCAT and AccessMap as well as contact information
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, View } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon, { FA5Style } from "react-native-vector-icons/FontAwesome5";
import { Buttons, Fonts, Views } from "../../styles";
import {
  openLink,
  donateURL,
  wsdotURL,
  escienceURL,
  githubURL,
  taskarURL,
  twitterURL,
  mailURL,
} from "../../constants/urls";

export default function AboutPage({ route, navigation }) {
  const { t, i18n } = useTranslation();

  const iconAndTextRow = (iconLabel, iconName, url, text) => (
    <View style={Views.iconAndText}>
      <Button
        icon={
          <Icon
            accessibilityLabel={iconLabel}
            name={iconName}
            size={35}
            color="black"
          />
        }
        type="clear"
        onPress={() => {
          openLink(url);
        }}
      />
      <TouchableOpacity
        style={Views.overlayText}
        onPress={() => {
          openLink(url);
        }}
      >
        <Text style={[Fonts.p]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{paddingBottom: 40}}>
      <Image
        importantForAccessibility={false}
        style={{width: "100%",}}
        source={require("../../../res/images/accessmap-logo.png")}
        resizeMode="contain"
        resizeMethod="scale"
      />

      {iconAndTextRow(
        t("GITHUB_LOGO_ALT_TEXT"),
        "github",
        githubURL,
        t("GITHUB_TEXT")
      )}
      {iconAndTextRow(
        t("TCAT_LINK_ALT_TEXT"),
        "graduation-cap",
        taskarURL,
        t("UW_TEXT")
      )}
      {iconAndTextRow(
        t("DONATE_ALT_TEXT"),
        "heart",
        donateURL,
        t("DONATE_TEXT")
      )}

      <View style={[Views.iconAndText, {marginTop: 10}]}>
        <TouchableOpacity
          onPress={() => {
            openLink(escienceURL);
          }}
        >
          <Image
            style={Buttons.iconButtons}
            accessibilityLabel={t("ESCIENCE_ALT_TEXT")}
            source={require("../../../res/images/uwescience.jpg")}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openLink(wsdotURL);
          }}
        >
          <Image
            style={Buttons.iconButtons}
            accessibilityLabel={t("WSDOT_ALT_TEXT")}
            source={require("../../../res/images/wsdot.png")}
            resizeMode="stretch"
            resizeMethod="scale"
          />
        </TouchableOpacity>
        <Text style={[{marginLeft: 10, flex: 1, flexWrap: "wrap"}, Fonts.p]}>{t("ORGANIZATIONS_TEXT")}</Text>
      </View>

      {iconAndTextRow(t("TWITTER"), "twitter", twitterURL, t("TWITTER_TEXT"))}

      {iconAndTextRow(t("EMAIL"), "envelope", mailURL, t("EMAIL_TEXT"))}
      
    </View>
  );
}
