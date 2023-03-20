const { DeliveryEstimation } = require("../service/deliveryEstimation.js");
  
  describe("validate delivery estimation", () => {
    it("should return the result for delivery estimation calculation with multiple inputs", async () => {
      // define the assertion counts
      expect.assertions(1);
  
      // define the fixtures
      let packages = [
          {
            total_weight: 0,
            itemsArr: [
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
          },
        ],
        no_of_vehicles = 2,
        max_speed = 70;
  
      // make the assertions
      expect(
        await DeliveryEstimation({
          packages,
          no_of_vehicles,
          max_speed,
        })
      ).toStrictEqual([
        {
          total_weight: 0,
          itemsArr: [
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 50,
              distance_km: 30,
              offer_code: "OFR001",
              total_estimated_time: 0.42,
            },
            {
              pkg_id: "PKG2",
              pkg_weight_perkg: 75,
              distance_km: 125,
              offer_code: "OFR008",
              total_estimated_time: 1.78,
            },
            {
              pkg_id: "PKG3",
              pkg_weight_perkg: 175,
              distance_km: 100,
              offer_code: "OFR003",
              total_estimated_time: 1.42,
            },
            {
              distance_km: 60,
              offer_code: "OFR002",
              pkg_id: "PKG4",
              pkg_weight_perkg: 110,
              total_estimated_time: 0.85,
            },
            {
              distance_km: 95,
              offer_code: "NA",
              pkg_id: "PKG5",
              pkg_weight_perkg: 155,
              total_estimated_time: 1.35,
            },
          ],
        },
      ]);
    });
    it("should return the result for delivery estimation calculation with three inputs", async () => {
      // define the assertions counts
      expect.assertions(1);
  
      // define the fixture data
      let packages = [
          {
            total_weight: 25,
            itemsArr: [
              {
                pkg_id: "PKG1",
                pkg_weight_perkg: 5,
                distance_km: 5,
                offer_code: "OFR001",
              },
              {
                pkg_id: "PKG1",
                pkg_weight_perkg: 5,
                distance_km: 5,
                offer_code: "OFR001",
              },
              {
                pkg_id: "PKG1",
                pkg_weight_perkg: 5,
                distance_km: 5,
                offer_code: "OFR001",
              },
              {
                pkg_id: "PKG1",
                pkg_weight_perkg: 5,
                distance_km: 5,
                offer_code: "OFR001",
              },
              {
                pkg_id: "PKG1",
                pkg_weight_perkg: 5,
                distance_km: 5,
                offer_code: "OFR001",
              },
            ],
          },
        ],
        no_of_vehicles = 2,
        max_speed = 70;
  
      // make the assertions
      expect(
        await DeliveryEstimation({
          packages,
          no_of_vehicles,
          max_speed,
        })
      ).toStrictEqual([
        {
          total_weight: 25,
          itemsArr: [
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 5,
              distance_km: 5,
              offer_code: "OFR001",
              total_estimated_time: 0.07,
            },
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 5,
              distance_km: 5,
              offer_code: "OFR001",
              total_estimated_time: 0.07,
            },
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 5,
              distance_km: 5,
              offer_code: "OFR001",
              total_estimated_time: 0.07,
            },
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 5,
              distance_km: 5,
              offer_code: "OFR001",
              total_estimated_time: 0.07,
            },
            {
              pkg_id: "PKG1",
              pkg_weight_perkg: 5,
              distance_km: 5,
              offer_code: "OFR001",
              total_estimated_time: 0.07,
            },
          ],
        },
      ]);
    });
  });
  