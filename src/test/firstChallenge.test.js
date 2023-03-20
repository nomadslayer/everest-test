const { Discount } = require("../model/discount.js");

const FirstChallenge =  (packages_to_deliver, base_delivery_cost) => {
  // define variable to hold data
  let results_to_be_printed = [];

  // iterate over packages
  for (let item in packages_to_deliver) {
    const { pkg_id, pkg_weight_perkg, distance_km, offer_code } = packages_to_deliver[item];

    // calculate the package result
    const result = base_delivery_cost + pkg_weight_perkg * 10 + distance_km * 5;

    // get the discount percentage
    let pkg_discount_percent = Discount({
      pkg_weight_perkg,
      distance_km,
      offer_code,
    });

    // calculat the discount amount
    const pkg_discount = (result * pkg_discount_percent) / 100;

    // get the results to be printed
    results_to_be_printed = [
      ...results_to_be_printed,
      [pkg_id, pkg_discount, result - pkg_discount],
    ];
  }

  // return data
  return results_to_be_printed;
};


describe("check the first problem result calculation", () => {
    it("should return the result for the first problem with three packages", async () => {
      // define assertion count
      expect.assertions(1);
  
      // define fixture data
      const packages_to_deliver = [
          {
            distance_km: 5,
            offer_code: "OFR001",
            pkg_id: "PKG1",
            pkg_weight_perkg: 5,
          },
          {
            distance_km: 5,
            offer_code: "OFR002",
            pkg_id: "PKG2",
            pkg_weight_perkg: 15,
          },
          {
            distance_km: 100,
            offer_code: "OFR003",
            pkg_id: "PKG3",
            pkg_weight_perkg: 10,
          },
        ],
        base_delivery_cost = 100;
  
      // check the assertion
      expect(
        await FirstChallenge(packages_to_deliver, base_delivery_cost)
      ).toStrictEqual([
        ["PKG1", 0, 175],
        ["PKG2", 0, 275],
        ["PKG3", 35, 665],
      ]);
    });
  });