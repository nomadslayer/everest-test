const inquirer = require("inquirer");
const { Validate} = require("../util/validator.js");

describe("Validate the input validator", () => {
    it("check the function with validation inputs", async () => {
      // define the assertion count
      expect.assertions(1);
  
      // make the assertions
      await expect(Validate("50 3")).resolves.toEqual(true);
    });
  
    it("check the function with validation inputs", async () => {
      // define the assertion count
      expect.assertions(1);
  
      // make the assertions
      await expect(Validate("PKGS PKGS")).resolves.toEqual(
        "Incorrect input, please retry:"
      );
    });
  });