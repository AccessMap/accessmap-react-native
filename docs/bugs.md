# Bug Fixes

## High Priority (1 = highest)
1. Add announceForAccessibility throughout the app whenever needed for screenreader accessibility 

## Low Priority
1. Update React Native and React Navigation to the latest version
   1. Move the AccessMapRN stuff to the old repo
2. Change the route from meters to feet/miles
3. Make the "Report Issue" button look nicer
4. Can pan outside of coverage area
5. Sometimes the map pins show up as black rather than red
6. Mapbox does not provide a way to limit the coverage area, so we will likely need to brute force it
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area
7. Needs an animation for "finding route" indicator
8. Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
9.  Content of Directions page on bottom bar gets completely replaced by the new sidewalk tap 
10. Instead of having floating card on bottom, having universal bottom bar is better
