const eventSignupForm = document.querySelector("#eventSignup");

eventSignupForm.addEventListener("submit", (eventObj) => {
    eventObj.preventDefault();

    const inputsAreValid = validateEventForm();

    if(inputsAreValid) {
        eventSignupForm.submit();
    } else {
        console.warn("Invalid inputs");
    }
})