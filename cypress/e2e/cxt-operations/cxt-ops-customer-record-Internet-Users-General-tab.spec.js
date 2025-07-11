import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
import {
  getRandomInternetUserTemplate,
  getRandomInternetUserId,
  getRandomInternetUserPassword,
  getRandomInternetUserName,
  getRandomInternetUserEmail,
  getRandSelectDefaultServiceType,
  getRandomRateAdjustment,
  getRandomInternetUsereditName,
  getRandomInternetUserPhone,
} from "../../support/randomUtils";
describe("Maintenance record Internet Users General tab", () => {
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

  it("should verify the 'Internet Users' text and click the 'Create New' button", () => {
    internetPage.clickCreateNewButton();
  });
  it("should click the 'General' tab under Internet Users", () => {
    cy.wait(3000);
    customerRecordPage.clickInternetUsersGeneralTab();
  });
  it("should choose and verify a random Internet User Template", () => {
    cy.wait(5000);
    const template = getRandomInternetUserTemplate();

    customerRecordPage.chooseInternetUserTemplate(template);
    customerRecordPage.verifyInternetUserTemplate(template);
  });
  it("should enter a random Internet User ID", () => {
    const userId = getRandomInternetUserId();

    customerRecordPage.enterInternetUserId(userId);
  });
  it("should toggle the Approved checkbox by label", () => {
    customerRecordPage.toggleApprovedCheckboxByLabel();
  });

  it("should confirm the Internet User Password", () => {
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterInternetUserPassword(password);
  });
  it("should confirm the Internet User Confirm Password", () => {
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterConfirmPassword(password);
  });
  it("should enter a random Internet User Name", () => {
    const name = getRandomInternetUserName();

    customerRecordPage.enterInternetUserName(name);
  });
  it("should enter a random Internet User Email", () => {
    const email = getRandomInternetUserEmail();

    customerRecordPage.enterInternetUserEmail(email);
  });
  it("should choose and verify a random Default Service Type", () => {
    const serviceType = getRandSelectDefaultServiceType();

    customerRecordPage.chooseDefaultServiceType(serviceType);
  });
  it("should enter a random Rate Adjustment", () => {
    const rate = getRandomRateAdjustment();

    customerRecordPage.enterRateAdjustment(rate);
  });
  it("should edit toggle the Approved checkbox by label", () => {
    customerRecordPage.toggleApprovedCheckboxByLabel();
  });
  it("should enter a random Internet User Phone", () => {
    const phone = getRandomInternetUserPhone();

    customerRecordPage.enterInternetUserPhone(phone);
  });
  it("should save the button", () => {
    customerPage.handleSaveAndCloseIfNeeded();
  });
  it("Should verify the 'Internet Users' text and click the 'Search' field", () => {
    cy.wait(3000);
    internetPage.visitCustomers();
  });

  it("should select the 'Name' option from Internet Users dropdown", () => {
    const dropdownOption = "Name";
    internetPage.selectInternetUserDropdownOption(dropdownOption);
  });
  it("should search for name and edit customer details", () => {
    const customers = ["Sam"];
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
      cy.wait(1000);
      customerEditPage.selectEditOption();
    }
  });
  it("should click the 'General' tab under Internet Users for editing", () => {
    cy.wait(3000);
    customerRecordPage.clickInternetUsersGeneralTab();
  });
  it("should update the Internet User ID with a new random value", () => {
    const userId = getRandomInternetUserId();

    customerRecordPage.enterInternetUserId(userId);
  });

  it("should toggle the Approved checkbox while editing the user", () => {
    customerRecordPage.toggleApprovedCheckboxByLabel();
  });

  it("should update the Internet User Password during edit", () => {
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterInternetUserPassword(password);
  });

  it("should update the Internet User Confirm Password during edit", () => {
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterConfirmPassword(password);
  });

  it("should update the Internet User Name with a new value", () => {
    const name = getRandomInternetUsereditName();

    customerRecordPage.enterInternetUserName(name);
  });

  it("should update the Internet User Email with a new value", () => {
    const email = getRandomInternetUserEmail();

    customerRecordPage.enterInternetUserEmail(email);
  });

  it("should choose and verify a new Default Service Type while editing", () => {
    const serviceType = getRandSelectDefaultServiceType();

    customerRecordPage.chooseDefaultServiceType(serviceType);
  });

  it("should update the Rate Adjustment with a random value", () => {
    const rate = getRandomRateAdjustment();

    customerRecordPage.enterRateAdjustment(rate);
  });

  it("should toggle the Approved checkbox again to reflect change", () => {
    customerRecordPage.toggleApprovedCheckboxByLabel();
  });

  it("should update the Internet User Phone with a new random number", () => {
    const phone = getRandomInternetUserPhone();

    customerRecordPage.enterInternetUserPhone(phone);
  });

  it("should save the edited Internet User record", () => {
    customerPage.handleSaveAndCloseeditIfNeeded();
  });
  it("should save the edited and click the ok button Internet User record", () => {
    cy.wait(500);
    customerPage.clickOkButton();
  });
  it("should search for name and Delete  customer details", () => {
    cy.wait(1000);
    const customers = ["Sam", "Harry"];
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
