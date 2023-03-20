const { welcome, goodbye, userInput } = require("./screen/allScreen.js");
const { PackagesInformation} = require("./model/packages.js");
const { PackageDelivery} = require("./service/packageDelivery.js");
const { ShipmentDelivery} = require("./service/shipmentDelivery.js");
const { DeliveryRequest } = require("./screen/deliveryScreen.js");
const { ShipmentRequest } = require("./screen/shipmentScreen.js");
const { printTable } = require('console-table-printer');

// define a self invoking function to have simulate a async operation
(async () => {
    // clear the console of everthing
    console.clear();
  
    // display welcome message
    await welcome();
  
    // show the options while user choose to
    while (true) {
      // get the user input
      let input = await userInput();
  
      // choose excution path based on user answer
      switch (input) {
        case "First Challenge": {
          // get the base delivery cost and number of packages available
          let [base_delivery_cost, no_of_packages] = await DeliveryRequest();
    
          // get the packages info based on the number of packages
          let packages_to_deliver = await PackagesInformation({ no_of_packages });
    
          // calcualte the final results to be printed
          const calculated_results = await PackageDelivery({
            packages_to_deliver,
            base_delivery_cost,
          });
    
          // define the display structure
          function showResultStructure(pkg_id, discount, total_cost) {
            this.pkg_id = pkg_id;
            this.discount = discount;
            this.total_cost = total_cost;
          }
    
          // populate the display structure with the results
          const results_to_be_printed = calculated_results.map(
            (item) => new showResultStructure(...item)
          );
    
          // print the results to the console
          await printTable(results_to_be_printed);
          //await console.log(table.toString());
  
          break;}

        case "Second Challenge":{
          // get the base delivery cost and number of packages available

          let [base_delivery_cost, no_of_packages] = await DeliveryRequest();
    
          // get the packages info based on the number of packages
          packages_to_deliver = await PackagesInformation({ no_of_packages });

          // get the number of vehicle, max speed and max carriable weight
          let [no_of_vehicles, max_speed, max_carriable_weight] = await ShipmentRequest();

           // calcualte the final results to be printed
          const calculated_results = await ShipmentDelivery({
            packages_to_deliver,
            max_carriable_weight,
            no_of_vehicles,
            max_speed,
            base_delivery_cost,
          });

          // define the display structure
          function showResultStructure(
            pkg_id,
            discount,
            total_cost,
            estimated_delivery
          ) {
            this.pkg_id = pkg_id;
            this.discount = discount;
            this.total_cost = total_cost;
            this.estimated_delivery = estimated_delivery;
          }
          // populate the display structure with the results

          const results_to_be_printed = calculated_results.map(
            (item) => new showResultStructure(...item)
          );

          // print the results to the console
          await printTable(results_to_be_printed);
          //await console.log(table.toString());
          //await console.table(results_to_be_printed);
          break;}

        case "Exit": 
          // print the goodbye message
          await goodbye();
          // terimate the process
          process.exit();
          break;
      }
    }
})();