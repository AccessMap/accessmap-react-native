# Accessibility documentation

## How to force focus screenreader on an element
```js 
const viewRef = useRef();
  useEffect(() => {
    setFocus();
  }, [viewRef]);

  const setFocus = () => {
    AccessibilityInfo.announceForAccessibility("Currently on tutorial step " + (numStep+1) + " titled " + heading);
    if (viewRef.current) {
      const handle = findNodeHandle(viewRef.current);
      if (handle) { 
        // there is a known bug where setAccessibilityFocus sometimes doesn't work, and various other problems...
        // see: https://github.com/facebook/react-native/issues/30771
        // and https://github.com/facebook/react-native/issues/30097 
        AccessibilityInfo.setAccessibilityFocus(handle); 
        AccessibilityInfo.setAccessibilityFocus(handle); 
        console.log("set focus");
      }
    }
  }
  ... 
  <View ref={viewRef}> // must have a view attached to ref
```