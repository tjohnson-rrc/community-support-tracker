// NODES AND VARIABLES
const donationTrackerFormNode = document.querySelector("#donation-tracker-form");
const charityNameInputNode = document.querySelector("#field_charity-name");
const donationAmountInputNode = document.querySelector("#field_donation-amount");
const donationDateInputNode = document.querySelector("#field_donation-date");
const donationCommentInputNode = document.querySelector("#field_donor-comment");

let temporaryDonationData = {}



// IMPLEMENTATION
donationTrackerFormNode.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    const inputsAreValid = validateDonationForm();

    if (inputsAreValid) {

        // **** PLACEHOLDER FOR FUNCTION THAT STORES TEMPORARY DATA ************8
        collectTemporaryDonationData();

        console.log(`Donation submitted: ${temporaryDonationData}`);    //PLACEHOLDER (display the temporary data along with the string) 
        donationTrackerFormNode.submit();
    } else {
        console.warn("Invalid inputs.");
    }
})

function collectTemporaryDonationData() {
    charityNameValue = escapeHTML(charityNameInputNode.value);
    donationAmountValue = escapeHTML(donationAmountInputNode.value);
    donationDateValue = donationDateInputNode.value;
    donationCommentValue = escapeHTML(donationCommentInputNode.value);

    temporaryDonationData = {
        charityName: charityNameValue,
        donationAmount: donationAmountValue,
        donationDate: donationDateValue,
        donorComment: donationCommentValue
    };

    return temporaryDonationData;
}

function validateDonationForm() {
    // removes existing error messages
    const errorMessagesNodes = document.querySelectorAll(".input-error");
    errorMessagesNodes.forEach(n => n.remove());

    let inputsAreValid = true

    // VALIDATE CHARITY NAME 
    const charityNameValue = escapeHTML(charityNameInputNode.value);
    const charityNameValidation = validateCharityName(charityNameValue, charityNameInputNode);

    if (!charityNameValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (charityNameValidation["errorMessages"].length > 0) {
        charityNameValidation["errorMessages"].forEach(m => {
            displayInputError(charityNameInputNode, m)
        });
    }


    // VALIDATE DONATION AMOUNT
    const donationAmountValue = escapeHTML(donationAmountInputNode.value);
    const donationAmountValidation = validateDonationAmount(donationAmountValue, donationAmountInputNode);

    if (!donationAmountValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (donationAmountValidation["errorMessages"].length > 0) {
        donationAmountValidation["errorMessages"].forEach(m => {
            displayInputError(donationAmountInputNode, m)
        });
    }

    // VALIDATE DATE OF DONATION
    const donationDateValidation = validateDonationDate(donationDateInputNode);

    if (!donationDateValidation["isValid"]) {
        inputsAreValid = false;
    }

    if (donationDateValidation["errorMessages"].length > 0) {
        donationDateValidation["errorMessages"].forEach(m => {
            displayInputError(donationDateInputNode, m)
        });
    }

    // VALIDATE COMMENT/MESSAGE

    
    return inputsAreValid;
}



// VALIDATIONS
function validateCharityName(input) {
    let validCharityName = true;
    const errorMessages = [];

    const charityNamePattern = /^[A-Z]{4,}$/i;
    
    const charityNameFollowsPattern = charityNamePattern.test(input);

    if (!charityNameFollowsPattern) {
        validCharityName = false;
        errorMessages.push("Please provide a charity name more than 3 alphabetical characters!");
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