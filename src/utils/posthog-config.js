import PostHog from "posthog-react-native";

export const postHogSetup = async () => {
  await PostHog.setup("phc_otRFsfm1atxDYQyuAQaWydcNKIZ9jomt1rX4sXhnGT4", {
    // PostHog API host
    host: "https://app.posthog.com",

    // Record certain application events automatically! (off/false by default)
    captureApplicationLifecycleEvents: true,

    // Capture deep links as part of the screen call. (off by default)
    captureDeepLinks: true,

    // Record screen views automatically! (off/false by default)
    recordScreenViews: true,

    // Max delay before flushing the queue (30 seconds)
    flushInterval: 30,

    // Maximum number of events to keep in queue before flushing (20)
    flushAt: 20,

    // Used only for Android
    android: {
      // Enable or disable collection of ANDROID_ID (true)
      collectDeviceId: true,
    },

    // Used only for iOS
    iOS: {
      // Automatically capture in-app purchases from the App Store
      captureInAppPurchases: false,

      // Capture push notifications
      capturePushNotifications: false,

      // Capture advertisting info
      enableAdvertisingCapturing: false,

      // The maximum number of items to queue before starting to drop old ones.
      maxQueueSize: 1000,

      // Record bluetooth information.
      shouldUseBluetooth: false,

      // Use location services. Will ask for permissions.
      shouldUseLocationServices: false,
    },
  });
};
