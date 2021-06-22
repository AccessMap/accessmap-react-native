# Bug Fixes

## High Priority (1 = highest)
1. Run npm audit, find out which one is the "1 critical" dependency
2. Tracking settings
   1. Almost finished, but need to verify that this works with console.log
3. Need to add images for the AccessMap sponsors
   1. Imgs can be found on the webapp (put something for the “More Info” button in the main drawer menu)


## Low Priority
1. Change the route from meters to feet/miles
2. Can pan outside of coverage area
3. Sometimes the map pins show up as black rather than red
4. Mapbox does not provide a way to limit the coverage area, so we will likely need to brute force it
   1. Add a message in the interface to clarify when the user exits the bounds
   2. Color the covered area
5. Needs an animation for "finding route" indicator
6. Make the "Report Issue" button look nicer
7. Hide the transition of changing route midway
   1. The dashed line from the current location to the first sidewalk in the route changes before the route is set
8. Fix the crowdsourcing of crossing to be reflective of actual features
9.  Content of Directions page on bottom bar gets completely replaced by the new sidewalk tap 
10. Instead of having floating card on bottom, having universal bottom bar is better
