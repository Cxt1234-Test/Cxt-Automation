import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage"; 
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomReferenceName,
  getRandomReferenceType,
  getRandomDisplayOption1,
  getRandomDisplayOption2,
  getRandomReference1Format,
  getRandomReference2Format,
} from "../../support/randomUtils";
describe("References Tab Fields", () => {
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
  it("should click the References button, even if it is inside the More options menu", () => {
    let found = false; // Flag to track if the button is found

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "References") {
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
          customerRecordPage.getReferencesTab();
        }
      });
  });
  it("Toggle References Dropdown - Collapse and Expand", () => {
    customerRecordPage.toggleReferencesDropdown();
  });
  it("Click Add a Reference button", () => {
    customerRecordPage.clickAddReferenceButton();
  });
  it("should enter a value in Reference Name field", () => {
    const referenceName = getRandomReferenceName(); // Example utility function

    customerRecordPage.enterReferenceName(referenceName);
  });
  it("should choose and verify a random Reference Type option", () => {
    const referenceType = getRandomReferenceType();

    customerRecordPage.chooseReferenceType(referenceType);
    customerRecordPage.verifyReferenceType(referenceType);
  });
  it("should save the Add Reference Save button", () => {
    customerRecordPage.AddReferenceSave();
  });
  //
  it("should click the References Edit button", () => {
    customerRecordPage.clickEditReferenceButton();
  });
  it("should Enter a value into the Reference Name field", () => {
    const referenceName = getRandomReferenceName(); // Example utility function

    customerRecordPage.enterReferenceName(referenceName);
  });
  it("should Select and verify a random option from the Reference Type dropdown", () => {
    const referenceType = getRandomReferenceType();

    customerRecordPage.chooseReferenceType(referenceType);
    customerRecordPage.verifyReferenceType(referenceType);
  });
  it("should Click the Save button to save the added reference", () => {
    customerRecordPage.AddReferenceSave();
  });
  it("should click the 'Delete' button On References", () => {
    customerRecordPage.clickRefrencesDeletedButton();
  });
  it("should Click the 'Delete' button under the References section", () => {
    customerRecordPage.clickRefrencesDeletedButton();
  });
  it("should toggle the References Options dropdown", () => {
    customerRecordPage.toggleReferencesOptionsDropdown();
  });
  it("should add a value in Display Option 1 field", () => {
    const value = getRandomDisplayOption1(); // Define this function in your utils

    customerRecordPage.enterDisplayOption1(value);
  });
  it("should Add the Display Option 2 text in the field", () => {
    const displayOption2 = getRandomDisplayOption2();

    customerRecordPage.enterDisplayOption2(displayOption2);
  });
  it("should Add the References 1 Format text in the field", () => {
    const reference1Format = getRandomReference1Format();

    customerRecordPage.enterReference1Format(reference1Format);
  });
  it("should Add the References 2 Format text in the field", () => {
    const reference2Format = getRandomReference2Format();

    customerRecordPage.enterReference2Format(reference2Format);
  });
  it("should toggle the 'Warning for invalid reference length' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxByLabel(
      " Warning for invalid reference length "
    );
  });
  it("should toggle the 'Warning for invalid reference length' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxByLabel(
      "Warning for invalid reference length"
    );
  });
  //
  it("should toggle the ' Require Reference 1 ' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxByLabel(" Require Reference 1 ");
  });
  it("should toggle the ' Require Reference 1 ' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxByLabel(" Require Reference 1 ");
  });
  it("should toggle the ' Require Reference 2 ' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxByText("  Require Reference 2  ");
  });
  it("should toggle the ' Require Reference 2 ' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxByText("  Require Reference 2  ");
  });
  it("should toggle the ' Show Reference List ' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxListByText(" Show Reference List   ");
  });
  it("should toggle the ' Show Reference List ' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxListByText(" Show Reference List ");
  });
  it("should toggle the ' Accept Listed Reference Only (Reference 1) ' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxRefrences1ByText(
      "  Accept Listed Reference Only (Reference 1) "
    );
  });
  it("should toggle the ' Accept Listed Reference Only (Reference 1) ' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxRefrences1ByText(
      "  Accept Listed Reference Only (Reference 1) "
    );
  });
  it("should toggle the '  Accept Listed Reference Only (Reference 2) ' checkbox 'check'", () => {
    customerRecordPage.toggleCheckboxRefrences2ByText(
      "  Accept Listed Reference Only (Reference 2) "
    );
  });
  it("should toggle the '  Accept Listed Reference Only (Reference 2) ' checkbox 'Uncheck'", () => {
    customerRecordPage.toggleCheckboxRefrences2ByText(
      "  Accept Listed Reference Only (Reference 2) "
    );
  });
});
