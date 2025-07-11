import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  generateRandomBillingGroupName,
  generateRandomDisplayCaption,
} from "../../support/randomUtils";
describe("Customer Record Billing Groups Tab ", () => {
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
  
  it("should click the Billing Groups button, even if it is inside the More options menu", () => {
    let found = false;

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Billing Groups") {
            cy.wrap($button).click({ force: true });
            found = true; // Mark as found
          }
        });
      })
      .then(() => {
        if (!found) {
          // If "Req. Input" button was not found in #tab-container, open the More menu
          customerRecordPage.openMenuTab();
          cy.wait(1000);
          customerRecordPage.clickBillingGroupsTab();
        }
      });
  });

  it("should close and reopen the Billing Groups expansion panel", () => {
    customerRecordPage.toggleBillingGroupsPanel();
  });

  it("should click on the Add Billing Group button", () => {
    customerRecordPage.clickAddBillingGroupButton();
  });
  it("should verify the 'Add Billing Group' header text", () => {
    customerRecordPage.verifyAddBillingGroupHeader();
  });
  it("should add the Billing Group Name in the Billing Groups section", () => {
    const groupName = generateRandomBillingGroupName();

    customerRecordPage.enterBillingGroupName(groupName);
  });
  it("should click on the Billing Group Save button", () => {
    customerRecordPage.clickBillingGroupSaveButton();
  });
  it("should click the Edit Billing Group button", () => {
    customerRecordPage.clickEditBillingGroupButton();
  });
  it("should add the Billing Group Name in the Billing Groups section", () => {
    const groupName = generateRandomBillingGroupName();

    customerRecordPage.enterBillingGroupName(groupName);
  });
  it("should click on the Billing Group Save button", () => {
    customerRecordPage.clickBillingGroupSaveButton();
  });
  it("should click the 'Delete' button On Billing Group", () => {
    customerRecordPage.clickDeleteNoteButton();
  });

  it("should close and reopen the Billing Groups Options expansion panel", () => {
    customerRecordPage.toggleBillingGroupsOptionsPanel();
  });
  it("should add the Display Caption in the Billing Group Options section", () => {
    const caption = generateRandomDisplayCaption();

    customerRecordPage.enterBillingGroupDisplayCaption(caption);
  });
  it("should check and uncheck all three billing group checkboxes", () => {
    customerRecordPage.checkBillingGroupRequired();
    customerRecordPage.uncheckBillingGroupRequired();

    customerRecordPage.checkAcceptOnlyOnDemand();
    customerRecordPage.uncheckAcceptOnlyOnDemand();

    customerRecordPage.checkAcceptOnlyRouted();
    customerRecordPage.uncheckAcceptOnlyRouted();
  });
});
