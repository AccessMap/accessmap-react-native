// Contains information about TCAT and AccessMap as well as contact information
import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutPage({ route, navigation }) {
  const { t, i18n } = useTranslation();

  return (
    <View>
      <Text style={Fonts.h2}>{t("ABOUT_TEXT")}</Text>
      <View>
        <Button
          icon={
            <Icon
              accessibilityLabel={t("GITHUB_LOGO_ALT_TEXT")}
              name="github"
              size={30}
              color="black"
            />
          }
          type="clear"
          onPress={() => {
            openLink(githubURL);
          }}
        />
        <TouchableOpacity
          style={Views.overlayText}
          onPress={() => {
            openLink(githubURL);
          }}
        >
          <Text style={Fonts.p}>{t("GITHUB_TEXT")}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button
          icon={
            <Icon
              name="graduation-cap"
              accessibilityLabel={t("TCAT_LINK_ALT_TEXT")}
              size={30}
              color="black"
            />
          }
          type="clear"
          containerStyle={{ flex: 2 }}
          onPress={() => {
            openLink(taskarURL);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            openLink(taskarURL);
          }}
        >
          <Text style={Fonts.p}>{t("UW_TEXT")}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            openLink(escienceURL);
          }}
          style={Buttons.iconButtons}
        >
          <Image
            accessibilityLabel={t("ESCIENCE_ALT_TEXT")}
            style={{ flex: 1, width: "70%", height: "50%" }}
            source={require("../../../res/images/uwescience.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            openLink(wsdotURL);
          }}
          style={Buttons.iconButtons}
        >
          <Image
            accessibilityLabel={t("WSDOT_ALT_TEXT")}
            style={{ flex: 1, width: "70%", height: "50%" }}
            source={require("../../../res/images/wsdot.png")}
            resizeMode="contain"
            resizeMethod="scale"
          />
        </TouchableOpacity>
        <Text style={[Fonts.p, Views.overlayText]}>
          {t("ORGANIZATIONS_TEXT")}
        </Text>
      </View>

      <View>
        <Button
          icon={
            <Icon
              name="heart"
              accessibilityLabel={t("DONATE_ALT_TEXT")}
              size={30}
              color="red"
            />
          }
          type="clear"
          containerStyle={{ flex: 2 }}
          onPress={() => {
            openLink(donateURL);
          }}
        />
        <TouchableOpacity
          style={Views.overlayText}
          onPress={() => {
            openLink(donateURL);
          }}
        >
          <Text style={Fonts.p}>{t("DONATE_TEXT")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
