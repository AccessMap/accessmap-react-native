import { accessmapTestBackEndPrefix } from "../constants/urls";
import { Alert } from "react-native";
import { mapLoaded, mapLoading, setCustomAvoidCurbs, setCustomDownhill, setCustomUphill } from "../actions";

// Saves the current mobility profile in the app to the backend
// dispatch: function of Redux (used to trigger loading wheel) 
// access_token: token required to interact with user profiles via keycloak
// url: backend endpoint for users
// data: JSON body for the request
export async function uploadProfile(
  dispatch,
  access_token,
  data = {},
  url = accessmapTestBackEndPrefix + "users/",
) {
  dispatch(mapLoading())
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
    body: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res);
      Alert.alert(
        "Saved Mobility Profile",
        "Uphill: " +
          data.uphill_max +
          ", Downhill: " +
          data.downhill_max +
          ", Avoid Curbs: " +
          data.avoid_curbs,
        [{ text: "OK" }]
      );
    })
    .catch((e) => console.error(e))
    .finally(() => dispatch(mapLoaded()))
}

// Deletes the user's mobility profile from the backend
// dispatch: function of Redux (used to trigger loading wheel) 
// access_token: token required to interact with user profiles via keycloak
// url: backend endpoint for users
export async function deleteProfile(
  dispatch,
  username,
  access_token,
  url = accessmapTestBackEndPrefix + "users/" + username
) {
  dispatch(mapLoading())
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
  })
    .then((res) => {
      Alert.alert(
        "Deleted Mobility Profile",
        "Your Mobility Profile is no longer saved on your account."[
          { text: "OK" }
        ]
      );
    })
    .catch((e) => console.error(e))
    .finally(() => dispatch(mapLoaded()))
}

// Loads the profile from the backend, replacing the app's current mobility profile settings
// dispatch: function of Redux (used to trigger loading wheel) 
// access_token: token required to interact with user profiles via keycloak
// url: backend endpoint for users
export async function loadProfile(
  dispatch,
  username,
  access_token,
  url = accessmapTestBackEndPrefix + "users/" + username
) {
  dispatch(mapLoading())
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json, url);
      if (json.length != 0) {
        Alert.alert(
          "Loaded Mobility Profile",
          "Your saved mobility profile has been loaded!" +
            (" Uphill: " + json.uphill_max +
            ", Downhill: " + json.downhill_max +
            ", Avoid Curbs: " + json.avoid_curbs),
          [{ text: "OK" }]
        );
        dispatch(setCustomDownhill(parseInt(json.downhill_max)))
        dispatch(setCustomUphill(parseInt(json.uphill_max)))
        dispatch(setCustomAvoidCurbs(JSON.parse(json.avoid_curbs)))
      } else { // profile not found
        const notFoundMsg = "We could not find a saved Mobility Profile associated with your " + 
        "account in AccessMap. Please tap Save Mobility Profile first.";
        Alert.alert(
          "Mobility Profile Not Found",
          notFoundMsg,
          [{ text: "OK" }]
        )
      }
    })
    .catch((e) => console.error(e))
    .finally(() => { 
      dispatch(mapLoaded())
    })
}
