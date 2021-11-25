// A Geocoder consists of a list of items reflecting geographic locations
// based on user input.
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccessibilityInfo, Alert, FlatList, Text, View } from "react-native";
import { ListItem } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from "../../utils/usePreviousHook";

import {
  goToLocation,
  placePin,
  setOrigin,
  setDestination,
  mapLoading,
  mapLoaded,
} from "../../actions";
import { ACCESS_TOKEN } from "../../constants";
import LoadingScreen from "../../components/LoadingScreen";
import { RootState } from "../../reducers";

export default function Geocoder(props) {
  // type [string]: either searching for a place, setting origin, or setting destination
  // navigation: window to pop out of
  // search [string]: query

  const [searchList, setSearchList] = useState([]);
  const prevSearch = usePrevious(props.search);

  let bbox = useSelector((state: RootState) => state.map.bbox.join(","));
  let isLoading = useSelector((state: RootState) => state.mapLoad.isLoading);

  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

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
    dispatch(mapLoading());

    const timeoutId = setTimeout(() => {
      var query = "";
      if (props.search.includes(".") && props.search.includes(",")) { // coordinates
        query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + 
          props.search.replace(/ /g, "") + ".json?access_token=" + ACCESS_TOKEN;
      } else {
        query =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          props.search +
          ".json?bbox=" +
          bbox +
          "&limit=20&access_token=" +
          ACCESS_TOKEN;
      }
      fetch(query)
        .then((response) => response.json())
        .then((json) => {
          if (json.features) {
            setSearchList(json.features);
            AccessibilityInfo.announceForAccessibility(json.features.length + 
              " results found for query: " + props.search)
          }
          dispatch(mapLoaded());
        })
        .catch((error) => {
          console.log(error);
          dispatch(mapLoaded());
          Alert.alert(t("NO_LOCATION"), t("NO_INTERNET"), [{ text: "OK" }]);
        });
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [props.search]);

  const search = (item) => {
    switch (props.type) {
      case "search":
        AccessibilityInfo.announceForAccessibility("Showing location of " + item.place_name);
        panToLocation(item);
        break;
      case "origin":
        AccessibilityInfo.announceForAccessibility("Route origin set to " + item.place_name);
        setAndPinOrigin(item);
        break;
      case "destination":
        AccessibilityInfo.announceForAccessibility("Route destination set to " + item.place_name);
        setAndPinDestination(item);
    }
    props.navigation.pop();
  };

  const renderItem = ({ item, index }) => {
    return (
      <ListItem onPress={() => search(item)}>
        <ListItem.Content>
          <ListItem.Title>{item.place_name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  };
  
  const noSuggestionsText = "No suggested locations found for query. " + 
    "Try typing exact coordinates (longitude, latitude) or a location name.";
  return (
    <View style={{width: "100%", height: "100%"}}>
      {((!searchList || searchList.length == 0) && (props.search)) && 
      <ListItem style={{height:"100%"}}>
        <ListItem.Content>
          <Text>{noSuggestionsText}</Text>
        </ListItem.Content>
      </ListItem>}
      
      { searchList && searchList.length > 0 &&
        <FlatList
          data={searchList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          accessibilityLabel={"Search results"}
        />
      }

      <LoadingScreen isLoading={isLoading}/>
    </View>
  );
}
