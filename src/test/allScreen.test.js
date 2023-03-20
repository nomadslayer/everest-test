const { welcome, goodbye, userInput } = require("../screen/allScreen.js");
const inquiry = require("inquirer");

describe("Validate Welcome Screen can be displayed", () => {
  it("Welcome to Small Distance Courier Service", () => {
    // define the assertion count
    const value = jest.spyOn(global.console, 'log');
    console.log(welcome());
    expect(value).toHaveBeenCalledWith(welcome());
  });

  it('Thanks and Good Bye!', () => {
      
    const value = jest.spyOn(global.console, 'log');
    console.log(goodbye());
    expect(value).toHaveBeenCalledWith(goodbye());
  });
});

describe("Validate choose the Challenge type", () => {
    it("should equal Exit", async () => {
      // define the assertion count
      expect.assertions(1);

      // mock the inquirer asnwer
      inquiry.prompt = jest.fn().mockResolvedValue({ selection: "Exit" });

      // make the assertions
      await expect(userInput()).resolves.toEqual("Exit");
    });

    it("should equal First Challenge", async () => {
      // define the assertion count
      expect.assertions(1);
  
      // mock the inquirer asnwer
      inquiry.prompt = jest
        .fn()
        .mockResolvedValue({ selection: "First Challenge" });
  
      // make the assertion
      await expect(userInput()).resolves.toEqual("First Challenge");
    });
  
    it("should equal Second Challenge", async () => {
      // define the assertion count
      expect.assertions(1);
  
      // mock the inquirer asnwer
      inquiry.prompt = jest
        .fn()
        .mockResolvedValue({ selection: "Second Challenge" });
  
      // make
      await expect(userInput()).resolves.toEqual("Second Challenge");
    });
  });