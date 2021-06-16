# AccessMap React Native

This is the official repository for AccessMap React Native, currently only available for Android. AccessMap is an open source project developed via the Taskar Center at the University of Washington.

We have plans to add iOS compatibility in the future. We also plan to switch from Mapbox to MapLibre.

## Project Setup (Android)

First, make sure you have React Native installed. If you have not yet set it up, please refer to the following: https://reactnative.dev/docs/environment-setup
1. Clone this repository
2. Run `npm install` in the root directory to generate `node_modules`
3. Navigate to `node_modules/metro-config/src/defaults/blacklist.js`
    - Change `/node_modules[/\\]react[/\\]dist[/\\].*/` to `/node_modules[\/\\]react[\/\\]dist[\/\\].*/` in *sharedBlacklist* variable line 15.
4. In the root directory, run `npx jetify`. This converts your converted JS app to AndroidX (newer standard Android libary) when using Android.
5. Setup `secrets.js` in `src/containers/FeedbackForm`, which should declare the following Google Sheets info:
    - spreadsheetId
    - accountId
    - accountName
    - keyId
    - key
6. From the root directory, run `chmod 755 android/gradlew` (user can read/write/execute).
    - Make sure the gradlew file has Unix format line endings (if using Mac). If not, run `dos2unix gradlew`.
    - Run `./gradlew clean` where gradlew is located.
7. Open `android` in Android studio and let Gradle build.
8. To run the app, run the following command in the root directory: `npx react-native run-android`