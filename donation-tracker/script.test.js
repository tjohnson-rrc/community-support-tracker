const {
    collectTemporaryDonationData,
    validateDonationForm,
    validateCharityName,
    validateDonationAmount,
    validateDonationDate,
    validateDonationComment,
    handleDonationFormSubmission,
    init,
    initDomNodes,
    displayInputError,
    getTemporaryDonationData,
    setTemporaryDonationData,
    // stage 2 stuff
    getDonationsFromStorage,
    addDonationToStorage,
    deleteDonation,
    calculateTotalDonationAmount,
    updateDonationSummary,
    renderDonationTable,
    loadDonationsFromStorage
} = require("./script");

// CITATION: https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests
if (typeof window !== "undefined") {
    // We're in a browser environment, use native localStorage
  } else {
    // We're in Node.js, create a localStorage polyfill
    class LocalStorageMock {
      constructor() {
        this.store = {};
      }
      
      getItem(key) {
        return this.store[key] || null;
      }
      
      setItem(key, value) {
        this.store[key] = String(value);
      }
      
      removeItem(key) {
        delete this.store[key];
      }
      
      clear() {
        this.store = {};
      }
    }
    
    global.localStorage = new LocalStorageMock();
}

const { JSDOM } = require("jsdom");

// CITATION: https://jestjs.io/docs/api#describename-fn || Great (official) documentation of jest
describe("Donation Form Validation Functions", () => {

    // Test validateCharityName function
    describe("validateCharityName", () => {
        test("valid charity name returns isValid true", () => {
            // Arrange
            const validName = "Red River College";
            
            // Act
            const result = validateCharityName(validName);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("invalid charity name contains appropriate error message", () => {
            // Arrange
            const invalidName = "FED";
            
            // Act
            const result = validateCharityName(invalidName);
            
            // Assert
            // includes returns a boolean!
            expect(result.errorMessages[0].includes("that's 4 or more characters!")).toBe(true);
        });
        
        test("empty charity name returns isValid false", () => {
            // Arrange
            const emptyName = "";
            
            // Act
            const result = validateCharityName(emptyName);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
    });

    // Test validateDonationAmount function
    describe("validateDonationAmount", () => {
        test("valid simple donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "100";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid decimal donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "1000.50";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid dollar sign donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "$100";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid comma separated donation amount returns isValid true", () => {
            // Arrange
            const validAmount = "$1,000.00";
            
            // Act
            const result = validateDonationAmount(validAmount);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("invalid text donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "abc";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("invalid donation amount symbol placement returns isValid false", () => {
            // Arrange
            const invalidAmount = "100$";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("negative donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "-100";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });

        test("empty donation amount returns isValid false", () => {
            // Arrange
            const invalidAmount = "";
            
            // Act
            const result = validateDonationAmount(invalidAmount);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
    });

    
    // Test validateDonationDate function
    // may see me isnerting objects WITH a value property in some of the tests for date.
    // That is because the validation function for date expects that input.
    describe("validateDonationDate", () => {
        test("valid date (today) returns isValid true", () => {
            // Arrange
            const today = new Date();
            const formattedToday = today.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate({ value: formattedToday });
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("valid date (past) returns isValid true", () => {
            // Arrange
            const pastDate = "2023-01-15";
            
            // Act
            const result = validateDonationDate({ value: pastDate });
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("future date returns isValid false", () => {
            // Arrange
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow = tomorrow.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate(formattedTomorrow);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("future date error message contains correct text", () => {
            // Arrange
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const formattedTomorrow = tomorrow.toISOString().split("T")[0];
            
            // Act
            const result = validateDonationDate({ value: formattedTomorrow });
            
            // Assert
            expect(result.errorMessages[0].includes("a date that isn't in the future!")).toBe(true);
        });
        
        test("empty date returns isValid false", () => {
            // Arrange
            const emptyDate = "";
            
            // Act
            const result = validateDonationDate(emptyDate);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
    });

    // Test validateDonationComment function
    describe("validateDonationComment", () => {
        test("valid comment returns isValid true", () => {
            // Arrange
            const validComment = "This is a valid comment";
            
            // Act
            const result = validateDonationComment(validComment);
            
            // Assert
            expect(result["isValid"]).toBe(true);
        });
        
        test("empty comment returns isValid false", () => {
            // Arrange
            const emptyComment = "";
            
            // Act
            const result = validateDonationComment(emptyComment);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
        test("empty comment error message contains correct text", () => {
            // Arrange
            const emptyComment = "";
            
            // Act
            const result = validateDonationComment(emptyComment);
            
            // Assert
            expect(result.errorMessages[0].includes("provide a donation comment")).toBe(true);
        });
        
        test("comment longer than 200 characters returns isValid false", () => {
            // Arrange
            // CITATION: https://docs.vultr.com/javascript/standard-library/String/repeat
            const longComment = "a".repeat(201);
            
            // Act
            const result = validateDonationComment(longComment);
            
            // Assert
            expect(result["isValid"]).toBe(false);
        });
        
    });

});

describe("Data Processing Tests and Donation Form Integration", () => {

    let testDom;
    let nodes;

    /* CITATION: https://jestjs.io/docs/api#beforeeachfn-timeout 
    beforeEach is exactly what the name implies, it creates a new DOM
    environment BEFORE EACH test. 
    */
    beforeEach(() => {
        // Just a basic HTML without semantics; just for testing environment. :)
        testDom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form id="donation-tracker-form">
                        <div class="input-container">
                            <input type="text" id="field_charity-name" name="charityName" value="Red River College">
                        </div>
                        <div class="input-container">
                            <input type="text" id="field_donation-amount" name="donationAmount" value="100">
                        </div>
                        <div class="input-container">
                            <input type="date" id="field_donation-date" name="donationDate" value="2023-04-15">
                        </div>
                        <div class="input-container">
                            <textarea id="field_donor-comment" name="donorComment">Ozzy is cute!</textarea>
                        </div>
                        <div class="button">
                            <input type="submit" class="submitButton" value="Submit">
                        </div>
                    </form>
                    <table id="donations-table">
                        <tbody id="donations-table-body"></tbody>
                    </table>
                <span id="total-donation-amount">0.00</span>
                </body>
            </html>
            `);

        // variables
        global.document = testDom.window.document;
        global.window = testDom.window;

        // Make sure localStorage is available for stage 2 and the init tests in stage 1
        if (!global.localStorage) {
            global.localStorage = new LocalStorageMock();
        }

        // Initialize DOM nodes for testing
        nodes = {
            donationTrackerFormNode: global.document.querySelector("#donation-tracker-form"),
            charityNameInputNode: global.document.querySelector("#field_charity-name"),
            donationAmountInputNode: global.document.querySelector("#field_donation-amount"),
            donationDateInputNode: global.document.querySelector("#field_donation-date"),
            donationCommentInputNode: global.document.querySelector("#field_donor-comment"),
            // Stage 2 nodes
            donationsTableBodyNode: global.document.querySelector("#donations-table-body"),
            totalDonationAmountNode: global.document.querySelector("#total-donation-amount")
        };

        // Reset temporaryDonationData for each test to run smoothly.
        global.temporaryDonationData = {};

        // Clear localStorage
        localStorage.clear();
    });

    // Test collectTemporaryDonationData function
    describe("collectTemporaryDonationData", () => {
        test("properly collects data with the right charity name", () => {
            // Act
            const result = collectTemporaryDonationData(nodes);

            // Assert
            expect(result.charityName).toBe("Red River College");
        });

        test("properly collects data with the right donation amount", () => {
            // Act
            const result = collectTemporaryDonationData(nodes);

            // Assert
            expect(result.donationAmount).toBe("100");
        });

        test("properly collects data with the right donation date", () => {
            // Act
            const result = collectTemporaryDonationData(nodes);

            // Assert
            expect(result.donationDate).toBe("2023-04-15");
        });

        test("properly collects data with a valid donation comment", () => {
            // Act
            const result = collectTemporaryDonationData(nodes);

            // Assert
            expect(result.donorComment).toBe("Ozzy is cute!");
        });
    });

    // Test init() function
    describe("init() function", () => {
        test("with invalid charity name displays corresponding error message in HTML element on submission", () => {
            // Arrange
            nodes.charityNameInputNode.value = "Zach's cat$ @re cut3!";

            // Act
            // CITATION: https://developer.mozilla.org/en-US/docs/Web/API/Document/createEvent
            // CITATION: https://developer.mozilla.org/en-US/docs/Web/API/Event/initEvent
            // both are deprecated, but forced to use it as `new SubmitEvent` wouldn't work
            // and kept on giving me errors for hours....... however this works for now!
            // CITATION OF SubmitEvent: https://developer.mozilla.org/en-US/docs/Web/API/SubmitEvent/SubmitEvent
            const submitEvent = global.document.createEvent("Event");
            submitEvent.initEvent("submit");
            init();
            nodes.donationTrackerFormNode.dispatchEvent(submitEvent);

            // Assert
            const errorMessageSpan = global.document.querySelector(".input-error");
            expect(errorMessageSpan.textContent).toBe("Please provide a valid charity name that's 4 or more characters!");
        });

        test("with invalid donation amount displays corresponding error message in HTML element on submission", () => {
            // Arrange
            nodes.donationAmountInputNode.value = "Zach's cat$ @re cut3!";

            // Act
            const submitEvent = global.document.createEvent("Event");
            submitEvent.initEvent("submit");
            init();
            nodes.donationTrackerFormNode.dispatchEvent(submitEvent);

            // Assert
            const errorMessageSpan = global.document.querySelector(".input-error");
            expect(errorMessageSpan.textContent).toBe("Please provide a valid donation amount!");
        });

        test("with invalid donation date displays corresponding error message in HTML element on submission", () => {
            // Arrange
            nodes.donationDateInputNode.value = "";

            // Act
            const submitEvent = global.document.createEvent("Event");
            submitEvent.initEvent("submit");
            init();
            nodes.donationTrackerFormNode.dispatchEvent(submitEvent);

            // Assert
            const errorMessageSpan = global.document.querySelector(".input-error");
            expect(errorMessageSpan.textContent).toBe("Please select a date of when the donation was made!");
        });

        test("with invalid donation comment displays corresponding error message in HTML element on submission", () => {
            // Arrange
            nodes.donationCommentInputNode.value = "";

            // Act
            const submitEvent = global.document.createEvent("Event");
            submitEvent.initEvent("submit");
            init();
            nodes.donationTrackerFormNode.dispatchEvent(submitEvent);

            // Assert
            const errorMessageSpan = global.document.querySelector(".input-error");
            expect(errorMessageSpan.textContent).toBe("Please provide a donation comment!");
        });

        test("form submission with valid data updates temporaryDonationData correctly.", () => {
            // Arrange
            const expectedData = {
                charityName: "Red River College",
                donationAmount: "100",
                donationDate: "2023-04-15",
                donorComment: "Ozzy is cute!"
            }
            
            // Act
            const submitEvent = global.document.createEvent("Event");
            submitEvent.initEvent("submit");
            init();
            nodes.donationTrackerFormNode.dispatchEvent(submitEvent);
            const actualData = getTemporaryDonationData();


            // Assert
            expect(actualData.charityName).toEqual(expectedData.charityName);
            expect(actualData.donationAmount).toEqual(expectedData.donationAmount);
            expect(actualData.donationDate).toEqual(expectedData.donationDate);
            expect(actualData.donorComment).toEqual(expectedData.donorComment);
        });
    });

    describe("Stage 2: Donation Storage and Display", () => {
    
        describe("renderDonationTable", () => {
            test("creates table rows for each donation", () => {
                // Arrange
                const donations = [
                  { id: "123", charityName: "Zach Montreuil", donationAmount: "69.69", donationDate: "2003-04-11", donorComment: "Project is too much :(" },
                  { id: "456", charityName: "Zach Efron", donationAmount: "169", donationDate: "2023-04-12", donorComment: "testest" }
                ];
                localStorage.setItem("donationRecords", JSON.stringify(donations));
                
                // Act
                renderDonationTable(nodes);
                
                // Assert
                // Not gonna check every content of each row.
                const tableRows = nodes.donationsTableBodyNode.querySelectorAll("tr");
                expect(tableRows).toHaveLength(2);
                
                // Check content of first row
                const firstRowCells = tableRows[0].querySelectorAll("td");
                expect(firstRowCells[0].textContent).toBe("Zach Montreuil");
                expect(firstRowCells[1].textContent).toBe("69.69");
                
                // Check that delete buttons were created
                const deleteButtons = nodes.donationsTableBodyNode.querySelectorAll(".delete-button");
                expect(deleteButtons).toHaveLength(2);
                expect(deleteButtons[0].getAttribute("data-id")).toBe("123");
            });
        })
    


    
    });

})
