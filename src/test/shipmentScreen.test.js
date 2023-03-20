const inquirer = require("inquirer");
const { ShipmentRequest } = require("../screen/shipmentScreen.js");
const { Validate} = require("../util/validator.js");

describe("Validate Challenge type", () => {
  it("should equal correct answer", async () => {
    // define the assertion counts
    expect.assertions(1);

    // mock the inquirer inputs
    inquirer.prompt = jest.fn().mockResolvedValue({ answers: "5 10 200" });

    // assert the results
    await expect(ShipmentRequest()).resolves.toEqual([
      5, 10, 200,
    ]);
  });
});

describe("Validate the Challenge type validator", () => {
  it("validate the function with validation inputs", async () => {
    expect.assertions(1);

    await expect(Validate("5 10 200")).resolves.toEqual(true);
  });

  it("check the function with validation inputs", async () => {
    expect.assertions(1);

    await expect(Validate("PKGS PKGS 100")).resolves.toEqual(
      "Incorrect input, please retry:"
    );
  });
});
