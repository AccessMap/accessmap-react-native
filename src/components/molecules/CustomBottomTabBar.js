import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, Image, Platform } from 'react-native';
import { bottomTabHeight } from '../../constants';
import { Fonts, Position } from '../../styles';
import { primaryColor } from '../../styles/colors';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';

export default function CustomBottomTabBar({ state, descriptors, navigation }) {
  const window = useWindowDimensions();
  let signedIn = useSelector(
    (state: RootState) => state.signIn.isLoggedIn
  );

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

        var iconName = "";
        if (index == 0) {
          iconName = "map";
        } else if (index == 1) {
          iconName = "account";
        } else {
          iconName = "cog";
        }

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true`option makes sure that the params 
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

        const returnIcon = (label) => {
          if (signedIn && label === "Profile") {
            return (
              <Image
                accessibilityLabel="Profile Picture"
                style={{width: 26, height: 26, borderRadius: 45}}
                source={require("../../../res/images/dog.png")}
                resizeMode="cover"
                resizeMethod="scale"
              />
            );
          }
          return (<MaterialCommunityIcons
            name={iconName}
            color={isFocused ? 'white' : primaryColor}
            size={30}
            style={{top: Platform.OS === "android" ? 5 : 0}}
          />);
        }

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[{ flex: 1,
                height: (window.height > window.width) ? bottomTabHeight : 0,
                backgroundColor: isFocused ? primaryColor: "white"}, 
                Position.center]}
          >
            {returnIcon(label)}
            <Text style={[Fonts.p,{ color: isFocused ? 'white' : primaryColor, 
              top: Platform.OS === "android" ? -4 : -12}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};