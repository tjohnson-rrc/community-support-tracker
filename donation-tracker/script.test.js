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
            // includes returns a boolean!
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

    // Test validateDonationAmount function
    describe("validateDonationAmount", () => {
        test("valid simple donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "100";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid decimal donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "1000.50";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid dollar sign donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "$100";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid comma separated donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "$1,000.00";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("invalid text donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "abc";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("invalid donation amount symbol placement returns isValid false", () => {
            // Arrange
            const invalidAmount = "100$";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("negative donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "-100";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });

        test("empty donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
    });

    

});
