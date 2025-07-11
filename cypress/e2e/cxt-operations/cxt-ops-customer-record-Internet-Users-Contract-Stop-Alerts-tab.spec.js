import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
import {
  getRandomContractStopAlertOption,
  getRandomContractStopAlertMessage,
  getRandomContractStopCheckboxLabel,
} from "../../support/randomUtils";
describe("Maintenance record Internet Users Contract S  top tab", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Internet Users' text and click the 'Search  Field' ", () => {
    internetPage.visitCustomers();
    cy.wait(3000);
  });
  it("should select the 'Name' option from Internet Users dropdown", () => {
    const dropdownOption = "Name";
    internetPage.selectInternetUserDropdownOption(dropdownOption);
  });
  it("should search for name and edit customer details", () => {
    const customers = ["Sam", "Harry"];

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
      cy.wait(1000);
      customerEditPage.selectEditOption();
      cy.wait(1000);
      customerPage.verifyDrawerVisible();
    }
  });
  it("should click the Contract Stop Alerts tab", () => {
    internetPage.clickContractStopAlertsTab();
  });
  it("should select and verify Contract Stop Alert Enforcement option", () => {
    cy.wait(2000);
    const randomOption = getRandomContractStopAlertOption();

    internetPage.selectContractStopAlertEnforcement(randomOption);
  });
  it("should enter a random Contract Stop Alert Message in the field", () => {
    const randomMessage = getRandomContractStopAlertMessage();
    internetPage.enterContractStopAlertMessage(randomMessage);
  });
  //
  it("should click the Revert to Default button", () => {
    internetPage.clickRevertToDefaultButton();
  });
  it("should click the Custom Procedures tab", () => {
    customerRecordPage.clickCustomProceduresTab();
  });
  it("should click the Contract Stop Alerts tab", () => {
    cy.wait(2000);
    internetPage.clickContractStopAlertsTab();
  });
  it("should  All toggle a random Contract Stop checkbox", () => {
    cy.wait(3000);
    const randomLabel = getRandomContractStopCheckboxLabel();
    customerRecordPage.scrollAndToggleCheckbox(randomLabel);
  });
 
  it("should search for 'The Wine Room - 200270' in the Available Contract Stops label search field", () => {
    cy.wait(3000);
    const option = "The Wine Room";
    internetPage.searchShippingCustomer(option);
  });
  it("should click the 'Delete' button Selected Contract Stops ", () => {
    cy.wait(1000);
    internetPage.clickDeletedButtons();
  });
});
