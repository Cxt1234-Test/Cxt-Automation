import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import { getRandomNoteType, getRandomComment } from "../../support/randomUtils";
describe(" Customer record Notes tab", () => {
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
          if ($el.text().trim() === "Notes") {
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
          customerRecordPage.openNoteTab();
        }
      });
  });
  it("should verify and click on the Data Stamp add the Customer Notes", () => {
    customerRecordPage.clickDateStampButton();
  });
  it("should verify and click on the New Note Button", () => {
    customerRecordPage.clickNewNoteButton();
  });
  it("should verify Add Text file text", () => {
    customerRecordPage.verifyAddTextFileVisible();
  });
  it("should choose and verify a random Note Type", () => {
    const noteType = getRandomNoteType(); // Excludes empty option

    customerRecordPage.chooseNoteType(noteType);
    customerRecordPage.verifyNoteType(noteType);
  });
  it("should Add the notes text in the field", () => {
    const note = getRandomComment();

    customerRecordPage.enterNoteText(note);
  });

  it("should verify and click on the note save button", () => {
    customerRecordPage.saveNoteButton();
  });
  it("should  Edit the Text file And Click on the Edit Pencil Icon  ", () => {
    customerRecordPage.clickEditNoteButton();
  });
  it("should verify Add Text file text", () => {
    customerRecordPage.verifyEditNoteTextFileVisible();
  });
  it("should choose and verify a random Note Type", () => {
    const noteType = getRandomNoteType(); // Excludes empty option

    customerRecordPage.chooseNoteType(noteType);
    customerRecordPage.verifyNoteType(noteType);
  });
  it("should Add the notes comment in the field", () => {
    const note = getRandomComment();

    customerRecordPage.enterNoteText(note);
  });

  it("should verify and click on the note save button", () => {
    customerRecordPage.saveNoteButton();
  });
  it("should click the 'Delete' button On Note Button", () => {
    customerRecordPage.clickDeleteNoteButton();
  });
  it("should cancel deletion by clicking 'No' on the delete Note Button", () => {
    customerRecordPage.clickDeleteNoteNo();
  });
  it("should click the 'Delete' button On Text File", () => {
    customerRecordPage.clickDeleteNoteButton();
  });
  it("should confirm deletion by clicking 'Yes' on the delete Note Button", () => {
    customerRecordPage.clickDeleteNoteYes();
  });
});
