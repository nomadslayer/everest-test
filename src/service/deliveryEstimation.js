function DeliveryEstimation({
    packages,
    no_of_vehicles,
    max_speed,
  }) {
    // create vehicle status array and initialize based on vehicle number
    const vehicle_status_array = [];
    vehicle_status_array.length = no_of_vehicles;
    vehicle_status_array.fill(0);
  
    // loop over all packages combinations
    const pkgs_estimation = packages.map((pkg) => {
      // get the estimation time
      const all_estimations = pkg.itemsArr.map(
        (item) => parseFloat((item.distance_km / max_speed) * 100) / 100
      );
  
      // allocate a vehicle
      const available_vehicle = Math.min(...vehicle_status_array);
  
      // get the index of vehicle
      const available_vehicle_index =
        vehicle_status_array.indexOf(available_vehicle);
  
      // time to travel and come back to office
      const time_to_travel = Math.max(...all_estimations) * 2;
  
      // change the vehicle status
      vehicle_status_array[available_vehicle_index] = available_vehicle + time_to_travel;
  
      // return the data with apropriate structure
      return {
        total_weight: pkg.total_weight,
        itemsArr: pkg.itemsArr.map((item) => {
          const total_estimated_time =
            parseFloat((item.distance_km / max_speed) * 100) / 100 + available_vehicle;
  
          const result = {
            ...item,
            total_estimated_time: Math.floor(total_estimated_time * 100) / 100,
          };
  
          return result;
        }),
      };
    });
  
    // return data
    return pkgs_estimation;
  }
  
  // export function
  module.exports = { DeliveryEstimation };
  