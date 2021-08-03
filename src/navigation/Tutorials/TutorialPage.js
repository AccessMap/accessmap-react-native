import React from "react";
import { useTranslation } from "react-i18next";
import {View, FlatList, AccessibilityInfo} from "react-native";
import {OverlayButton} from "../../containers/LinkOverlay/index";

export default function TutorialPage({ route, navigation }) {
    const { t, i18n } = useTranslation();
    return (<View>
            <FlatList
                data={[
                {key: t("MAP_INTERFACE")},
                {key: t("ROUTE_PLANNING")},
                {key: t("SETTINGS_MENU")},
                ]}
                renderItem={({item}) => 
                    <OverlayButton
                        text={item.key}
                        onPress={() => { 
                            navigation.push(item.key);
                            AccessibilityInfo.announceForAccessibility("Showing " + item.key + " Page.");
                        }}
                    />
                }
                style={{marginLeft: 20}}
            />
        </View>);
}