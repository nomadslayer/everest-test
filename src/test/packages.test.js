const inquirer = require("inquirer");
const { PackagesInformation, validator } = require("../model/packages.js");

describe("Validate the Packages", () => {
  it("Validate the function with no packages", async () => {
    // define number of iterations
    const no_of_packages = 0;

    // mock
    inquirer.prompt = jest.fn().mockResolvedValue({});

    // make the assertions count
    await expect(PackagesInformation({ no_of_packages })).resolves.toEqual([]);
  }); 
  
  it("validate the function with 3 input", async () => {
    // define number of packages
    const no_of_packages = 3;

    // mock the inquirer asnwer
    inquirer.prompt = jest
      .fn()
      .mockResolvedValueOnce({ answers: "PKG1 10 10 OFR001" })
      .mockResolvedValueOnce({ answers: "PKG2 15 5 OFR002" })
      .mockResolvedValueOnce({ answers: "PKG3 10 100 OFR003" });

    //  make the assertions
    await expect(PackagesInformation({ no_of_packages })).resolves.toEqual([
      {
        distance_km: 10,
        offer_code: "OFR001",
        pkg_id: "PKG1",
        pkg_weight_perkg: 10,
      },
      {
        distance_km: 5,
        offer_code: "OFR002",
        pkg_id: "PKG2",
        pkg_weight_perkg: 15,
      },
      {
        distance_km: 100,
        offer_code: "OFR003",
        pkg_id: "PKG3",
        pkg_weight_perkg: 10,
      },
    ]);
  });
});

describe("Validate the package validator", () => {
  it("check the function with valid inputs", async () => {
    // define the assertion count
    expect.assertions(1);

    // mock the inquirer asnwer
    inquirer.prompt = jest.fn().mockResolvedValue({});
    // make the assertions
    await expect(validator("PKG1 5 5 OFR001")).resolves.toEqual(true);
  });

  it("check the function incorrect input message", async () => {
    // define the assertions count
    expect.assertions(1);

    // mock the inquirer asnwer
    inquirer.prompt = jest.fn().mockResolvedValue({});

    // make the assertions
    await expect(validator("PKG1 PKG1 PKG1 PKG1")).resolves.toEqual(
      "Incorrect input, please retry:"
    );
  });
});
