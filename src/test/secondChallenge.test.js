const { PackageRoute } = require("../service/packageRoute.js");
const { DeliveryEstimation } = require("./../service/deliveryEstimation.js");
const { Discount } = require("../model/discount.js");
  
  const SecondChallenge = (    
    packages_to_deliver,
    max_carriable_weight,
    no_of_vehicles,
    max_speed,
    base_delivery_cost,) => {

    // get the most optimze packages combinations and calculate the times
    const packages = PackageRoute({
      packages_to_deliver,
      max_carriable_weight,
    });
  
    // calculate the delivery estimation amount
    const package_routes_with_estimation = DeliveryEstimation({
      packages,
      no_of_vehicles,
      max_speed,
      base_delivery_cost,
    });
  
    // define variable to hold sorted values
    let sorted_package_routes = [];
  
    // destructure data to have a stable structure - Loadash could be useful in these lines
    package_routes_with_estimation.map((item) => {
      sorted_package_routes = [...sorted_package_routes, ...item.itemsArr];
    });
  
    // sort the data based on the packages ids
    sorted_package_routes = sorted_package_routes.sort((a, b) => {
      let fa = a.pkg_id.toLowerCase(),
        fb = b.pkg_id.toLowerCase();
  
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      if(fa===fb)
        return 0;
    });
  
    // add discount amount to the current packages variable
    const results_to_be_printed = sorted_package_routes.map((el) => {
      const {
        pkg_id,
        pkg_weight_perkg,
        distance_km,
        offer_code,
        total_estimated_time,
      } = el;
  
      // calculate the cost
      const result =
        base_delivery_cost + pkg_weight_perkg * 10 + distance_km * 5;
  
      // get the discount
      let pkg_discount_percent = Discount({
        pkg_weight_perkg,
        distance_km,
        offer_code,
      });
  
      // calculate the discount amount
      const pkg_discount = (result * pkg_discount_percent) / 100;
  
      // return data
      return [pkg_id, pkg_discount, result - pkg_discount, total_estimated_time];
    });
  
    // return data
    return results_to_be_printed;
  };
  

  describe("check the second problem result calculation", () => {
    it("should return the result for the second problem with five packages", async () => {
      //  define the assertions counts
      expect.assertions(1);
  
      // define the fixture data
      const packages_to_deliver = [
          {
            pkg_id: "PKG1",
            pkg_weight_perkg: 50,
            distance_km: 30,
            offer_code: "OFR001",
          },
          {
            pkg_id: "PKG2",
            pkg_weight_perkg: 75,
            distance_km: 125,
            offer_code: "OFR008",
          },
          {
            pkg_id: "PKG3",
            pkg_weight_perkg: 175,
            distance_km: 100,
            offer_code: "OFR003",
          },
          {
            pkg_id: "PKG4",
            pkg_weight_perkg: 110,
            distance_km: 60,
            offer_code: "OFR002",
          },
          {
            pkg_id: "PKG5",
            pkg_weight_perkg: 155,
            distance_km: 95,
            offer_code: "NA",
          },
        ],
        max_carriable_weight = 200,
        no_of_vehicles = 2,
        max_speed = 70,
        base_delivery_cost = 100;
  
      // make the assertions
      expect(
        await SecondChallenge(
          packages_to_deliver,
          max_carriable_weight,
          no_of_vehicles,
          max_speed,
          base_delivery_cost
        )
      ).toStrictEqual([
        ["PKG1", 0, 750, 4.00],
        ["PKG2", 0, 1475, 1.78],
        ["PKG3", 0, 2350, 1.42],
        ["PKG4", 105, 1395, 0.85],
        ["PKG5", 0, 2125, 4.21],
      ]);
    });
  });
  
