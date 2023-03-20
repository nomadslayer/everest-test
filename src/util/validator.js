const Validate = async (input) => {
    // destructure inputs
    let userInput = input.split(" ");
    for(let i=0; i<userInput.length; i++){
        checkValue = parseInt(userInput[i]);
        if(!checkValue || typeof checkValue !== "number" || isNaN(checkValue)) {
            return "Incorrect input, please retry:";
        }
    }  

    return true;
};

module.exports = { Validate };