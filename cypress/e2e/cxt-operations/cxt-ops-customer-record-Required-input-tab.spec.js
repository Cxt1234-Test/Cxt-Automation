import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomDriverPrompt,
  getRandomEvents,
  getRandomInputType,
  getRandomDeliveryInstruction,
  getRandomStopType,
  getRandomRouteEvent,
} from "../../support/randomUtils";
describe("Required Input tab checking ", () => {
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
  it("should click the Req. Input button, even if it is inside the More options menu", () => {
    let found = false; // Flag to track if the button is found

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Req. Input") {
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
          customerRecordPage.clickReqInputButton();
        }
      });
  });
  it('should click on the "+ Add New Prompt" button and add other on Demand  Information', () => {
    customerRecordPage.clickAddNewPromptButton();
  });
  it("should configure a Driver Prompt within the On Demand Required Input settings", () => {
    cy.wait(2000);
    const driverPrompt = getRandomDriverPrompt();

    // Enter the generated Driver Prompt
    customerRecordPage.setDriverPrompt(driverPrompt);
  });
  it("should choose a random Event from the available options ", () => {
    // Generate a random Event (Pickup or Delivery)
    const event = getRandomRouteEvent();

    // Select the random Event
    customerRecordPage.selectEvent(event);
  });
  it("should select an Input Type from the dropdown menu ", () => {
    // Generate a random Input Type
    const inputType = getRandomInputType();

    // Select the random Input Type
    customerRecordPage.selectInputType(inputType);
  });
  it("should save the On Demand Required Driver Input button", () => {
    customerRecordPage.requiredDriverSave();
  });
  it("should modify an existing On Demand Required Driver Input  ", () => {
    customerRecordPage.clickEditButton();
  });
  it("should add the Driver Prompt  on the demand required input", () => {
    cy.wait(2000);
    const driverPrompt = getRandomDriverPrompt();

    // Enter the generated Driver Prompt
    customerRecordPage.setDriverPrompt(driverPrompt);
  });
  it("should should select the random Event option (Pickup or Delivery) ", () => {
    // Generate a random Event (Pickup or Delivery)
    const event = getRandomRouteEvent();

    // Select the random Event
    customerRecordPage.selectEvent(event);
  });
  it("should Click on  dropdown select the Input Type option ", () => {
    // Generate a random Input Type
    const inputType = getRandomInputType();

    // Select the random Input Type
    customerRecordPage.selectInputType(inputType);
  });
  it("should save  On Demand Prompts Required Driver Input button", () => {
    customerRecordPage.requiredDriverSave();
  });
  it("should click the 'Delete' button On Demand Prompt", () => {
    cy.wait(1000);
    customerRecordPage.clickDeletedButton();
  });
  it("should cancel deletion by clicking 'No' on the deleted prompt", () => {
    customerRecordPage.clickDeletePromptNo();
  });
  it("should click the 'Delete' button On Demand (RDI) Prompts", () => {
    cy.wait(1000);
    customerRecordPage.clickDeletedButton();
  });

  it("should confirm deletion by clicking 'Yes' on the delete (RDI) prompt", () => {
    customerRecordPage.clickDeletePromptYes();
  });

  it('should click on  Route Prompt "+ Add New Prompt button" And Add the other Route Information  ', () => {
    customerRecordPage.clickAddNewPromptRouteButton();
  });
  it("should add  Driver Prompt Instruction  on the Routed required input ", () => {
    const driverPrompt = getRandomDeliveryInstruction();

    // Enter the generated Driver Prompt
    customerRecordPage.setDriverPrompt(driverPrompt);
  });
  it("should should select the random Stop Type option From Route (RDI)", () => {
    const stopType = getRandomStopType();

    // Select the random Stop Type
    customerRecordPage.selectStopType(stopType);
  });
  it("should should select the random Event Type option From Route (RDI)", () => {
    const events = getRandomEvents();
    customerRecordPage.selectEvent(events);
  });
  it("should should select  random Input Type option From Routed  (RDI)", () => {
    const inputType = getRandomInputType();
    // Select the random Input Type
    customerRecordPage.selectInputType(inputType);
  });
  it("should save the Routed Required Driver Input(RDI) button", () => {
    customerRecordPage.requiredDriverSave();
  });
  it("should  Edit the Routed Required Driver(RDI) Input button  ", () => {
    cy.wait(2000);
    customerRecordPage.clickEditButton();
  });
  it("should add the Driver Prompts  on the Routed required input (RDI)", () => {
    const driverPrompt = getRandomDeliveryInstruction();

    // Enter the generated Driver Prompt
    customerRecordPage.setDriverPrompt(driverPrompt);
  });
  it("should should select the random Stop Type option From Routed (RDI)", () => {
    const stopType = getRandomStopType();

    // Select the random Stop Type
    customerRecordPage.selectStopType(stopType);
  });
  it("should should select the random Stop Type option From Routed RDI", () => {
    const events = getRandomEvents();
    customerRecordPage.selectEvent(events);
  });
  it("should randomly select an Input Type from the Routed RDI prompt setup", () => {
    const inputType = getRandomInputType();
    // Select the random Input Type
    customerRecordPage.selectInputType(inputType);
  });
  it("should save the Routed Required Driver Input button (RDI)", () => {
    customerRecordPage.requiredDriverSave();
  });
  // to do
  it("should view deleted Routed Prompts (RDI) by clicking the button", () => {
    customerRecordPage.clickDeletedButton();
  });
  it("should click 'No' on delete prompt to cancel route removal", () => {
    customerRecordPage.clickDeletePromptNo();
  });
  it("should initiate deletion by clicking the 'Delete' icon in Route Prompts ", () => {
    customerRecordPage.clickDeletedButton();
  });

  it("should approve deletion by clicking the 'Yes' button in Routed Prompts (RDI)", () => {
    customerRecordPage.clickDeletePromptYes();
  });
});
