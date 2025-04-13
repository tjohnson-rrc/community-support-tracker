const eventSignupForm = document.getElementById("eventSignup");

eventSignupForm.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    if(validateEventForm) {
        eventSignupForm.submit();
    }
})

// Main Validation

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

// Validation for required text input
function validateName(input) {
    let validName = true;
    const errorMessage = [];

    if (input == "") {
        validName = false;
        errorMessage.push("Please enter the name of the Representative.");
    }
    return {
    isValid: validName,
    errorMessages: errorMessage
    };
}