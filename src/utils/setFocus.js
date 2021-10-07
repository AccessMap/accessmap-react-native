// Force focuses a UI element so the screen reader will immediately read its alt text
import React from "react";
import { AccessibilityInfo, findNodeHandle } from "react-native";

export const setFocus = (element: React.Component | null) => {
  if (element == null) return;
  const id = findNodeHandle(element);
  if (id) {
    AccessibilityInfo.setAccessibilityFocus(id);
    setTimeout(() => {
      if (findNodeHandle(element)) {
        AccessibilityInfo.setAccessibilityFocus(id);
      }
    }, 1000);
  }
};
