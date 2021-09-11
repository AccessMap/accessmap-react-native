import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Fonts, Position } from '../styles';
import { primaryColor } from '../styles/colors';

export default function CustomBottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params 
            // inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{ flex: 1, height: 80,
                backgroundColor: isFocused ? primaryColor: "white"}, 
                Position.center]}
          >
            <Text style={[Fonts.h1,{ color: isFocused ? 'white' : primaryColor, top: -5 }]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};