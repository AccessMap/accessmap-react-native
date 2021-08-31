# Bug Fixes

## High Priority (1 = highest)
1. Design: Update app with Chris's refactored design
   2. Needs an animation for "finding route" indicator
## Low Priority
1. Mapbox: brute force limiting the map coverage area
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area w/ grey
2. Animations: Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
