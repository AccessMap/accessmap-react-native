// A Geocoder consists of a list of items reflecting geographic locations
// based on user input.
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityInfo, Alert, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import {
  goToLocation,
  placePin,
  setOrigin,
  setDestination,
} from "../../actions";
import { ACCESS_TOKEN } from "../../constants";

export default function Geocoder(props) {
  const [searchList, setSearchList] = useState({});
  const prevSearch = usePrevious(props.search);
  let bbox = useSelector((state: RootState) => state.bbox.join(","));
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const panToLocation = (item) => {
    dispatch(goToLocation(item));
    dispatch(placePin(item));
  };

  const setAndPinOrigin = (item) => {
    dispatch(goToLocation(item));
    dispatch(placePin(item));
    dispatch(setOrigin());
  };

  const setAndPinDestination = (item) => {
    dispatch(goToLocation(item));
    dispatch(placePin(item));
    dispatch(setDestination());
  };

  useEffect(() => {
    if (prevSearch == props.search) {
      return;
    }
    const query =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      props.search +
      ".json?bbox=" +
      bbox +
      "&limit=10&access_token=" +
      ACCESS_TOKEN;

    fetch(query)
      .then((response) => response.json())
      .then((json) => {
        setSearchList(json.features);
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(t("NO_LOCATION"), t("NO_INTERNET"), [{ text: "OK" }]);
      });
  }, [props.search]);

  const renderItem = ({ item, index }) => {
    return (
      <ListItem
        onPress={() => {
          switch (props.type) {
            case "search":
              AccessibilityInfo.announceForAccessibility(
                "Showing location of " +
                  item.place_name +
                  ". Select Route from here to set location as route start. Or," +
                  "Select Route to here to set location as route end."
              );
              panToLocation(item);
              break;
            case "origin":
              AccessibilityInfo.announceForAccessibility(
                "Route start set to " + item.place_name
              );
              setAndPinOrigin(item);
              break;
            case "destination":
              AccessibilityInfo.announceForAccessibility(
                "Route destination set to " + item.place_name
              );
              setAndPinDestination(item);
          }
          props.navigation.pop();
        }}
      >
        <ListItem.Content>
          <ListItem.Title>{item.place_name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={searchList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      accessibilityLabel={"Search results"}
    />
  );
}
