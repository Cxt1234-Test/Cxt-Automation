import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomEmail,
  getRandomEmailAddress,
  getRandomStatusEvent,
  getRandomMessageFormat,
  getRandomMessageType,
  getRandomDateFormat,
  getRandomName,
  getRandomMessageSubject,
  getRandomDelay,
} from "../../support/randomUtils";
describe("", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
 it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    customerRecordPage.visitCustomers();
    cy.get("table[mat-table]", { timeout: 20000 }).should("be.visible");
  });

  it("should search for name and edit customer details", () => {
    const customers = ["Saad2494", "Ahmed9724"];

    function searchAndEdit(customerIndex) {
      const currentCustomer = customers[customerIndex];
      const newCustomer = customers[1 - customerIndex];

      customerEditPage.searchCustomer(currentCustomer);

      customerEditPage.isCustomerVisible().then((isFound) => {
        if (isFound) {
          proceedWithEditing(currentCustomer, newCustomer);
        } else {
          cy.get("mat-card.mat-card", { timeout: 4000 }).then(($card) => {
            if ($card.length && $card.text().includes("No data to display")) {
              customerEditPage.clearSearchField();

              customerEditPage.searchCustomer(customers[1]);

              customerEditPage
                .isCustomerVisible()
                .then((isFoundSecondCustomer) => {
                  if (isFoundSecondCustomer) {
                    proceedWithEditing(customers[1], customers[0]);
                  } else {
                    throw new Error(
                      "Neither customer name found, test cannot proceed."
                    );
                  }
                });
            } else {
              throw new Error("Customer not found, test cannot proceed.");
            }
          });
        }
      });
    }

    searchAndEdit(0);

    function proceedWithEditing(currentCustomer, newCustomer) {
      customerEditPage.clickThreeDotIcon(currentCustomer);
      cy.wait(1000); // wait before selecting edit
      customerEditPage.selectEditOption();
      cy.wait(1000); // wait before verifying drawer
      customerPage.verifyDrawerVisible();
    }
  });
  it("should verify and check the Alerts Tab and Add Contact", () => {
    customerRecordPage.clickAddAlertButton();
    const checkboxes = [
      "Required during order entry",
      "Automatically save during order entry",
    ];
    checkboxes.forEach((checkboxLabel) => {
      customerRecordPage.toggleCheckbox(checkboxLabel);
    });
  });
  it("should enter an email or phone number in the respective field", () => {
    const emailOrPhone = getRandomEmail();

    customerRecordPage.setEmailOrPhone(emailOrPhone);
  });
  it("should enter an email or SMS text in the default alert field", () => {
    const emailOrPhone = getRandomEmail();

    customerRecordPage.setDefaultEmailOrSms(emailOrPhone);
  });
  it('should click on the "Add an Alert" button successfully', () => {
    customerRecordPage.clickInsideAlertButton();
  });
  // To do
  it("should select and verify a Status Event option", () => {
    const randomStatusEvent = getRandomStatusEvent(); // Function to get a random option
    customerRecordPage.selectStatusEvent(randomStatusEvent);
    customerRecordPage.verifySelectedStatusEvent(randomStatusEvent);
  });
  it("should select and verify a Message Format option", () => {
    const randomMessageFormat = getRandomMessageFormat(); // Function to get a random option
    customerRecordPage.selectMessageFormat(randomMessageFormat);
    customerRecordPage.verifySelectedMessageFormat(randomMessageFormat);
  });
  it("should verify and toggle 'Required' and 'SMS Text' checkboxes", () => {
    // Define and toggle checkboxes
    const checkboxes = ["Required", "SMS Text"];

    checkboxes.forEach((checkboxLabel) => {
      customerRecordPage.setCheckboxState(checkboxLabel, true); // check
      customerRecordPage.setCheckboxState(checkboxLabel, false); // uncheck
    });
  });

  it("should click On the View Message Format", () => {
    customerRecordPage.clickViewMessageFormat();
  });
  it("should verify Edit Message Format", () => {
    customerRecordPage.verifyEditMessageFormat();
  });
  it("should Select the message type Option", () => {
    const randomMessageType = getRandomMessageType();
    customerRecordPage.selectRandomMessageType(randomMessageType);
  });
  it("should Select the Date Format Date As Option", () => {
    const randomDateFormat = getRandomDateFormat();
    customerRecordPage.selectRandomDateFormat(randomDateFormat);
  });
  it("should Add the Return Random name", () => {
    const randomName = getRandomName();
    customerRecordPage.enterReturnEmailName(randomName);
  });
  it("should Add the Return Email Address", () => {
    const randomEmail = getRandomEmailAddress();
    customerRecordPage.enterReturnEmailAddress(randomEmail);
  });
  it("should Add the Return CC Email Address", () => {
    const randomCCEmail = getRandomEmail();
    customerRecordPage.enterCCEmailAddress(randomCCEmail);
  });
  it("should Add the Message Subject", () => {
    const randomSubject = getRandomMessageSubject();
    customerRecordPage.enterMessageSubject(randomSubject);
  });
  it("should Add the Delay Message", () => {
    const randomDelay = getRandomDelay();
    customerRecordPage.enterDelayMessage(randomDelay);
  });

  it("should save the in the button", () => {
    customerRecordPage.saveMessageFormat();
  });

  it("should save the alert using the Save button", () => {
    cy.wait(500);
     customerRecordPage.clickSaveAlertButton();
  });
});
