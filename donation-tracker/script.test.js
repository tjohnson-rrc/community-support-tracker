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

    
    // Test validateDonationDate function
    // may see me isnerting objects WITH a value property in some of the tests for date.
    // That is because the validation function for date expects that input.
    describe("validateDonationDate", () => {
        test("valid date (today) returns isValid true", () => {
            // Arrange
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate({ value: formattedToday });
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid date (past) returns isValid true", () => {
            // Arrange
            const pastDate = "2023-01-15";
            
            // Act
            const result = validateDonationDate({ value: pastDate });
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("future date returns isValid false", () => {
            // Arrange
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow = tomorrow.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate(formattedTomorrow);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("future date error message contains correct text", () => {
            // Arrange
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow = tomorrow.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate({ value: formattedTomorrow });
            
            // Assert
            expect(result.errorMessages[0].includes("a date that isn't in the future!")).toBe(true);
        });
        
        test("empty date returns isValid false", () => {
            // Arrange
            const emptyDate = "";
            
            // Act
            const result = validateDonationDate(emptyDate);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
    });

});
