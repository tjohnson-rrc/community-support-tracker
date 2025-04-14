// import functions from another file for use in this one
const {addNumbers} = require("./template-script");

// "function-context-expected outcome"
test("addNumbers with correct arguments returns a sum", () => {
    // arrange
    const operandOne = 10;
    const operandTwo = 20;

    // act
    const returnedValue = addNumbers(operandOne, operandTwo);

    // assert
    expect(returnedValue).toBe(30);
});