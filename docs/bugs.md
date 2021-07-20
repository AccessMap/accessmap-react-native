# Bug Fixes

## High Priority (1 = highest)
1. Find a replacement for native-base Drawer (it relies on deprecated React stuff)

## Low Priority
1. Design: Update app with Chris's refactored design
   1. Instead of having floating card on bottom, having universal bottom bar is better
   2. Content of Directions page on bottom bar gets completely replaced by the new sidewalk tap  
   3. Needs an animation for "finding route" indicator
2. Mapbox: brute force limiting the map coverage area
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area w/ grey
3. Animations: Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
