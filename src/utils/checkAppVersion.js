// import { Alert, BackHandler, Linking } from "react-native";
// import VersionCheck from "react-native-version-check";

import { Alert, Linking } from "react-native";
import { APPLE_STORE_APP_URL, APPLE_STORE_VERSION_URL } from "../constants";

// export const checkVersion = async () => {
//   try {
//     VersionCheck.getLatestVersion({
//       country: "us",
//     }).then((latestVersion) => {
//       console.log("latest = " + latestVersion); // 0.1.2
//     });
//     let updateNeeded = await VersionCheck.needUpdate();
//     if (updateNeeded && updateNeeded.isNeeded) {
//       Alert.alert(
//         "Update AccessMap",
//         "A new release of AccessMap is available. Please update to the latest version.",
//         [
//           {
//             text: "Update",
//             onPress: () => {
//               BackHandler.exitApp();
//               Linking.openURL(updateNeeded.storeUrl);
//             },
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

export const checkLatestiOSAppVersion = async () => {
  try {
    const response = await fetch(APPLE_STORE_VERSION_URL);
    const json = await response.json();
    var pkg = require("../../package.json");

    if (pkg.version < json.results[0].version) { // app needs to be updated
      Alert.alert(
        "New Version of AccessMap available",
        "Please update your app to use our newest features.",
        [
          {
            text: "Update",
            onPress: () => {
              Linking.openURL(APPLE_STORE_APP_URL);
            },
          },
          {
            text: "Maybe Later",
          },
        ]
    //   );
    // }
  } catch (e) {
    console.log(e);
  }
};
