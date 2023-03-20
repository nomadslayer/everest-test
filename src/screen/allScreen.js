const inquiry = require("inquirer");

async function welcome() {
    // display the welcome message
    console.log(`
          Welcome to Small Distance Courier Service
          Please fill the information below
          `);
  }
  
  async function goodbye() {
      // print the goodbye message
      console.log(`
              "Thanks and Good Bye!"`);
  }

async function userInput() {
  const { selection } = await inquiry.prompt({
    name: 'selection',
    type: "list",
    message: "Please Choose the Challenge Type \n",
    choices: ["First Challenge", "Second Challenge", "Exit"],
  });
  
    // return the challenge type
    return selection;
}
  
// export functions
module.exports = { welcome, goodbye, userInput };
