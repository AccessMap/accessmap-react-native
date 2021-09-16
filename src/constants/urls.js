import { Linking } from "react-native";

export const githubURL = "https://github.com/AccessMap/accessmap-react-native";
export const taskarURL = "https://tcat.cs.washington.edu";
export const donateURL =
  "https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR";
export const escienceURL = "https://escience.washington.edu/";
export const wsdotURL = "https://wsdot.wa.gov/";
export const twitterURL = "https://twitter.com/accessmapsea";
export const mailURL = "mailto:accessmap.info@gmail.com";

export const openLink = async (url) => {
  var supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
    console.log("Error: cannot open url");
  }
};