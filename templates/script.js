function addNumbers(num1, num2) {
    return num1 + num2;
}

// if our runtime environment is the browser, invoke init
if(typeof window !== "undefined") {
    init();
} else {
    // if not, export these functions so that they can be used in external files
    // no error is thrown because init() is never invoked
    module.exports = { addNumbers };
}
