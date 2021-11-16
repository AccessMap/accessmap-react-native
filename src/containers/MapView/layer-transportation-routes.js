// LayerTransportationRoutes represents bus map points of live bus location data
import React, { useEffect, useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { MapStyles } from "../../styles";
import { updateBusData } from "../../utils/fetch-bus-locations";

const iconStyle = {
	iconImage: "green-bus",
  iconSize: 1.2,
};

const LayerTransportationRoutes = (props) => {
  const [busDetails, updateBusDetails] = useState();
  setInterval(async () => {
    const newDetails = await updateBusData();
    if (newDetails) {
      updateBusDetails(newDetails);
      // console.log(newDetails[0].position.latitude)
    }
  }, 30000);

  const features = []
  const busPoints = { "type": "FeatureCollection", "features": features }

  for (bus in busDetails) {
    features.push({
      type: "Feature",
      id: busDetails[bus].vehicle.id,
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [ busDetails[bus].position.longitude, busDetails[bus].position.latitude ]
      },
    });
  }

  return (
    <React.Fragment>
      <MapboxGL.ShapeSource id="transportation-mask" shape={busPoints}>
				<MapboxGL.SymbolLayer id="bus-location" style={iconStyle} />
			</MapboxGL.ShapeSource>
    </React.Fragment>
  );
};

export default LayerTransportationRoutes;
