const { PackageRoute } = require("../service/packageRoute");
  
  describe("Validate the package route", () => {
    it("should return the result for the package routing", async () => {
      // define the assertion counts
      expect.assertions(1);
  
      // define the fixture
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
        max_carriable_weight = 200;
  
      // make the assertions
      expect(
        await PackageRoute({
          packages_to_deliver,
          max_carriable_weight,
        })
      ).toStrictEqual([
        {
          itemsArr: [
            {
              distance_km: 60,
              offer_code: "OFR002",
              pkg_id: "PKG4",
              pkg_weight_perkg: 110,
            },
            {
              distance_km: 125,
              offer_code: "OFR008",
              pkg_id: "PKG2",
              pkg_weight_perkg: 75,
            },
          ],
          total_weight: 185,
        },
  
        {
          itemsArr: [
            {
              distance_km: 100,
              offer_code: "OFR003",
              pkg_id: "PKG3",
              pkg_weight_perkg: 175,
            },
          ],
          total_weight: 175,
        },
        {
          itemsArr: [
            {
              distance_km: 95,
              offer_code: "NA",
              pkg_id: "PKG5",
              pkg_weight_perkg: 155,
            },
          ],
          total_weight: 155,
        },
        {
          itemsArr: [
            {
              distance_km: 30,
              offer_code: "OFR001",
              pkg_id: "PKG1",
              pkg_weight_perkg: 50,
            },
          ],
          total_weight: 50,
        },
      ]);
    });
  });
  