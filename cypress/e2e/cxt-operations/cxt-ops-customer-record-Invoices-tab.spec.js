import customerPage from "../../support/Pages/customerPage";
import customerEditorPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomCreditLimitAmount,
  getRandomStartPastDueWarningOption,
  getRandomStartCreditHoldOption,
} from "../../support/randomUtils";
describe("Customer Record Invoices  Fields", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    customerRecordPage.visitCustomers();
    cy.wait(1000);
  });

  it("should search for name and edit customer details", () => {
    const customers = ["Saad2494", "Ahmed9724"];

    function searchAndEdit(customerIndex) {
      const currentCustomer = customers[customerIndex];
      const newCustomer = customers[1 - customerIndex];

      cy.wait(1000);
      customerEditorPage.searchCustomer(currentCustomer);

      customerEditorPage.isCustomerVisible().then((isFound) => {
        if (isFound) {
          proceedWithEditing(currentCustomer, newCustomer);
        } else {
          cy.get("mat-card.mat-card", { timeout: 4000 }).then(($card) => {
            if ($card.length && $card.text().includes("No data to display")) {
              customerEditorPage.clearSearchField();

              cy.wait(1000);
              customerEditorPage.searchCustomer(customers[1]);

              customerEditorPage
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
      customerEditorPage.clickThreeDotIcon(currentCustomer);
      cy.wait(1000);
      customerEditorPage.selectEditOption();
      cy.wait(1000);
      customerPage.verifyDrawerVisible();
    }
  });
  it("should click the Invoices button, even if it is inside the More options menu", () => {
    let found = false;
    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Invoices") {
            cy.wrap($button).click({ force: true });
            found = true;
          }
        });
      })
      .then(() => {
        if (!found) {
          customerRecordPage.openMenuTab();
          cy.wait(1000);
          customerRecordPage.clickInvoicesTab();
        }
      });
  });
  it("should click on the Invoices Enable Credit Limit section", () => {
    customerRecordPage.clickEnableCreditLimit();
  });
  it("should enter a random credit limit value", () => {
    const randomCreditLimit = getRandomCreditLimitAmount();
    customerRecordPage.enterCreditLimit(randomCreditLimit);
  });
  it("should verify the Credit Limit text is visible", () => {
    customerRecordPage.verifyCreditLimitText();
  });
  it("should verify the Outstanding Invoiced text is visible", () => {
    customerRecordPage.verifyOutstandingInvoicedText();
  });
  it("should verify the 0-30 text is visible", () => {
    customerRecordPage.verifyZeroToThirtyText();
  });
  it("should verify the 31-60 text is visible", () => {
    customerRecordPage.verifyThirtyOneToSixtyText();
  });
  it("should verify the 61-90 text is visible", () => {
    customerRecordPage.verifySixtyOneToNinetyText();
  });
  it("should verify the +91 text is visible", () => {
    customerRecordPage.verifyPlusNinetyOneText();
  });
  it("should verify the Uninvoiced Orders text is visible", () => {
    customerRecordPage.verifyUninvoicedOrdersText();
  });
  it("should verify the Uninvoiced Route Stops text is visible", () => {
    customerRecordPage.verifyUninvoicedRouteStopsText();
  });
  it("should verify the Uninvoiced Contracts text is visible", () => {
    customerRecordPage.verifyUninvoicedContractsText();
  });
  it("should verify the Remaining Credit text is visible", () => {
    customerRecordPage.verifyRemainingCreditText();
  });
  it("should verify the 'Date ranges for aging are accurate as of:' text is visible", () => {
    customerRecordPage.verifyAgingDateAccuracyText();
  });

  it("should toggle the Invoices Aging dropdown", () => {
    customerRecordPage.clickInvoicesAging();
  });
  it("should verify the Aging Alert Overrides text is visible", () => {
    customerRecordPage.verifyAgingAlertOverridesText();
  });
  it("should choose and verify a random Start Past Due Warning option", () => {
    const warningOption = getRandomStartPastDueWarningOption();

    customerRecordPage.chooseStartPastDueWarning(warningOption);
    customerRecordPage.verifyStartPastDueWarning(warningOption);
  });
  it("should choose and verify a random Start Credit Hold Enforcement option", () => {
    const creditHoldOption = getRandomStartCreditHoldOption();

    customerRecordPage.chooseStartCreditHoldEnforcement(creditHoldOption);
    customerRecordPage.verifyStartCreditHoldEnforcement(creditHoldOption);
  });
  it("should search invoices based on a random type", () => {
    customerRecordPage.searchInvoiceByRandomType();
  });
});
