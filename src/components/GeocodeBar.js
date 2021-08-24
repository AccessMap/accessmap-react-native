import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableWithoutFeedback, View } from "react-native";
import { Searchbar } from "react-native-paper";

export default GeocodeBar = (props) => {
    const { t, i18n } = useTranslation();
    return (
      <View style={{ flex: 1, marginRight: 5 }} 
        accessibilityLabel={t("GEOCODER_PLACEHOLDER_TEXT_DEFAULT")} 
        accessibilityRole="button">
        <TouchableWithoutFeedback
          onPress={() => props.navigation.push(t("SEARCH"), { type: props.type })}
        >
          <View pointerEvents="box-only" importantForAccessibility="no-hide-descendants">
            <Searchbar
              placeholder={props.placeholder}
              value={props.value}
              editable={false}
              clearIcon={<View></View>}
              style={{borderColor:"white"}}
              />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  