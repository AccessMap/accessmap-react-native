# Rakam User Analytics

In AccessMap, Rakam analytics can be turned on by opening the link overlay on the side and turning on the switch labelled "Tracking settings". This will store user interactions with the app into our database for user analytics.

## Implementation

Since there is no React Native wrapper present for Rakam, we are using a fork of the following Android repo to add Rakam tracking to our app. The forked repo can be found [here](https://github.com/yehric2018/rakam-android). The only change is we allow URL routing, which is disabled on the original repo, which allows us to connect to the backend.

The following steps were taken to add the Rakam Android wrapper to the project:

1. Generate a jar from the Rakam Android build and place it in `android/app/libs`.
2. Initialize the Rakam instance in `MainActivity.java`.
3. Track the events in a function within `RakamAnalytics.java`.
4. Add the native module to the modules list in `CustomPackage.java`, which is added as a package in `MainApplication.java`.

To track an event within the app, you can simply do the following:

1. `import { NativeModules } from 'react-native'` in the `js` file you want to track the event from.
2. Define Rakam with `const { Rakam } = NativeModules`.
2. Call `Rakam.trackEvent(type, props)`, where `type` is the event type and props is any additional metadata to describe that event.