# Bug Fixes

## High Priority (1 = highest)
1. Design: Update app with Chris's refactored design
   1. Change fonts to match Figma
   2. Instead of having floating card on bottom, having universal bottom bar is better
   3. Content of Directions page on bottom bar gets completely replaced by the new sidewalk tap  
   4. Needs an animation for "finding route" indicator
## Low Priority
1. Mapbox: brute force limiting the map coverage area
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area w/ grey
2. Animations: Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
3. Change the tutorial pages to match Chris's design; designs should be flexible for varying screen sizes
