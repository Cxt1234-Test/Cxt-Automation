import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomAssignedUser,
  getRandomTaskName,
  getRandomReminderOption,
  getRandomTaskComment,
  getRandomCompletedComment,
} from "../../support/randomUtils";
describe("Customer Record Task Tab", () => {
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
  it("should click the Tasks button, even if it is inside the More options menu", () => {
    let found = false; // Flag to track if the button is found

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Tasks") {
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
          customerRecordPage.clickTasksTab();
        }
      });
  });
  it("should click on the Plus Add Task button", () => {
    customerRecordPage.clickAddTaskButton();
    cy.wait(8000);
  });
  it("should enter a value in Task Name field", () => {
    const taskName = getRandomTaskName();

    customerRecordPage.enterTaskName(taskName);
  });

  it("should select and verify a random Assigned To user", () => {
    const user = getRandomAssignedUser();

    customerRecordPage.selectAssignedTo(user);
    cy.wait(500);
    customerRecordPage.verifyAssignedTo(user);
  });

  it("should select and verify a random reminder option", () => {
    const reminderOption = getRandomReminderOption();

    customerRecordPage.selectReminder(reminderOption);
    customerRecordPage.verifyReminder(reminderOption);
  });
  it("should set the due date and time", () => {
    customerRecordPage.selectDueDateTime();
  });
  it("should enter a value in Task Comments field", () => {
    const taskComment = getRandomTaskComment();

    customerRecordPage.addTaskComments(taskComment);
  });
  it("should click on Mark As Completed button", () => {
    customerRecordPage.clickMarkAsCompleted();
  });
  it("should set the completed date and time", () => {
    customerRecordPage.selectCompletedDateTime();
  });
  it("should enter a value in Completed Comments field", () => {
    const completedComment = getRandomCompletedComment();

    customerRecordPage.addCompletedComments(completedComment);
  });
  it("should click the Tasks Save button", () => {
    customerRecordPage.clickTasksSaveButton();
  });
  it("should click the checkbox for the task", () => {
    customerRecordPage.clickCheckbox();
  });

  it("should confirm Restore Task Click on the  'Yes' Button", () => {
    customerRecordPage.clickTaskCompletedYes();
  });
});
