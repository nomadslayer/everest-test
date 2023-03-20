const inquirer = require("inquirer");
const { DeliveryRequest} = require("../screen/deliveryScreen.js");

describe("check choose Delivery Request functionality", () => {
  it("should equal the default value", async () => {
    // define the assertion counts
    expect.assertions(1);

    // mock the inquirer asnwer
    inquirer.prompt = jest.fn().mockResolvedValue({ response: "100 5" });

    // make the assertions
    await expect(DeliveryRequest()).resolves.toEqual([100, 5]);
  });
  it("should equal the delivery cost and number of packages", async () => {
    // define the assertion counts
    expect.assertions(1);

    // mock the inquirer asnwer
    inquirer.prompt = jest.fn().mockResolvedValue({ response: "50 5" });

    // make the assertions
    await expect(DeliveryRequest()).resolves.toEqual([50, 5]);
  });
});


