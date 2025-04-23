function eventFormHandler() {

    document.addEventListener("DOMContentLoaded", function() {
        // Check if the form exists before proceeding
        const eventSignupForm = document.getElementById("eventSignup");
        if (!eventSignupForm) {
            console.error("Form not found.");
            return;
        }

        loadSignupData();
        
        // function eventFormHandler() {
            //     const eventSignupForm = document.getElementById("eventSignup");
            //     if(!eventSignupForm) return;
            
            eventSignupForm.addEventListener("submit", (eventObj) => {
                eventObj.preventDefault();
                
                const inputsAreValid = validateEventForm();
                
                if(inputsAreValid) {
                    const eventFormData = getEventFormData(); 
                    saveSignupData(eventFormData);
                    addSignupDataToTable(eventFormData);
                    updateSummary();

                    // console.log("Temporarily storing form data", eventFormData);
                    
                    // comment out eventSignupForm().submit when testing
                    // eventSignupForm.submit();
                } else {
                    console.warn("Invalid Inputs.");
                }
            });
        });
    }

// Save event data to localstorage
function saveSignupData(data) {
    const existingData = JSON.parse(localStorage.getItem("eventsSignup")) || [] ;
    existingData.push(data);
    localStorage.setItem("eventsSignup", JSON.stringify(existingData));
}

// Add Data to table
function addSignupDataToTable(data) {
    const tableBody = document.querySelector("#event-table tbody");
    const row = document.createElement("tr");

    const columns = [
        data.eventName,
        data.repName,
        data.repEmail,
        data.eventRole
    ];
    
    columns.forEach(text => {
        const tableData = document.createElement("td");
        tableData.textContent = text;
        row.appendChild(tableData);
    });

    // Delete button
    const deleteTd = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");

    deleteButton.addEventListener("click", () => {
        deleteSignup(data);
        row.remove();
        updateSummary();
    });

    deleteTd.appendChild(deleteButton);
    row.appendChild(deleteTd);

    tableBody.appendChild(row);
}

// Load event data
function loadSignupData() {
    const loadSignup = JSON.parse(localStorage.getItem("eventsSignup")) || [];
    loadSignup.forEach(signup => addSignupDataToTable(signup));
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

// Delete record function
function deleteSignup(deleteData) {
    const currentData = JSON.parse(localStorage.getItem("eventsSignup")) || [];
    const updatedData = currentData.filter(entry => 
        !(entry.eventName === deleteData.eventName &&
            entry.repName === deleteData.repName &&
            entry.repEmail === deleteData.repEmail &&
            entry.eventRole === deleteData.eventRole
        )
    );
    localStorage.setItem("eventsSignup", JSON.stringify(updatedData))
}

// Summary update function
function updateSummary() {
    const data = JSON.parse(localStorage.getItem("eventsSignup")) || [];
    const roleCounter = {
        sponsor:0,
        participant:0,
        organizer:0,
        volunteer:0
    };

    data.forEach(entry => {
        if(roleCounter.hasOwnProperty(entry.eventRole)) {
            roleCounter[entry.eventRole]++
        }
    });

    document.getElementById("sponsors-summary").textContent = roleCounter.sponsor;
    document.getElementById("participants-summary").textContent = roleCounter.participant;
    document.getElementById("organizers-summary").textContent = roleCounter.organizer;
    document.getElementById("volunteer-summary").textContent = roleCounter.volunteer;

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
    } else {
        
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
            displayInputError,
            loadSignupData,
            deleteSignup,
            updateSummary
        };
    }