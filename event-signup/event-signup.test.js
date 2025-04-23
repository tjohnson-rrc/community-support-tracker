// Importing specific functions
const {
    validateEventName,
    validateRepName,
    validateEmail,
    validateEventRole,
    getEventFormData,
    updateSummary,
    saveSignupData
} = require("./event-signup");

// Unit testing for Logic

describe("Form Validation Functions", () => {

    // validateEventName
    test("validateEventName: fails if event name input is invalid", () => {

        // Arrange
        const input = "";

        // Act
        const result = validateEventName(input);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errorMessages).toContain("Please enter the community event name.");  
    });

    test("validateRepName: fails if representative name input is invalid", () => {
        // Arrange
        const input = "";

        // Act
        const result = validateRepName(input);

        // Assert
        expect(result.isValid).toBe(false);
        expect(result.errorMessages).toContain("Please enter the name of the Representative.");
    });
    
})

// test("updateSummary: generates correct count by event role", () => {
        // Arrange
        // const dom = new JSDOM(`
        //     <div id="sponsors-summary"></div>
        //     <div id="participants-summary"></div>
        //     <div id="organizers-summary"></div>
        //     <div id="volunteer-summary"></div>
        //     `);
        // global.document = dom.window.document;
        // global.window = dom.window;
        // document.body.innerHTML = `
        // <div id="sponsors-summary"></div>
        // <div id="participants-summary"></div>
        // <div id="organizers-summary"></div>
        // <div id="volunteer-summary"></div>
        // `;

       // Mock localStorage
    //    const mockData = [
    //     { eventName: "Event Name A", repName: "Name A", repEmail: "testa@pixellriver.com", eventRole: "sponsor" },
    //     { eventName: "Event Name B", repName: "Name B", repEmail: "testb@pixellriver.com", eventRole: "sponsor" },
    //     { eventName: "Event Name C", repName: "Name C", repEmail: "testc@pixellriver.com", eventRole: "organizer" },
    //     { eventName: "Event Name D", repName: "Name D", repEmail: "testd@pixellriver.com", eventRole: "volunteer" }
    //     ];

        // localStorage.setItem("eventsSignup", JSON.stringify(mockData));

       // Act
    //    updateSummary();

       // Assert
    //    expect(document.getElementById("sponsors-summary").textContent).toBe("2");
    //    expect(document.getElementById("participants-summary").textContent).toBe("0");
    //    expect(document.getElementById("organizers-summary").textContent).toBe("1");
    //    expect(document.getElementById("volunteer-summary").textContent).toBe("1");  
    // });

// test("Event form submission stores valid data in localStorage", () => {
    // Arrange
        // document.getElementById("field_event-name").value = "Event A";
        // document.getElementById("field_rep-name").value = "Name A";
        // document.getElementById("field_email").value = "test@pixellriver.ca";
        // document.getElementById("field_role-selection").value = "sponsor";
    
    // Act
    // const formData = getEventFormData();
    // saveSignupData(formData);
    

    // Assert
//     const savedData = JSON.parse(localStorage.getItem("eventsSignup"));

//     expect(savedData).toHaveLength(1);
//     expect(savedData[0]).toMatchObject({
//         eventName: "Event A",
//         repName: "Name A",
//         repEmail: "test@pixellriver.ca",
//         eventRole: "sponsor"
//     });
// });