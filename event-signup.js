const eventSignupForm = document.getElementById("eventSignup");

eventSignupForm.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    const inputsAreValid = validateEventForm();

    if(inputsAreValid) {
        const eventFormData = getEventFormData();
        
        console.log("Temporarily storing form data", eventFormData)
        
        // comment out eventSignupForm().submit when testing
        // eventSignupForm.submit();
    } else {
        console.warn("Invalid Inputs.");
    }
});

// Validates all required fields
function validateAllFields(eventName, repName, repEmail, eventRole){
    const fieldValidations = {
        eventName: validateEventName(eventName),
        repName: validateRepName(repName),
        repEmail: validateEmail(repEmail),
        eventRole: validateDropdownSelection(eventRole)
    };


    return fieldValidations
}

// Main Validation
function validateEventForm() {
    const errorMessages = document.querySelectorAll(".input-error");

    // Clear previous errors
    errorMessages.forEach(n => n.remove());
    
    // Collect form value inputs
    const eventNameInput = document.getElementById("field_event-name");
    const repNameInput = document.getElementById("field_rep-name");
    const emailInput = document.getElementById("field_email");
    const dropdownSelection = document.getElementById("field_role-selection");
    
    const values = {
        eventName: escapeHTML(eventNameInput.value),
        repName: escapeHTML(repNameInput.value),
        repEmail: escapeHTML(emailInput.value),
        eventRole: escapeHTML(dropdownSelection.value)
    };
    
    const validationResults = validateFields(
        values.eventName,
        values.repName,
        values.repEmail,
        values.eventRole
    );
    
    let inputsAreValid = true;


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
// function that gathers elements and values (input and input value). Initialize object, run validations, return object. 
//extract logic that is interacting with DOM (displayinputerror and querySelectors 41/42)

    // Representative validation
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
