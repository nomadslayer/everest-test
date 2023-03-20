const inquirer = require("inquirer");

// inquirer validation function
const validator = async (input) => {
  // distrcture inputs
  let [pkg_id, pkg_weight_perkg, distance_km] = input.split(" ");

  // parse inputs to integer values
  pkg_weight_perkg = parseInt(pkg_weight_perkg);
  distance_km = parseInt(distance_km);

  // check if the data is valid
  if (!pkg_id || !pkg_weight_perkg || !distance_km ||
    typeof pkg_weight_perkg !== "number" || typeof distance_km !== "number" ||
    isNaN(pkg_weight_perkg) || isNaN(distance_km)
  )
    return "Incorrect input, please retry:";

  // return true if data is valid
  return true;
};

async function PackagesInformation({ no_of_packages }) {
  // define variable to hold the packages information
  let packages_to_deliver = [];

  // get the packages information based on the number packages
  for (let i = 0; i < no_of_packages; i++) {
    // ask user for the input
    const { answers } = await inquirer.prompt({
      name: "answers",
      type: "input",
      message:
        "What is the package ID, weight, distance and offer code if exists?",
      default() {
        return "PKG1 5 5 OFR001";
      },
      validate: validator,
    });



    // destrcture the inputs
    let [pkg_id, pkg_weight_perkg, distance_km, offer_code] = answers.split(" ");

    // parse the inputs to integer values
    pkg_weight_perkg = parseInt(pkg_weight_perkg);
    distance_km = parseInt(distance_km);

    console.log(
        "Package ID:" + pkg_id +
        "\nWeight:" + pkg_weight_perkg + "KG\n" +
        "Distance:" + distance_km + "KM\n" +
        "Offer code:" + offer_code ?? "NA\n")

    // push data to the current array
    packages_to_deliver = [
      ...packages_to_deliver,
      {
        pkg_id,
        pkg_weight_perkg,
        distance_km,
        offer_code,
      },
    ];
  }

  // return data
  return packages_to_deliver;
}

// export function
module.exports = { PackagesInformation, validator };
