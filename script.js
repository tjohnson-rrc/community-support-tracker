document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("volunteer-form");

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // prevents the default form submission //


        // Collecting the form data //
        const charity = document.getElementById("charity").ariaValueMax.trim();
        const hours = parseFloat(document.getElementById("hours").value);
        const date = document.getElementById("date").value;
        const rating = document.querySelector('input[name="rating"]:checked');


        // Sets of validations //
        let error = [];

        if (!charity) error.push("Charity name is required.");
        if (isNaN(hours) || hours <= 0) error.push("Please enter a valid number of hours.");
        if (!date) error.push("Date is required.");
        if (!rating) error.push("Please select a volunteer experience rating.");

        if (error.length > 0) {
            alert("Form submission failed:\n" + error.join("\n"));
        }
        
        // Storing some temporary data's //
        const collectVolunteerData = {
            charity,
            hours,
            date,
            rating: rating.value
        };

        console.log("Volunteer data has been submitted:", collectVolunteerData);
        
        
    })
})