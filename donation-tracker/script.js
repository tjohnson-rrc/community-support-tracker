// NODES AND VARIABLES
let temporaryDonationData = {};

// Initialize the DOM nodes after the document is loaded (invoked at the bottom)
function initDomNodes() {
    return {
        donationTrackerFormNode: document.querySelector("#donation-tracker-form"),
        charityNameInputNode: document.querySelector("#field_charity-name"),
        donationAmountInputNode: document.querySelector("#field_donation-amount"),
        donationDateInputNode: document.querySelector("#field_donation-date"),
        donationCommentInputNode: document.querySelector("#field_donor-comment"),
    };
}

// MAIN INITIALIZATION
// this gets invoked all the way at the bottom of script
function init() {
    const nodes = initDomNodes();
    
    if (nodes.donationTrackerFormNode) {
        nodes.donationTrackerFormNode.addEventListener("submit", (eventObj) => {
            eventObj.preventDefault();
            handleDonationFormSubmission(nodes);
        });
    }
}

// Form submission handler
function handleDonationFormSubmission(nodes) {
    const inputsAreValid = validateDonationForm(nodes);

    if (inputsAreValid) {

        // FUNCTION THAT STORES TEMPORARY DATA 
        collectTemporaryDonationData(nodes);
        // Displays the temporary donation data when user submits  
        console.log("Donation submitted: ", temporaryDonationData);

        // Set a timeout just to see the console.log before page refreshes
        // for testing purposes 
        setTimeout(() => {
            nodes.donationTrackerFormNode.submit();
        }, 15000);

    } else {
        console.warn("Invalid inputs.");
    }
}

// IMPLEMENTATION
function collectTemporaryDonationData(nodes) {
    const charityNameValue = escapeHTML(nodes.charityNameInputNode.value);
    const donationAmountValue = escapeHTML(nodes.donationAmountInputNode.value);
    const donationDateValue = nodes.donationDateInputNode.value;
    const donationCommentValue = escapeHTML(nodes.donationCommentInputNode.value.trim());

    // This is grabbing the global variable invoked at topp and assigning new values.
    temporaryDonationData = {
        charityName: charityNameValue,
        donationAmount: donationAmountValue,
        donationDate: donationDateValue,
        donorComment: donationCommentValue
    };

    return temporaryDonationData;
}

function validateDonationForm(nodes) {
    // Removes existing error messages
    const errorMessagesNodes = document.querySelectorAll(".input-error");
    errorMessagesNodes.forEach(n => n.remove());

    let inputsAreValid = true

    // VALIDATE CHARITY NAME 
    const charityNameValue = escapeHTML(nodes.charityNameInputNode.value);
    const charityNameValidation = validateCharityName(charityNameValue, nodes.charityNameInputNode);

    if (!charityNameValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (charityNameValidation["errorMessages"].length > 0) {
        charityNameValidation["errorMessages"].forEach(m => {
            displayInputError(nodes.charityNameInputNode, m)
        });
    }

    // VALIDATE DONATION AMOUNT
    const donationAmountValue = escapeHTML(nodes.donationAmountInputNode.value);
    const donationAmountValidation = validateDonationAmount(donationAmountValue, nodes.donationAmountInputNode);

    if (!donationAmountValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (donationAmountValidation["errorMessages"].length > 0) {
        donationAmountValidation["errorMessages"].forEach(m => {
            displayInputError(nodes.donationAmountInputNode, m)
        });
    }

    // VALIDATE DATE OF DONATION
    const donationDateValidation = validateDonationDate(nodes.donationDateInputNode);

    if (!donationDateValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (donationDateValidation["errorMessages"].length > 0) {
        donationDateValidation["errorMessages"].forEach(m => {
            displayInputError(nodes.donationDateInputNode, m)
        });
    }

    // VALIDATE COMMENT/MESSAGE
    const donationCommentValue = escapeHTML(nodes.donationCommentInputNode.value);
    const donationCommentValidation = validateDonationComment(donationCommentValue, nodes.donationCommentInputNode);

    if (!donationCommentValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (donationCommentValidation["errorMessages"].length > 0) {
        donationCommentValidation["errorMessages"].forEach(m => {
            displayInputError(nodes.donationCommentInputNode, m)
        });
    }

    return inputsAreValid;
}

// VALIDATIONS
function validateCharityName(input) {
    let validCharityName = true;
    const errorMessages = [];

    const charityNamePattern = /^[A-Za-z]([a-zA-Z0-9 ]|[- @\.#&!]){3,}$/;
    
    const charityNameFollowsPattern = charityNamePattern.test(input);

    if (!charityNameFollowsPattern) {
        validCharityName = false;
        errorMessages.push("Please provide a valid charity name that's 4 or more characters!");
    }

    return {
        isValid: validCharityName,
        errorMessages: errorMessages};
}

function validateDonationAmount(input) {
    let validDonationAmount = true;
    const errorMessages = [];

    // CITATION: https://stackoverflow.com/questions/16242449/regex-currency-validation
    const donationAmountPattern = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;

    const donationAmountFollowsPattern = donationAmountPattern.test(input);

    if (!donationAmountFollowsPattern) {
        validDonationAmount = false;
        errorMessages.push("Please provide a valid donation amount!");
    }

    return {
        isValid: validDonationAmount,
        errorMessages: errorMessages};
}

function validateDonationDate(input) {
    let validDonationDate = true;
    const errorMessages = [];
    const selectedDate = input.value;

    // Getting todays date in YYYY-MM-DD format
    // CITATION for Date : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];

    if (!selectedDate) { // checks if user inputted anything at all
        validDonationDate = false;
        errorMessages.push("Please select a date of when the donation was made!");
    } else if (selectedDate > formattedToday) { // checks if the date selected is a FUTURE date
        validDonationDate = false;
        errorMessages.push("Please select a date that isn't in the future!")
    }

    return {
        isValid: validDonationDate,
        errorMessages: errorMessages};
}

function validateDonationComment(input) {
    let validDonationComment = true;
    const errorMessages = [];

    if (!input.trim()) {
        validDonationComment = false;
        errorMessages.push("Please provide a donation comment!");
    } else if (input.length > 200) {
        validDonationComment = false;
        errorMessages.push("Comment must be less than 200 characters!");
    }

    return {
        isValid: validDonationComment,
        errorMessages: errorMessages};
}

// HELPER FUNCTIONS
function displayInputError(inputElement, message) {
    let inputParentNode = inputElement.closest(".input-container");
    const errorDisplayNode = document.createElement("span");

    if (!inputParentNode) {
        inputParentNode = inputElement.parentElement;
    }
    
    errorDisplayNode.textContent = message;
    errorDisplayNode.classList.add("input-error");

    errorDisplayNode.setAttribute("role", "alert");

    inputParentNode.appendChild(errorDisplayNode);
}

function escapeHTML(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
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