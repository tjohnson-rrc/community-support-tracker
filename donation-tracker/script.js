// NODES AND VARIABLES
const donationTrackerFormNode = document.querySelector("#donation-tracker-form");
const charityNameInputNode = document.querySelector("#field_charity-name");
const donationAmountInputNode = document.querySelector("#field_donation-amount");
const donationDateInputNode = document.querySelector("#field_donation-date");
const donationCommentInputNode = document.querySelector("#field_donor-comment");

let temporaryDonationData = {}


// IMPLEMENTATION





// VALIDATIONS






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