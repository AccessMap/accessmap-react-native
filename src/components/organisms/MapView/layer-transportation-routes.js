// LayerTransportationRoutes represents bus map points of live bus location data
import React, { useEffect, useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
// import { MapStyles } from "../../styles";
import { updateBusData } from "../../../utils/fetch-bus-locations";
import king_county_routes from "../../../../res/data/king_county_routes.json";

const iconStyle = {
  iconImage: "green-bus",
  iconSize: 1.2,
  textField: ["get", "name"],
  textMaxWidth: 7,
  textSize: 10,
  textHaloColor: "#ff00ff00",
};

const LayerTransportationRoutes = (props) => {
  const [busDetails, updateBusDetails] = useState();
  let intervalId;

  useEffect(() => {
    if (!intervalId) {
      intervalId = setInterval(async () => {
        const newDetails = await updateBusData();
        if (newDetails) {
          updateBusDetails(newDetails);
          console.log(
            "pos:" +
              newDetails[0].position.latitude +
              "," +
              newDetails[0].trip.route_id
          );
        }

      }, 30000);
    }
    return () => {};
  }, []);

  const features = [];
  const busPoints = { type: "FeatureCollection", features: features };

  for (bus in busDetails) {
    const raw_route_id = busDetails[bus].trip.route_id;
    const route = king_county_routes.find(route => route.route_id == raw_route_id);
    const actual_route_name = route ? route.route_short_name : raw_route_id;
    features.push({
      type: "Feature",
      id: busDetails[bus].vehicle.id,
      properties: {
        name: actual_route_name
      },
      geometry: {
        type: "Point",
        coordinates: [
          busDetails[bus].position.longitude,
          busDetails[bus].position.latitude,
        ],
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
