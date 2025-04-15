const eventSignupForm = document.getElementById("eventSignup");

eventSignupForm.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    const inputsAreValid = validateEventForm();

    if(inputsAreValid) {
        const eventFormData = {
            eventName: escapeHTML(document.getElementById("field_event-name").value),
            repName: escapeHTML(document.getElementById("field_rep-name").value),
            repEmail: escapeHTML(document.getElementById("field_email").value),
            eventRole: escapeHTML(document.getElementById("field_role-selection").value)
        };
        console.log("Temporarily storing form data", eventFormData)
        
        // comment out eventSignupForm().submit when testing
        // eventSignupForm.submit();
        } else {
        console.warn("Invalid Inputs.");
    }
});

// Main Validation
function validateEventForm() {
    const errorMessages = document.querySelectorAll(".input-error");

    errorMessages.forEach(n => n.remove());

    let inputsAreValid = true;

    // Beginning of validation for form submit

    // Event name validation
    const eventNameInput = document.getElementById("field_event-name");
    const eventNameInputValue = escapeHTML(eventNameInput.value);

    const eventNameValidation = validateEventName(eventNameInputValue, eventNameInput);
    if(!eventNameValidation["isValid"]) {
        inputsAreValid = false;
    }
    if(eventNameValidation["errorMessages"].length > 0) {
        eventNameValidation["errorMessages"].forEach(m => {
            displayInputError(eventNameInput, m);
        })
    }

    // Representative validation
    const repNameInput = document.getElementById("field_rep-name");
    const repNameInputValue = escapeHTML(repNameInput.value);

    const repNameValidation = validateRepName(repNameInputValue, repNameInput);
    if(!repNameValidation["isValid"]) {
        inputsAreValid = false;
    }
    if(repNameValidation["errorMessages"].length > 0) {
        repNameValidation["errorMessages"].forEach(m => {
            displayInputError(repNameInput, m);
        })
    }

    // Email Validation
    const emailInput = document.getElementById("field_email");
    const emailInputValue = escapeHTML(emailInput.value);

    const emailValidation = validateEmail(emailInputValue, emailInput);
    if(!emailValidation["isValid"]) {
        inputsAreValid = false;
    }
    if(emailValidation["errorMessages"].length > 0) {
        emailValidation["errorMessages"].forEach(m => {
            displayInputError(emailInput, m)
        });
    }

    // Dropdown Menu Validation
    const dropdownSelection = document.getElementById("field_role-selection");
    const dropdownSelectionValue = escapeHTML(dropdownSelection.value);

    const dropdownSelectionValidation = validateDropdownSelection(dropdownSelectionValue, dropdownSelection);
    if(!dropdownSelectionValidation["isValid"]) {
        inputsAreValid = false;
    }
    if(dropdownSelectionValidation["errorMessages"].length > 0) {
        dropdownSelectionValidation["errorMessages"].forEach(m => {
            displayInputError(dropdownSelection, m)
        });
    }

    return inputsAreValid;
}

// Show error message
function displayInputError(inputElement, message) {
    const inputContainer = inputElement.closest(".input-container");
    const error = document.createElement("span");

    error.textContent = message;
    error.classList.add("input-error");

    error.setAttribute("role", "alert");

    inputContainer.appendChild(error);
}

// escape function
function escapeHTML(input) {
    return input
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Event input validation
function validateEventName(input) {
    let validEventName = true;
    const errorMessage = [];

    if (input == "") {
        validEventName = false;
        errorMessage.push("Please enter the community event name.");
    }
    return {
        isValid: validEventName,
        errorMessages: errorMessage
    };
}

// Name input validation
function validateRepName(input) {
    let validRepName = true;
    const errorMessage = [];

    if (input == "") {
        validRepName = false;
        errorMessage.push("Please enter the name of the Representative.");
    }
    return {
    isValid: validRepName,
    errorMessages: errorMessage
    };
}

// Email Input Validation
function validateEmail(input) {
    let validEmail = true;
    const errorMessage = [];

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const emailFollowsPattern = emailPattern.test(input);
    if(!emailFollowsPattern) {
        validEmail = false;
        errorMessage.push("Please enter a valid email.");
    }

    return {isValid: validEmail, 
        errorMessages: errorMessage
    };
}

// Dropdown Menu Input Validation
function validateDropdownSelection(input) {
    let validSelection = true;
    const errorMessage = [];

    if (input == "") {
        validSelection = false;
        errorMessage.push("Please choose an event role.")
    }
    return {
        isValid: validSelection,
        errorMessages: errorMessage
    };
}
