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

test('validateCharityName valid charity name returns isValid true', () => {
    // Arrange
    const validName = "RedCross";
    
    // Act
    const result = validateCharityName(validName);
    
    // Assert
    expect(result.isValid).toBe(true);
});

// CITATION: https://jestjs.io/docs/api#describename-fn | Great (official) documentation of jest

