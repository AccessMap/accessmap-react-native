# AccessMap React Native

This is the official repository for AccessMap React Native, currently only available for Android. AccessMap is an open source project developed via the Taskar Center at the University of Washington. The app is currently runnable on Android and iOS.

## Using the mobile app
Please see [this](docs/quickstart.md) document for quickstart instructions.

## Project Setup (Android)

First, make sure you have React Native installed. If you have not yet set it up, please refer to the following: https://reactnative.dev/docs/environment-setup
1. Clone this repository
2. Run `npm install` in the root directory to generate `node_modules`
3. Setup `secrets.js` in `src/containers/FeedbackForm`, which should declare the following Google Sheets info:
    - spreadsheetId
    - accountId
    - accountName
    - keyId
    - key
5. From the root directory, run `chmod 755 android/gradlew` (user can read/write/execute).
    - Make sure the gradlew file has Unix format line endings (if using Mac). If not, run `dos2unix gradlew`.
    - Run `./gradlew clean` where gradlew is located.
6. Open `android` in Android studio and let Gradle build, or type `./gradlew build`.
    - You may need to first open and run your emulator. 
    - Tools > AVD Manager > Press the green button next to your installed emulated device.
7.  To run the app, run the following command in the **root directory**: `npx react-native run-android`
8.  If at any point you run into a message mentioning ./gradlew debug error or a server 500 error on the app relating to a dependency,
    follow the above steps again.
9.  To do the above steps as a shortcut, run ./setup.sh in the home directory

## Running the app on device
- Android: `react-native run-android --deviceId=DEVICE_ID`
  - For list of connected devices' IDs, run `adb devices` with android command line tools installed.
- iOS: react-native run-ios
  - For simulator, attach simulator tag: `--simulator="iPhone SE (1st generation)"`
    - `xcrun simctl list devices` to see all installed simulators
  - For physical device, attach device tag: `--device "Jay's iPhone"`