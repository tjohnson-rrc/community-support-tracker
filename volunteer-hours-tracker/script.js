// nodes and variables //
let temporaryVolunteerData = {};

// setting up DOM nodes once the document is officially loaded //
function initDomNodes() {
    return {
        volunteerFormNode: document.querySelector("#volunteer-hours-form"),
        charityNameInputNode: document.querySelector("#field_charity-name"),
        hoursVolunteeredInputNode: document.querySelector("#field_hours-volunteered"),
        volunteeringDateInputNode: document.querySelector("#field_volunteering-date"),
        experienceRatingInputNodes: document.querySelectorAll("input[name='volunteer-rating']")
    };
}

// setting up the main part initial //
function init() {
    const nodes = initDomNodes();

    if (nodes.volunteerFormNode) {
        nodes.volunteerFormNode.addEventListener("submit", (eventObj) => {
            eventObj.preventDefault();
            handleVolunteerFormSubmission(nodes);
        });
    }
}

// handling form submissions //
function handleVolunteerFormSubmission(nodes) {
    const inputsAreValid = validVolunteerForm(nodes);

    if (inputsAreValid) {
        collectTemporaryVolunteerData(nodes);
        console.log("Volunteer log submitted: ", temporaryVolunteerData);

        // making a delay for the testing //
        setTimeout(() => {
            nodes.volunteerFormNode.submit();
        }, 15000);
    } else {
        console.warn("Invalid inputs.")
    }
}

// setting to collect the form data //
function collectTemporaryVolunteerData(nodes) {
    const charityName = escapeHTML(nodes.charityNameInputNode.value);
    const hoursVolunteered = escapeHTML(nodes.hoursVolunteeredInputNode.value);
    const volunteeringDate = nodes.volunteeringDateInputNode.value;
    const rating = getselectedRating(nodes.experienceRatingInputNodes);

    temporaryVolunteerData = {
        charityName,
        hoursVolunteered,
        volunteeringDate,
        rating
    };
    
    return temporaryVolunteerData;
}

// setting up a better validation //
function validateVolunteerForm(nodes) {
    const errorNodes = document.querySelectorAll(".input-error");
    errorNodes.forEach(n => n.remove());

    let inputsAreValid = true;

    const charityNameValue = escapeHTML(nodes.charityNameInputNode.value);
    const hoursVolunteeredValue = escapeHTML(nodes.hoursVolunteeredInputNode.value);
    const dateValue = nodes.volunteeringDateInputNode.value;
    const rating = getselectedRating(nodes.experienceRatingInputNodes);

    // The charity name
    const nameValidation = validateCharityName(charityNameValue);
    if (!nameValidation.isValid) {
        inputsAreValid = false;
        nameValidation.errorMessages.forEach(msg => 
            displayInputError(nodes.charityNameInputNode, msg)
        );
    }
}

// The amount of hours Volunteered //
const hoursValidation = validateHoursVolunteered(hoursVolunteeredValue);
if (!hoursValidation.isValid) {
    inputsAreValid = false;
    hoursValidation.errorMessages.forEach(msg => 
        displayInputError(nodes.hoursVolunteeredInputNode, msg)
    );
}

// The Volunteering Dates //
const dateValidation = validateVolunteerDate(dateValue);
if (!dateValidation.isValid) {
    inputsAreValid = false;
    dateValidation.errorMessages.forEach(msg => 
        displayInputError(nodes.volunteeringDateInputNode, msg)
    );
}

// The Experiencing Rating //
if (!rating) {
    inputsAreValid = false;
    displayInputError(
        nodes.experienceRatingInputNodes[0].closest(".input-container"),
        "please rate your volunteer experience!"
    );
    
    return inputsAreValid;
}


// The selecting Rating //
function getselectedRating(ratingNodes) {
    for (let node of ratingNodes) {
        if (node.checked) return node.value;
    }
    return null;
}

// validation functions //
function validateCharityName(input) {
    const pattern = /^[A-Za-z]([a-zA-Z0-9 ]|[- @\.#&!]){3,}$/;
    const isValid = pattern.test(input);
    return {
        isValid,
        errorMessages: isValid ? [] : ["Please enter a valid charity name (4+ characters)."]
    };
}

function validateHoursVolunteered(input) {
    const pattern = /^[0-9]+(\.[0-5]?)?$/;
    const isValid = pattern.test(input) && parseFloat(input) > 0;
    return {
        isValid,
        errorMessages: isValid ? [] : ["Please enter a valid number of hours (e.g., 2, 1.5)."]
    };
}

function validateVolunteerDate(input) {
    const today = new Date().toISOString().split("T")[0];
    const isValid = input && input <= today;
    return {
        isValid,
        errorMessages: isValid ? [] : ["Please select a valid past or current date."]
    };
}

// some additional help //
function displayInputError(inputElement, message) {
    let parent = inputElement.closest(".input-container") || inputElement.parentElement;
    const errorSpan = document.createElement("span");
    errorSpan.textContent = message;
    errorSpan.classList.add("input-error");
    errorSpan.setAttribute("role", "alert");
    parent.appendChild(errorSpan);
}

function escapeHTML(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// browser runtime //
if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", init);
} else {
    module.exports = {
        collectTemporaryVolunteerData,
        validateVolunteerForm,
        validateCharityName,
        validateHoursVolunteered,
        validateVolunteerDate,
        displayInputError,
        escapeHTML,
        handleVolunteerFormSubmission,
        initDomNodes,
        init
    };
}