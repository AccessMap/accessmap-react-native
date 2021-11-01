import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  RECEIVED_CREDENTIALS,
} from "../actions";

import { oauthConfig, accessmapBackEndPrefix } from "../constants/urls";
import { authorize } from "react-native-app-auth";
import { store } from "../../index";

const defaultAuthState = {
  isLoggedIn: false,
  provider: null,
  accessToken: null,
  accessTokenExpirationDate: null,
  refreshToken: null,
  userID: null,
  displayName: null,
};

async function authenticate() {
  try {
    const result = await authorize(oauthConfig);
    console.log(result)
    if (result && result.accessToken) {
      console.log("getting profile with at = " + result.accessToken)
      const user = await loadUser(result.accessToken, err => { if (err) { 
        console.log("Failed to load user: " + err) 
      }})
      if (!user) { // user doesn't exist yet
        console.log("no prof found, making new profile")
        const profile = {
          uphillMax: store.getState().mobility.customUphill,
          downhillMax: store.getState().mobility.customDownhill,
          avoidCurbs: store.getState().mobility.avoidRaisedCurbs,
        }
        const saveProfResult = await saveProfile(profile, result.accessToken, err => { if (err) { 
          console.log("Failed to save/make profile: " + err) 
        }})
        console.log("save prof returns: " + saveProfResult)
      }
    }
  } catch (error) {
    console.log("auth error: " + error);
    return null;
  }
}

// Loads a user's account profile
async function loadUser(accessToken, callback) {
  console.log("LOADING USER at:" + accessmapBackEndPrefix + "`user/profile`")
  fetch(accessmapBackEndPrefix + "user/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then(json => {
      const userID = json.user_id;
      const displayName = json.display_name;
      callback(null, userID, displayName);
    })
    .catch(err => callback(err));
};

// Saves user mobility preferences
async function saveProfile(profile, accessToken, callback) {
  // TODO: console.log("SAVING PROFILE at:" + accessmapBackEndPrefix + "`profiles`")
  // console.log(accessToken)
  // console.log(profile.uphillMax)
  // console.log(profile.downhillMax)
  // console.log(profile.avoidCurbs)
  fetch(accessmapBackEndPrefix + "profiles", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      uphill_max: profile.uphillMax,
      downhill_max: profile.downhillMax,
      avoid_curbs: profile.avoidCurbs
    })
  })
    .then(response => {
      if (response.ok) return response.json();
      throw new Error("Error saving profile: " + response.status);
    })
    .then(() => {
      callback(null);
    })
    .catch(err => callback(err));
};

export function signInReducer(state = defaultAuthState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      authenticate()
      return { ...state
        // ,
        // hasLoggedInOnce: true, 
        // accessToken: result.accessToken,
        // refreshToken: result.refreshToken,
        // accessTokenExpirationDate: result.accessTokenExpirationDate,
      };
    case AUTHENTICATION_SUCCESS:
      return { ...state };
    case AUTHENTICATION_FAILURE:
      return { ...state };
    case RECEIVED_CREDENTIALS:
      return { ...state };
    default:
      return state;
  }
}

export type SignInState = ReturnType<typeof signInReducer>;

