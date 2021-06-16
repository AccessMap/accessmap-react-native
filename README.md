# AccessMap React Native

This is the official repository for AccessMap React Native, currently only available for Android. AccessMap is an open source project developed via the Taskar Center at the University of Washington.

We have plans to add iOS compatibility in the future. We also plan to switch from Mapbox to MapLibre.

## Project Setup (Android)

First, make sure you have React Native installed. If you have not yet set it up, please refer to the following: https://reactnative.dev/docs/environment-setup
1. Clone this repository
2. Run `npm install` in the root directory to generate `node_modules`
3. Navigate to `node_modules/metro-config/src/defaults/blacklist.js`
    - Change `a` to `b`
4. In the root directory, run `npx jetify`
5. Navigate to `android/gradle/wrapper/gradle-wrapper.properties`
    - In the `distributionURL`, change the version from `5.4.1` to `6.3`
6. Setup `secrets.js` in `src/containers/FeedbackForm`, which should declare the following Google Sheets info:
    - spreadsheetId
    - accountId
    - accountName
    - keyId
    - key
7. Open `android` in Android studio and let Gradle build
8. To run the app, run the following command in the root directory: `npx react-native run-android`