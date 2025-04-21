const { JSDOM } = require("jsdom");

// Importing specific functions
import {
    validateEventName,
    validateRepName,
    validateEmail,
    validateEventRole,
    getEventFormData
} from "./event-signup";
const { describe } = require("node:test");

// Unit testing for Logic

describe("Form Validation Functions", () => {

    // validateEventName
    test("validateEventName: fails if event name input is invalid", () => {

        // Arrange
        const input = "";

        // Act
        const result = validateEventName(input);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errorMessages).toContain("Please enter the community event name.");  
    });

    test("validateRepName: fails if representative name input is invalid", () => {
        // Arrange
        const input = "";

        // Act
        const result = validateRepName(input);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errorMessages).toContain("Please enter the name of the Representative.");
    });
    
})