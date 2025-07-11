import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
describe("Maintenance record Internet Users Custom Procedures tab", () => {
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
  it("should click the Custom Procedures tab", () => {
    customerRecordPage.clickCustomProceduresTab();
  });
  it("should click the 'Enable All' button on the Custom Procedures   Button", () => {
    cy.wait(5000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should toggle all Custom Procedures checkboxes", () => {
    cy.wait(2000);
    const customProcedureOptions = [
      "Allow Shipping Labels",
      "-24 - 4x4 Shipping Label",
      "24 - 4x4 Shipping Label NS",
      "5 - 4x4 Shipping Labels",
      "-25 - 4x6 Shipping Label",
      "25 - 4x6 Shipping Label",
      "4949 - Christy Test",
      "2147 - CSV Test Format",
      "100 - CSV Test Raw",
      "-10 - CXT - Cardinal Parcel Scan Report",
      "-9 - CXT - Cardinal Weekly Report",
      "9 - CXT - Cardinal Weekly Report",
      "-1 - CXT - Order Shipping Label",
      "-19 - CXT - Standard 4x6 Shipping Label - X Internet",
      "50 - CXT - Standard 4x6 Shipping Label - X Internet",
      "26 - QA Test",
    ];

    customProcedureOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelCustomProceduresWithScroll(label);
    });
  });
  it("should search for 'Allow Shipping Labels' in the shipping label search field", () => {
    cy.wait(3000);
    const option = "Allow Shipping Labels";
    customerRecordPage.searchShippingLabelOption(option);
  });

  it("should toggles  a custom procedure checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const customProcedureOptions = ["Allow Shipping Labels"];

    customProcedureOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelCustomProceduresWithScroll(label);
    });
  });
});
