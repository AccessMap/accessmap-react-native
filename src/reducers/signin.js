import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  RECEIVED_CREDENTIALS,
} from "../actions";

import { oauthConfig } from "../constants/urls";
import { authorize } from "react-native-app-auth";

const defaultAuthState = {
  hasLoggedInOnce: false,
  provider: '',
  accessToken: '',
  accessTokenExpirationDate: '',
  refreshToken: ''
};

async function authenticate() {
  try {
    const result = await authorize(oauthConfig);
    console.log(result);
    defaultAuthState.hasLoggedInOnce = true;
    defaultAuthState.accessToken = result.accessToken;
    defaultAuthState.accessTokenExpirationDate = result.accessTokenExpirationDate;
    defaultAuthState.refreshToken = result.refreshToken;

  } catch (error) {
    console.log("auth error: " + error);
  }
}

// Load a user's account profile
// TODO: promisify
export const loadUser = (accessToken, callback) => {
  // Retrieve user's profile
  fetch("/api/v1/user/profile", {
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

export function signInReducer(state = defaultAuthState, action) {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      console.log("here")
      authenticate()
      return { ...state };
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

