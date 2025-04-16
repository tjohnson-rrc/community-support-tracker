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





// MAIN INITIALIZATION
function init() {
    const nodes = initDomNodes();
    
    if (nodes.donationTrackerFormNode) {
        nodes.donationTrackerFormNode.addEventListener("submit", (eventObj) => {
            eventObj.preventDefault();
            handleDonationFormSubmission(nodes);
        });
    }
}


// If our runtime environment is the browser, incoke the event listener/page load
if (typeof window !== "undefined") {
    // CITATION: https://developer.mozilla.org/en-US/docs/Web/API/Window
    window.addEventListener('DOMContentLoaded', init);
} else {
    // if not, export these functions so that they can be used in external files
    module.exports = {
        collectTemporaryDonationData,
        validateDonationForm,
        validateCharityName,
        validateDonationAmount,
        validateDonationDate,
        validateDonationComment,
        displayInputError,
        escapeHTML,
        handleDonationFormSubmission,
        initDomNodes,
        init
    };
}