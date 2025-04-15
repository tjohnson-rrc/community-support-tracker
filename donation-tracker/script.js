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
    donationTrackerFormNode.submit();
    
    const inputsAreValid = validateDonationForm();

    if (inputsAreValid) {
        // **** PLACEHOLDER FOR FUNCTION THAT STORES TEMPORARY DATA ************8

        console.log("Donation submitted: ");    //PLACEHOLDER (display the temporary data along with the string) 
        donationTrackerFormNode.submit();
    } else {
        console.warn("Invalid inputs.");
    }
})

function validateDonationForm() {
    // removes existing error messages
    const errorMessagesNodes = document.querySelectorAll(".input-error");
    errorMessagesNodes.forEach(n => n.remove());

    const inputsAreValid = true

    // PLACEHOLDERS VVVVV
    // VALIDATE CHARITY NAME 
    


    // VALIDATE DONATION AMOUNT



    // VALIDATE DATE OF DONATION



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
        errorMessages.push("Please provide a charity name more than 4 alphabetical characters.");
    }

    return {
        isValid: validCharityName,
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