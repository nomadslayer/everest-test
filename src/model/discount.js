function Discount({
    pkg_weight_perkg,
    distance_km,
    offer_code,
  }) {
    // return discount percentage based on the inputs
    if (
      offer_code == "OFR001" &&
      distance_km <= 200 &&
      pkg_weight_perkg >= 70 &&
      pkg_weight_perkg <= 200
    ) {
      return 10;
    } else if (
      offer_code == "OFR002" &&
      distance_km >= 50 &&
      distance_km <= 150 &&
      pkg_weight_perkg >= 100 &&
      pkg_weight_perkg <= 250
    ) {
      return 7;
    } else if (
      offer_code == "OFR003" &&
      distance_km >= 50 &&
      distance_km <= 250 &&
      pkg_weight_perkg >= 10 &&
      pkg_weight_perkg <= 150
    ) {
      return 5;
    } else return 0;
  }
  
  
  // export functions
  module.exports = { Discount };