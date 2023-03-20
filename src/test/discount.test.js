const { Discount } = require("../model/discount.js");

describe("validate discount functionality", () => {
    it("should return the discount percentage 10 100 OFR003", async () => {
        //  define fixture data
        const pkg_weight_perkg = 10,
        distance_km = 100,
            offer_code = "OFR003";

        // make the assertions
        expect(
            Discount({ pkg_weight_perkg, distance_km, offer_code })
        ).toBe(5);
        });
  it("should expect the discount 5 5 OFR001", async () => {
    // define fixture data
    const pkg_weight_perkg = 5,
      distance_km = 5,
      offer_code = "OFR001";

    // make the assertions
    expect(
      Discount({ pkg_weight_perkg, distance_km, offer_code })
    ).toBe(0);
  });
  it("should return the discount percentage 15 5 OFR002", async () => {
    // define fixture data
    const pkg_weight_perkg = 15,
    distance_km = 5,
      offer_code = "OFR002";

    // make the assertions
    expect(
        Discount({ pkg_weight_perkg, distance_km, offer_code })
    ).toBe(0);
  });

});
