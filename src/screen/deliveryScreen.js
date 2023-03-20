const Inquirer = require("inquirer");
const {Validate} = require("../util/validator.js")

async function DeliveryRequest() {
  // inquirer the delivery cost and numbe of packages
const { response } = await Inquirer.prompt({
    name: "response",
    type: "input",
    message: "Please provide the base delivery cost and the amount of packages?",
    default() {
      return "10 5";
    },
    validate: Validate,
  }); 


  // destructure the inputs
  let [base_delivery_cost, no_of_packages] = response.split(" ").map((e) => parseInt(e));;

  // parse the inputs to integer values
/*   base_delivery_cost = parseInt(base_delivery_cost);
  no_of_packges = parseInt(no_of_packges); */

  console.log(
        "\n Base Delivery Cost: " + base_delivery_cost +
        "\n Number of Packages: " + no_of_packages);

  // return the inputs
  return [base_delivery_cost, no_of_packages];
}

// export the functions
module.exports = { DeliveryRequest};
