# Bug Fixes

- Can pan outside of coverage area
    - Mapbox does not provide a way to limit the coverage area, so we will likely need to brute force it
    - We can add a message in the interface to clarify when the user exits the bounds, and color the covered area
- Needs an animation for "finding route" indicator
- Tracking settings
    - Almost finished, but need to verify that this works with console.log
- Need to add images for the AccessMap sponsors, which can be found on the webapp
- Omnibar is not centered on some phone screens
- Make the "Report Issue" button look nicer
- Hide the transition of changing route midway
    - The dashed line from the current location to the first sidewalk in the route changes before the route is set
- Change the route from meters to feet/miles
- Higher contrast on all text (darker coloring)
- Fix the crowdsourcing of crossing to be reflective of actual features
- Sometimes the map pins show up as black rather than red