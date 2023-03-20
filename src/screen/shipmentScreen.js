const inquirer = require("inquirer");
const {Validate} = require("../util/validator.js")

async function ShipmentRequest() {
  // inquirer for the number of vehicle, max speed and carriable weight value
  const { answers } = await inquirer.prompt({
    name: "answers",
    type: "input",
    message:
      "What is the Number Of Vehicles, Maximum Speed, and Maximum Carriable Weight?",
    default() {
      return "2 70 200";
    },
    validate: Validate,
  });

  // destructure the answer message
  let [no_of_vehicles_local, max_speed_local, max_carriable_weight_local] = answers.split(" ").map((e) => parseInt(e));;

  // parse the inputs to integer values
/*   no_of_vehicles_local = parseInt(no_of_vehicles_local);
  max_speed_local = parseInt(max_speed_local);
  max_carriable_weight_local = parseInt(max_carriable_weight_local); */

  // this line should be revised
  console.log(
        "Number of Vehicles:" + no_of_vehicles_local +
        "\nMax Speed Local:" + max_speed_local + 
        "\nMax Carriable Weight:" + max_carriable_weight_local);

  // return data
  return [no_of_vehicles_local, max_speed_local, max_carriable_weight_local];
}

// export function
module.exports = { ShipmentRequest };
