import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
import {
  getRandomAcceptCreditCardOption,
  getRandomDisplayDriverLocation,
  getRandomDefaultOrderInternetType,
  getRandomEditOrderType,
  getRandomCancelOrderType,
  generateRandomEmail,
} from "../../support/randomUtils";
describe("Maintenance record Internet Users Options tab", () => {
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
  it("should click the Internet User Options tab", () => {
    customerRecordPage.clickInternetUserOptionsTab();
  });
  it("should click the 'Enable All' button on the Custom Procedures Button", () => {
    customerRecordPage.clickEnableAllCustomProcedures();
  });

  it("should toggle all Internet user options checkboxes", () => {
    const checkboxLabels = [
      "Allow Password",
      "Show Rates",
      "Allow Accessorial Charges",
      "Allow Viewing Invoices",
      "Allow Address Book Access",
      "Allow Address Entry",
      "Allow Edit to Deliver From Time",
      "Show Deliver By Time",
      "View Account Reports",
      "View Route Stops",
      "Modify Route Stops",
      "View Inactive Route Stops",
      "View Detail Tracking",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
  it("should choose and verify a random Accept Credit Cards option", () => {
    const creditCardOption = getRandomAcceptCreditCardOption();

    customerRecordPage.chooseAcceptCreditCardOption(creditCardOption);
    customerRecordPage.verifyAcceptCreditCardOption(creditCardOption);
  });
  it("should toggle all Internet User Options tab checkboxes", () => {
    const checkboxLabels = [
      "Allow Map Based Validation",
      "Allow Cart Checkout",
      "Create from Recent Orders",
      "Create from Recent Templates",
      "View Track Order",
      "View Inet User Orders Only ",
      "View User Profile",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
  it("should choose and verify a random Display Driver Location", () => {
    const location = getRandomDisplayDriverLocation();
    customerRecordPage.chooseDisplayDriverLocation(location);
    customerRecordPage.verifyDisplayDriverLocation(location);
  });
  it("should choose and verify a random Default Order Type", () => {
    const orderType = getRandomDefaultOrderInternetType();

    customerRecordPage.chooseDefaultOrderType(orderType);
  });
  it("should select and verify a random Edit Order Type", () => {
    const editOrderType = getRandomEditOrderType();
    customerRecordPage.chooseEditOrderType(editOrderType);
    customerRecordPage.verifyEditOrderType(editOrderType);
  });
  it("should select and verify a random Cancel Order Type", () => {
    const cancelOrderType = getRandomCancelOrderType();
    customerRecordPage.chooseCancelOrderType(cancelOrderType);
    customerRecordPage.verifyCancelOrderType(cancelOrderType);
  });

  it("should enter and verify Email/SMS Text Alerts", () => {
    const email = generateRandomEmail();
    customerRecordPage.enterEmailSmsTextAlert(email);
  });
  it("should toggle all Internet And web Services User Options tab checkboxes", () => {
    const checkboxLabels = [
      "Address Book Pop Up ",
      "Allow Rating Override ",
      "Allow Webservice API ",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
});
