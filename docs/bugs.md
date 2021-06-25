# Bug Fixes

## High Priority (1 = highest)
1. Run npm audit, find out which one is the "1 critical" dependency
2. Create a user-facing documentation for how to use the app itself
3. Currently, the About and Contact menu buttons in the main drawer are not screen-reader clickable.

## Low Priority
1. Change the route from meters to feet/miles
2. Make the "Report Issue" button look nicer
3. Can pan outside of coverage area
4. Sometimes the map pins show up as black rather than red
5. Mapbox does not provide a way to limit the coverage area, so we will likely need to brute force it
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area
6. Needs an animation for "finding route" indicator
7. Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
8.  Content of Directions page on bottom bar gets completely replaced by the new sidewalk tap 
9.  Instead of having floating card on bottom, having universal bottom bar is better
