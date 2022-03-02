import { accessmapTestBackEndPrefix } from "../constants/urls";
import { Alert } from "react-native";

// Saves the current mobility profile in the app to the backend
export async function uploadProfile(
  access_token = "",
  url = accessmapTestBackEndPrefix + "users/",
  data = {
    user_id: username,
    uphill_max: customUphill,
    downhill_max: customDownhill,
    avoid_curbs: avoidRaisedCurbs,
  }
) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      Alert.alert(
        "Saved Mobility Profile",
        "Uphill: " +
          customUphill +
          ", Downhill: " +
          customDownhill +
          ", Avoid Curbs: " +
          avoidRaisedCurbs,
        [{ text: "OK" }]
      );
    })
    .catch((e) => console.error(e));
}

// Deletes the user's mobility profile from the backend
export async function deleteProfile(
  access_token = "",
  url = accessmapTestBackEndPrefix + "users/" + username
) {
  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
  })
    .then((response) => {
      console.log(response);
      Alert.alert(
        "Deleted Mobility Profile",
        "Your Mobility Profile is no longer saved on your account."[
          { text: "OK" }
        ]
      );
    })
    .catch((e) => console.error(e));
}

// Loads the profile from the backend, replacing the app's current mobility profile settings
export async function loadProfile(
  access_token = "",
  url = accessmapTestBackEndPrefix + "users/" + username
) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    redirect: "follow",
  })
    .then((response) => {
      console.log(response);
      Alert.alert(
        "Loaded Mobility Profile",
        "Your saved mobility profile has been loaded!"[{ text: "OK" }]
      );
    })
    .catch((e) => console.error(e));
}
