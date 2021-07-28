import React from "react";
import {View, FlatList, AccessibilityInfo} from "react-native";
import {OverlayButton} from "../../containers/LinkOverlay/index";

export default function TutorialPage({ route, navigation }) {
    return (<View>
            <FlatList
                data={[
                {key: 'Map Interface'},
                {key: 'Route Planning'},
                {key: 'Settings Menu'},
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