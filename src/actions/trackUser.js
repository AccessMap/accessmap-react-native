import PostHog from "posthog-react-native";
import { NativeModules } from "react-native";

const { Rakam } = NativeModules;
export const logEvent = async (type, props) => {
  if (Platform.OS === "android") {
    Rakam.trackEvent(type, props);
  }
  PostHog.capture(type, {
    properties: props,
  });
};