const { Discount } = require("../model/discount.js");

async function PackageDelivery({
  packages_to_deliver,
  base_delivery_cost,
}) {
  // define variable to hold data
  let results_to_be_printed = [];

  // iterate over packages
  for (let item in packages_to_deliver) {
    const { pkg_id, pkg_weight_perkg, distance_km, offer_code } =
      packages_to_deliver[item];

    // calculate the package result
    const result =
      base_delivery_cost + pkg_weight_perkg * 10 + distance_km * 5;

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
}

// export function
module.exports = { PackageDelivery };