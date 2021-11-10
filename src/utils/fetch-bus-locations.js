export const updateBusData = async () => {
    // grabs live bus data and their location
    try {
      const response = await fetch(
        "https://s3.amazonaws.com/kcm-alerts-realtime-prod/vehiclepositions_pb.json"
      );
      const json = await response.json();
      // console.log(json.entity[0].vehicle.position); // test 1 bus for now
      
      const bus_details = []
      for (bus in json.entity) {
        // console.log(json.entity[bus].vehicle)
        bus_details.push(json.entity[bus].vehicle)
      }

      return bus_details;
    } catch (err) {
      console.error(err);
    }
};
