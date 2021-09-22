import React from "react";
import { AccessibilityInfo, findNodeHandle } from "react-native";

export const setFocus = (element: React.Component | null) => {
  if (element == null) return;
  const id = findNodeHandle(element);
  if (id) {
    AccessibilityInfo.setAccessibilityFocus(id);
    setTimeout(() => {
      AccessibilityInfo.setAccessibilityFocus(id);
    }, 1000);
  }
};
