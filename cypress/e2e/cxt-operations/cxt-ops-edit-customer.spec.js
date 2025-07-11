import customerPage from "../../support/Pages/customerPage"; // Import the page object
import customerEditPage from "../../support/Pages/customerEditPage"; // Import the page object
import customerRecordPage from "../../support/Pages/customerRecordPage"; // Import the page object

import {
  getRandomUserFieldTexts,
  getRandomBusinessUnit,
  getRandomCustomerType,
  getRandomCustomerSource,
} from "../../support/randomUtils";
describe("Customer Edit Test", () => {
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
  it("should select and verify a random business unit", () => {
    customerEditPage.openBusinessUnitDropdown();
    const randomUnit = getRandomBusinessUnit();
    cy.log(`Randomly selected business unit: ${randomUnit}`);
    customerEditPage.selectBusinessUnit(randomUnit);
    customerEditPage.verifySelectedBusinessUnit(randomUnit);
  });

  it("should select and verify a random customer type", () => {
    cy.wait(2000); 
    customerPage.openCustomerTypeDropdown();

    const randomType = getRandomCustomerType();
    cy.log(`Randomly selected customer type: ${randomType}`);

    customerPage.selectCustomerType(randomType);
    cy.wait(2000); // Wait to ensure the selection is reflected
    customerPage.verifySelectedCustomerType(randomType);
  });

  it("should select and verify a random customer source", () => {
    cy.wait(2000); // Wait for 2 seconds before interacting with the dropdown
    customerEditPage.openCustomerSourceDropdown();

    const randomSource = getRandomCustomerSource();
    cy.log(`Randomly selected customer source: ${randomSource}`);

    customerEditPage.selectCustomerSource(randomSource);
    cy.wait(2000); // Wait to ensure the selection is reflected
    customerEditPage.verifySelectedCustomerSource(randomSource);
  });

  it("should add text to user fields and select dates", () => {
    cy.wait(2000);
    const { randomText1, randomText2 } = getRandomUserFieldTexts();

    customerPage.addTextToUserField1(randomText1); // Fill userField1 with a single line
    customerPage.addTextToUserField2(randomText2); // Fill userField2 with a single line
    cy.wait(2000);

    customerPage.selectCustomerSinceDate();
    customerPage.selectLastOrderedDate();
  });

  it("should save the button", () => {
    customerPage.clickSaveButton2();
  });
});
