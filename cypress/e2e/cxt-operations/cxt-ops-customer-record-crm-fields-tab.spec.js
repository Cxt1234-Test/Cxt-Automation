import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  generateRandomCrmTest1Number,
  getRandomCrmTest3Option,
  getRandomCrmTest4Number,
  generateRandomCrmTest2Number,
  getRandomCrmTest5Value,
  getRandomCrmTest6Option,
  getRandomCrmTest7Option,
  getRandomPeanutButterType,
  getRandomJellyType,
  getRandomBreadType,
  getRandomSideOption,
} from "../../support/randomUtils";
describe("Customer Record CRM Fields Tab", () => {
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
  it("should click the Notes button, even if it is inside the More options menu", () => {
    let found = false; // Flag to track if the button is found
 
    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "CRM Fields") {
            cy.wrap($button).click({ force: true }); // Click the button
            found = true; // Mark as found
          }
        });
      })
      .then(() => {
        if (!found) {
          // If "Req. Input" button was not found in #tab-container, open the More menu
          customerRecordPage.openMenuTab();
          cy.wait(1000);
          customerRecordPage.OpenCrmFieldsTab();
        }
      });
  });
  it("should toggle the CRM Fields dropdown open and close", () => {
    customerRecordPage.toggleCrmDropdown();
  });
  it("should add the Test 1 number in the CRM Fields section", () => {
    const number = generateRandomCrmTest1Number();
 
    customerRecordPage.enterTest1Number(number);
  });
  it("should add the Test 2 number in the CRM Fields section", () => {
    const number = generateRandomCrmTest2Number();
 
    customerRecordPage.enterTest2Number(number);
  });
  it("should choose and verify a random Test 3 option", () => {
    const test3Option = getRandomCrmTest3Option();
 
    customerRecordPage.chooseTest3Option(test3Option);
    customerRecordPage.verifyTest3Option(test3Option);
  });
  it("should enter a number in Test 4 field", () => {
    const value = getRandomCrmTest4Number();
 
    customerRecordPage.enterTest4Number(value);
  });
  it("should enter a value in Test 5 field", () => {
    const value = getRandomCrmTest5Value();
 
    customerRecordPage.enterTest5Value(value);
  });
  it("should choose and verify a random Test 6 option", () => {
    const test6Option = getRandomCrmTest6Option();
 
    customerRecordPage.chooseTest6Option(test6Option);
    customerRecordPage.verifyTest6Option(test6Option);
  });
  it("should choose and verify a random Test 7 option", () => {
    const test7Option = getRandomCrmTest7Option();
 
    customerRecordPage.chooseTest7Option(test7Option);
    customerRecordPage.verifyTest7Option(test7Option);
  });
  it("should choose and verify a random Peanut Butter Test 8 option", () => {
    const peanutButterType = getRandomPeanutButterType();
 
    customerRecordPage.choosePeanutButterType(peanutButterType);
    customerRecordPage.verifyPeanutButterType(peanutButterType);
  });
  it("should choose and verify a random Jelly Test 9 option", () => {
    const jellyType = getRandomJellyType();
 
    customerRecordPage.chooseJellyType(jellyType);
    customerRecordPage.verifyJellyType(jellyType);
  });
  it("should choose and verify a random Bread option", () => {
    const breadType = getRandomBreadType();
 
    customerRecordPage.chooseBreadType(breadType);
    customerRecordPage.verifyBreadType(breadType);
  });
  it("should choose and verify a random Sides option", () => {
    const sideOption = getRandomSideOption();
 
    customerRecordPage.chooseSideOption(sideOption);
    customerRecordPage.verifySideOption(sideOption);
  });
});
 
 