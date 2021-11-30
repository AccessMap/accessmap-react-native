# Animation examples

Animating a card upward when opened
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

Allowing user to swipe/pan up and down to maximize and minimize a card.
```js
const threshold = 500;
const handleSwipeEvent = Animated.event(
    [{ nativeEvent: { translationY: props.panY } }],
    { useNativeDriver: true }
);

// Handles the threshold interaction for dismissing
const handleStateChange = ({ nativeEvent }) => {
    props.panY.extractOffset(); // prevents jumping to initial state
    console.log(nativeEvent)
    if (nativeEvent.state === State.END) {
        if (
        nativeEvent.translationY >= threshold ||
        nativeEvent.velocityY >= 1420
        ) {
        // props.dismissCard();
        }
    }
};
```