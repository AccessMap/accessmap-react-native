# Accessibility documentation: Force Focus possible implementations
Currently there is no official way to force focus on an element. Ex: you may need to do this
to indicate to a screen reader user that a element (custom one) has appeared on the page, like
a popup card.

## Using AccessibilityInfo
```js 
// Not reliable, see links to bug page on GitHub below
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
      // console.log("set focus");
    }
  }
}
  ... 
  <View ref={viewRef}> // must have a view attached to ref
```

## Using UIManager 
```js
// currently deprecated despite being on the RN Docs page
 if (Platform.OS === 'android') {
    UIManager.sendAccessibility(
      findNodeHandle(this),
      UIManager.AccessibilityEventTypes.typeViewFocused
    );
  }
```

## Example that works (with suspected race condition on AccessibilityInfo, needs WIP) 
```js
// Assign ref={setFocus} on the element you want to focus on. Be sure to 
// set it to something "accessible", like Text.
// The timeout is to circumvent the race condition because the screenreader
// may be reading out another call.
const setFocus = (element: React.Component | null) => {
  if (element == null) return;
  const id = findNodeHandle(element);
  if (id) {
    AccessibilityInfo.setAccessibilityFocus(id);
    setTimeout(() => {
      AccessibilityInfo.setAccessibilityFocus(id);
    }, 1000);
  }
};
```

## Checking if screen reader active or not
```js
const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  useEffect(() => {
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    AccessibilityInfo.isScreenReaderEnabled().then(
      screenReaderEnabled => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    return () => screenReaderChangedSubscription.remove()
  }, []);
  ```

  ## Checking if Screenreader is on
  ```js
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  useEffect(() => {
    const screenReaderChangedSubscription = AccessibilityInfo.addEventListener(
      "screenReaderChanged",
      (screenReaderEnabled) => {
        setScreenReaderEnabled(screenReaderEnabled);
      }
    );
    AccessibilityInfo.isScreenReaderEnabled().then((screenReaderEnabled) => {
      setScreenReaderEnabled(screenReaderEnabled);
    });
    return () => {
      screenReaderChangedSubscription.remove();
    };
  }, []);
  ```

  ##  Problem with iOS-specific VoiceOver
  You need to set accessible={false} to a Button's children (if it includes an Icon),
  then set accessible={true} to the parent to prevent VoiceOver from trying to read the 
  Icon image itself (which produces "?" as the alt text). 
  - Other noted problems: Our MobilityProfile Card doesn't read in linear order 