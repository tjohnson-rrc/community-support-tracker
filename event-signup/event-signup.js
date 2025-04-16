function eventFormHandler() {

    document.addEventListener("DOMContentLoaded", function() {
        // Check if the form exists before proceeding
        const eventSignupForm = document.getElementById("eventSignup");
        if (!eventSignupForm) {
            console.error("Form not found.");
            return;
        }
        
        // function eventFormHandler() {
            //     const eventSignupForm = document.getElementById("eventSignup");
            //     if(!eventSignupForm) return;
            
            eventSignupForm.addEventListener("submit", (eventObj) => {
                eventObj.preventDefault();
                
                const inputsAreValid = validateEventForm();
                
                if(inputsAreValid) {
                    const eventFormData = getEventFormData();          
                    console.log("Temporarily storing form data", eventFormData);
                    
                    // comment out eventSignupForm().submit when testing
                    // eventSignupForm.submit();
                } else {
                    console.warn("Invalid Inputs.");
                }
            });
        });
    }

// Validates all required fields
function validateAllFields(eventName, repName, repEmail, eventRole){
    const fieldValidations = {
        eventName: validateEventName(eventName),
        repName: validateRepName(repName),
        repEmail: validateEmail(repEmail),
        eventRole: validateEventRole(eventRole)
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
    const eventRoleInput = document.getElementById("field_role-selection");

    
    const eventNameValue = escapeHTML(eventNameInput.value);
    const repNameValue = escapeHTML(repNameInput.value);
    const repEmailValue = escapeHTML(emailInput.value);
    const eventRoleValue = escapeHTML(eventRoleInput.value);
    
    const validationResults = validateAllFields(eventNameValue, repNameValue, repEmailValue, eventRoleValue);
    
    let inputsAreValid = true;

    // Show errors
    if(!validationResults.eventName.isValid) {
        inputsAreValid = false;
        validationResults.eventName.errorMessages.forEach(m => displayInputError(eventNameInput, m));
    }

    if (!validationResults.repName.isValid) {
        inputsAreValid = false;
        validationResults.repName.errorMessages.forEach(m => displayInputError(repNameInput, m));
    }

    if (!validationResults.repEmail.isValid) {
        inputsAreValid = false;
        validationResults.repEmail.errorMessages.forEach(m => displayInputError(emailInput, m));
    }

    if (!validationResults.eventRole.isValid) {
        inputsAreValid = false;
        validationResults.eventRole.errorMessages.forEach(m => displayInputError(eventRoleInput, m));
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

// escape HTML function
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
        const errorMessages = [];
        
        if (input == "") {
            errorMessages.push("Please enter the community event name.");
        }
        return {
            isValid: errorMessages.length === 0, errorMessages };
        }

// Name input validation
function validateRepName(input) {
    const errorMessages = [];
    if (input === "") {
        errorMessages.push("Please enter the name of the Representative.");
    }
    return { isValid: errorMessages.length === 0, errorMessages };
}

// Email validation
function validateEmail(input) {
    const errorMessages = [];
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailPattern.test(input)) {
        errorMessages.push("Please enter a valid email.");
    }
    return { isValid: errorMessages.length === 0, errorMessages };
}

// Event role dropdown validation
function validateEventRole(input) {
    const errorMessages = [];

    if (input === "") {
        errorMessages.push("Please choose an event role.");
    }
    return { isValid: errorMessages.length === 0, errorMessages };
}

// Function to collect event form data
function getEventFormData() {
        const eventNameInput = document.getElementById("field_event-name");
        const repNameInput = document.getElementById("field_rep-name");
        const emailInput = document.getElementById("field_email");
        const eventRoleInput = document.getElementById("field_role-selection");
    
        return {
            eventName: escapeHTML(eventNameInput.value),
            repName: escapeHTML(repNameInput.value),
            repEmail: escapeHTML(emailInput.value),
            eventRole: escapeHTML(eventRoleInput.value),
        };
    }

    if (typeof window !== "undefined") {
        eventFormHandler();
    }

    module.exports = {
        eventFormHandler,
        validateEventForm,
        validateAllFields,
        validateEventName,
        validateRepName,
        validateEmail,
        validateEventRole,
        getEventFormData,
        escapeHTML,
        displayInputError
    };