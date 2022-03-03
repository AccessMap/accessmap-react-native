import {
  AUTHENTICATION_FAILURE,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  RECEIVED_CREDENTIALS,
} from "../actions";

import { oauthConfig, accessmapBackEndPrefix } from "../constants/urls";
import { authorize } from "react-native-app-auth";
import { store } from "../../index";
import { logEvent } from "../actions/trackUser"

const defaultAuthState = {
  isLoggedIn: false,
  accessToken: null,
  username: null,
  displayName: null,
};

export const SIGNIN = "SIGNIN";
export function signIn(token) {
  return { type: SIGNIN, token };
}

export const SIGNOUT = "SIGNOUT";
export function signOut() {
  return { type: SIGNOUT };
}

export function signInReducer(state = defaultAuthState, action) {
  switch (action.type) {
    case SIGNIN: 
      return {...state, 
        isLoggedIn: true, 
        accessToken: action.token.tokenParsed,
        username: action.token.tokenParsed.email
      }
    case SIGNOUT:
      return {...state, 
        isLoggedIn: false, 
        accessToken: null, 
        refreshToken: null,
        username: null
      }
    default:
      return state;
  }
}

export type SignInState = ReturnType<typeof signInReducer>;

