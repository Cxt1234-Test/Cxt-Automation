import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
describe("Maintenance record Internet Users Customers tab", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    internetPage.visitCustomers();
    cy.wait(3000);
  });

  it("should verify the 'Internet Users' text and click the 'Create New' button", () => {
    internetPage.clickCreateNewButton();
  });
  it("should click the Internet User Customers tab", () => {
    customerRecordPage.clickInternetUserCustomersTab();
  });
  it("should click the 'Enable All' button on the customers   Button", () => {
    cy.wait(5000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should toggle all user customers options checkboxes", () => {
    cy.wait(5000);
    const checkboxLabels = [
      "123 Alpha - 23462",
      "49ers 2024 - 1105",
      "50 Character Compan - 1112",
      "Acestreet - 2510",
      "ADP Integration Test - 40000",
      "ahmad - 167801",
      "Air Service Company - 2175",
      "Anholding - 1950",
      "Asad-New112 - 23432543",
      "Bamquote - 3740",
      "Billy's Baseball Camp - 201149",
      "Blam Delivery - 1009",
      "Brando Hours - 234265383",
      "Brandon Soccer Mom Van - 234265379",
      "Brandon's Boxers - 234265378",
      "Brandon's Covid Party for accusers - 234265408",
      "Brandon's Ear Buds - 234265405",
      "Brandon's Headsets - 234265407",
      "Brandon's Monitors - 234265403",
      "Brandon's Reflex Balls - 234265376",
      "Brandon's Tiger School - 234265390",
      "Brandon's Violations - 234259",
      "Brandons Ballies - 234240",
      "Brandons Cars - 234265397",
      "Brandy's Brandy - 234265393",
      "Canada Customer - 2176",
      "Canetexon - 3280",
      "Cantanix - 2190",
      "Cardinal Integration Test - 40002",
      "CEM Industries - 1011",
      "Christy Christy Christy Test - 1096",
      "Christy's Swagger Testing - 40010",
      "Cone-line - 1920",
      "Consolidation Company - 2177",
      "Credit Card Testing Customer - 4",
      "CXT Order Updates - 507110",
      "CXT Order Updates - 822045",
      "D-kaytaxon - 540",
      "D-zumkix - 9550",
      "Damtechi - 1520",
      "Default customer - 1017",
      "Dingdanlab - 13401",
      "Domcom - 9058",
      "Dongreen - 800",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelWithScroll(label);
    });
  });
});
