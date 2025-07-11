// cypress/integration/customerPage.js
import customerPage from "../../support/Pages/customerPage"; // Import the page object
import customerEditPage from "../../support/Pages/customerEditPage"; // Import the page object
import {
  getRandomNumber,
  getRandomName,
  getRandomAlphanumeric,
  getRandomUserFieldTexts,
} from "../../support/randomUtils";
describe("Customer Create Test", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });

  it("should verify the 'Customers' text and click the 'Create New' button", () => {
    customerPage.visitCustomers();
    customerPage.verifyCustomersText();
    cy.wait(3000);
    customerPage.clickCreateNewButton();
    customerPage.verifyDrawerVisible();
  });

  it("should click on the 'General' button and fill in customer information", () => {
    customerPage.clickGeneralButtonAndVerifyDrawer();
    // Generate random customer info
    const randomId = getRandomNumber(6);
    const randomName = getRandomName();
    const randomIdCard = getRandomAlphanumeric("AL", 12);

    customerPage.fillCustomerInfo(randomId, randomName, randomIdCard);
  });

  it("should edit and verify address information", () => {
    customerPage.clickLocalInfoButton();
    customerPage.clickEditAddressButton();
    customerPage.verifyEditAddressText();
    customerPage.fillAddressInfo(
      "Suite 305",
      "Suite 202, Room 5B, Temperature Control Unit",
      "Little Rock",
      "",
      "",
      "72201",
      "(501) 555-5678"
    );
  });
  it("should fill in additional contact information", () => {
    customerPage.fillAdditionalContactInfo(
      "", // Phone No 1
      "(501) 555-2345", // Phone No 2
      "(501) 555-3456", // Fax
      "Jane Doe", // Contact
      "Customer Support Manager",
      "speciallist@cxtsoftware.com" // Email
    );
    customerPage.clickGeneralInfoDropdown();
    customerPage.verifyFieldLabel("TestCustLabel");
  });

  it("should select and verify business unit options", () => {
    customerPage.openBusinessUnitDropdown();

    const businessUnits = [
      "Global",
      "East Coast",
      "Central",
      "Mountain",
      "West Coast",
      "Canada",
      "new one",
      "New-Business Unit",
      "test autoassignment",
      "test qa test",
      "chaz_test",
      "Regression Test",
      "CXT Software 2",
      "Christy ID Test Christy ID Test Column Width Test2",
    ];

    // Loop through all business units and verify selection
    businessUnits.forEach((unit) => {
      customerPage.selectBusinessUnit(unit);
      customerPage.verifySelectedBusinessUnit(unit);
      customerPage.openBusinessUnitDropdown();
    });

    // After verifying all, explicitly select "Canada"
    customerPage.selectBusinessUnit("Canada");
    customerPage.verifySelectedBusinessUnit("Canada");
  });

  it("should select and verify customer type options", () => {
    customerPage.openCustomerTypeDropdown();
    const customerTypes = [
      "Test",
      "Boring",
      "QA Test",
      "Test 2",
      "Lab",
      "on demand",
      "XD29216",
      "Type 9",
      "Test",
    ];
    customerTypes.forEach((type) => {
      customerPage.selectCustomerType(type);
      customerPage.verifySelectedCustomerType(type);
      customerPage.openCustomerTypeDropdown();
    });
  });

  it("should select and verify customer source options", () => {
    customerPage.openCustomerSourceDropdown();

    const customerSources = [
      "Phone Directory",
      "Web",
      "Cold Call",
      "Advertisement",
      "Sewer",
      "AI",
      "Cem",
      "Test Customer Source",
    ];

    // Loop through all customer sources and verify selection
    customerSources.forEach((source) => {
      customerPage.selectCustomerSource(source);
      customerPage.verifySelectedCustomerSource(source);
      customerPage.openCustomerSourceDropdown();
    });

    // After verifying all, explicitly select "Web"
    customerPage.selectCustomerSource("Web");
    customerPage.verifySelectedCustomerSource("Web");
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
  it("should click the Close button", () => {
    customerPage.clickCloseButton();
  });
  it("should verify the warning text and click OK", () => {
    cy.wait(500);

    customerPage.clickOkButton();
  });
  it("should delete the added user", () => {
    cy.wait(1000);
    customerEditPage.visitCustomerPage();
  });
  it("should search for name and edit customer details", () => {
    const customers = ["Asad-New1122", "Saad-New1122"];
    function searchAndEdit(customerIndex) {
      const currentCustomer = customers[customerIndex];
      const newCustomer = customers[1 - customerIndex];
      customerEditPage.searchCustomer(currentCustomer);
      cy.wait(1000);
      customerEditPage.isCustomerVisible().then((isFound) => {
        if (isFound) {
          cy.wait(1000);
          proceedWithEditing(currentCustomer, newCustomer);
        } else {
          cy.get("mat-card.mat-card", { timeout: 4000 }).then(($card) => {
            if ($card.length && $card.text().includes("No data to display")) {
              customerEditPage.clearSearchField();
              customerEditPage.searchCustomer(customers[1]);
              cy.wait(1000);

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
      cy.wait(500);

      customerPage.clickDeleteButton();
      cy.wait(500);

      customerPage.clickYesButton();
      cy.wait(1000);
    }
  });
});
