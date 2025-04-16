const {
    collectTemporaryDonationData,
        validateDonationForm,
        validateCharityName,
        validateDonationAmount,
        validateDonationDate,
        validateDonationComment,
        displayInputError,
        escapeHTML
} = require("./script");

const { JSDOM } = require("jsdom");

// CITATION: https://jestjs.io/docs/api#describename-fn || Great (official) documentation of jest
describe("Donation Form Validation Functions", () => {
    // Test validateCharityName function
    describe("validateCharityName", () => {
        test("valid charity name returns isValid true", () => {
            // Arrange
            const validName = "Red River College";
            
            // Act
            const result = validateCharityName(validName);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("invalid charity name contains appropriate error message", () => {
            // Arrange
            const invalidName = "FED";
            
            // Act
            const result = validateCharityName(invalidName);
            
            // Assert
            expect(result.errorMessages[0].includes("that's 4 or more characters!")).toBe(true);
        });
        
        test("empty charity name returns isValid false", () => {
            // Arrange
            const emptyName = "";
            
            // Act
            const result = validateCharityName(emptyName);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
    });
});
