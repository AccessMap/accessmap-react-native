// Force focuses a UI element so the screen reader will immediately read its alt text
import React from "react";
import { AccessibilityInfo, findNodeHandle } from "react-native";

export const setFocus = (element: React.Component | null) => {
  if (element === null) return;
  const id = findNodeHandle(element);
  // console.log("attempt sending a11y event to " + id);
  if (id) {
    AccessibilityInfo.setAccessibilityFocus(id);
  }
};
