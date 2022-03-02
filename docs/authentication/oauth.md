# [Deep Links](https://reactnative.dev/docs/linking)
Used React Navigation to split up the app into sections. It lets the app handle incoming
and outgoing app redirect links.

## Deep Linking with React Navigation Configuration
```js
const config = { 
  screens: {
    Home: {
      screens: {
        mappage: 'home', // must correspond to the name of the page, ex: mappage
      },
    },
    Settings: 'settings', // full URI: com.accessmap://settings
  },
};
const deepLinking = {
  prefixes: [appRedirectURIPrefix],
  config,
};

// In App.js
<NavigationContainer linking={deepLinking} fallback={<LoadingScreen isLoading={true}/>}>
...
```

## Test Deep Links (the link is in quotes)
adb shell am start -W -a android.intent.action.VIEW -d "com.accessmap://" com.accessmap 


# OAuth
Open Authorization allows for granting access to user's information on websites/applications,
particularly on 3rd-party sites, without revealing user's passwords to the 3rd party.
This means that by logging into OSM, people essentially login to AccessMap, accessing their OSM
preferences. Used the library ['react-native-app-auth'](https://github.com/FormidableLabs/react-native-app-auth).

1) Sign up with an OpenStreetMap Account
2) Go to Settings > OAuth 2 applications and create a new registered app
3) The Redirect URI must match 'redirectUrl' below
4) Copy the Client ID and Secret and put somewhere secure (ex: .env file)
5) Choose OSM scopes = permissions (check the [docs](https://wiki.openstreetmap.org/wiki/OAuth#OAuth_2.0))

```js
export const oauthConfig = {
  redirectUrl: appRedirectURIPrefix + 'oauth2/', // ex: com.accessmap.auth://oauth2, tells the 
  clientId: '0TEBnnENrviehd0VTskp7XtUTGRy8XNLza5mJjM_enQ',
  clientSecret: 'LSvNchqndm41HQ84TpFw4I9saTRFFm3y-2q3BO5R0Vg',
  scopes: ['read_prefs', 'write_prefs'], // users may read and write OSM account preferences
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.openstreetmap.org/oauth2/authorize', // where to redirect app to authorize
    tokenEndpoint: 'https://www.openstreetmap.org/oauth2/token',
  }
};
```
Example auth config with [Uber](https://github.com/FormidableLabs/react-native-app-auth/blob/main/docs/config-examples/uber.md)

```js
async function authenticate() {
  try {
    const result = await authorize(oauthConfig);
    // result includes accessToken, accessTokenExpirationDate and refreshToken
    // ex: {"accessToken": "dwfpaQWVgPLT4UaIxJOfn4n2zhT8zmOWJjUKlrhMzPU", "authorizeAdditionalParameters": {}, "idToken": null, "refreshToken": null, "scopes": [], "tokenAdditionalParameters": {"created_at": "1635305122"}, "tokenType": "Bearer"}
  } catch (error) {
    console.log("auth error: " + error);
  }
}
```

# Keycloak
As of February 2022, we are switching from OAuth 1.0 to OAuth 2.0 + Open ID Connect (OIDC).
Keycloak is an intermediary authentication server that handles identity providers for us.
This way, we don't need to manually write an authentication server that handles access and refresh tokens.
