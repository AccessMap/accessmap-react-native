import { Linking } from "react-native";

//-------------------------------------------------------------------------------------------------
// Absolute Links
export const githubURL = "https://github.com/AccessMap/accessmap-react-native";
export const taskarURL = "https://tcat.cs.washington.edu";
export const donateURL =
  "https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR";

export const escienceURL = "https://escience.washington.edu/";
export const wsdotURL = "https://wsdot.wa.gov/";
export const twitterURL = "https://twitter.com/accessmapsea";
export const mailURL = "mailto:accessmap.info@gmail.com";

const accessmapBackEndPrefix = "https://www.accessmap.io/api/v1/";
export const loginURL = accessmapBackEndPrefix + "auth/login";
export const appRedirectURIPrefix = "com.accessmap.auth://";

export const openLink = async (url) => {
  var supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log("Error: cannot open url");
  }
};

//-------------------------------------------------------------------------------------------------
// Deep Linking
const reactNavigationDeepLinkConfig = { 
  screens: {
    Home: {
      screens: {
        mappage: 'home',
      },
    },
    Settings: 'settings',
  },
};
export const deepLinking = {
  prefixes: [appRedirectURIPrefix],
  config: reactNavigationDeepLinkConfig,
};

//-------------------------------------------------------------------------------------------------
// Authentication
export const oauthConfig = {
  redirectUrl: appRedirectURIPrefix + 'oauth2/',
  clientId: '0TEBnnENrviehd0VTskp7XtUTGRy8XNLza5mJjM_enQ',
  clientSecret: 'LSvNchqndm41HQ84TpFw4I9saTRFFm3y-2q3BO5R0Vg',
  scopes: ['read_prefs', 'write_prefs'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.openstreetmap.org/oauth2/authorize',
    tokenEndpoint: 'https://www.openstreetmap.org/oauth2/token',
  }
};