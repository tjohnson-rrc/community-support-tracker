const { JSDOM } = require("jsdom");

// Importing specific functions
const {
    validateEmail,
    validateRepName,
    validateEventName,
    validateEventRole,
    getEventFormData
} = require("./event-signup");
const { describe } = require("node:test");

// Unit testing for Logic

describe("Validation Functions", () => {
    test("validateEmail should reject invalid email input", () => {
        const result = validateEmail("not-valid-email");
        expect(result.isValid).toBe(false);
        expect(result.errorMessages).toContain("Please enter a valid email.");
    });
    
})