# Animation examples

```js
const translation = useRef(new Animated.Value(0)).current;
const slide = () => {
AccessibilityInfo.announceForAccessibility(showingCard ? 
    "Top card has been minimized." : 
    "Top card has been maximized.");
Animated.timing(translation, {
    toValue: showingCard ? -(size.height - 120) : 0,
    useNativeDriver: true,
    duration: 500,
    easing: EasingNode.linear,
}).start();
toggleCard(!showingCard);
};
```