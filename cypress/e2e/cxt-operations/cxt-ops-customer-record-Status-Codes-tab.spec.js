import customerPage from "../../support/Pages/customerPage";
import customerEditorPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomStatusCodeShowAllOption,
  getRandomStatusCodeInactiveOption,
  getRandomStatusCodeActiveOption,
} from "../../support/randomUtils";
describe("Customer Record Status Codes Fields", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    customerRecordPage.visitCustomers();
    cy.wait(1000);
  });

  it("should search for name and edit customer details", () => {
    const customers = ["Saad2494", "Ahmed9724"];

    function searchAndEdit(customerIndex) {
      const currentCustomer = customers[customerIndex];
      const newCustomer = customers[1 - customerIndex];

      cy.wait(1000);
      customerEditorPage.searchCustomer(currentCustomer);

      customerEditorPage.isCustomerVisible().then((isFound) => {
        if (isFound) {
          proceedWithEditing(currentCustomer, newCustomer);
        } else {
          cy.get("mat-card.mat-card", { timeout: 4000 }).then(($card) => {
            if ($card.length && $card.text().includes("No data to display")) {
              customerEditorPage.clearSearchField();

              cy.wait(1000);
              customerEditorPage.searchCustomer(customers[1]);

              customerEditorPage
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
      customerEditorPage.clickThreeDotIcon(currentCustomer);
      cy.wait(1000);
      customerEditorPage.selectEditOption();
      cy.wait(1000);
      customerPage.verifyDrawerVisible();
    }
  });

  it("should click the Status Codes button, even if it is inside the More options menu", () => {
    let found = false;

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Status Codes") {
            cy.wrap($button).click({ force: true });
            found = true;
          }
        });
      })
      .then(() => {
        if (!found) {
          customerRecordPage.openMenuTab();
          cy.wait(1000);
          customerRecordPage.clickStatusCodesTab();
        }
      });
  });
  it("should toggle the Status Codes dropdown open and close", () => {
    customerRecordPage.toggleStatusCodesDropdown();
  });

  it("should toggle all user Status Codes options checkboxes", () => {
    const checkboxLabels = [" Enforce Status Code List "];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });

  it("should select and verify a Inactive Status Codes Filter option", () => {
    const statusCodeOption = getRandomStatusCodeInactiveOption();
    customerRecordPage.chooseStatusCodeFilter(statusCodeOption);
    customerRecordPage.verifyStatusCodeFilter(statusCodeOption);
  });
  it("should check the In Active 'Toggle All' checkbox", () => {
    customerRecordPage.checkToggleAllCheckbox();
  });
  it("should select and verify a Show All Status Codes Filter option", () => {
    const statusCodeOption = getRandomStatusCodeShowAllOption();
    customerRecordPage.chooseStatusCodeFilter(statusCodeOption);
    customerRecordPage.verifyStatusCodeFilter(statusCodeOption);
  });
  it("should select and verify a Active Status Codes Filter option", () => {
    const statusCodeOption = getRandomStatusCodeActiveOption();
    customerRecordPage.chooseStatusCodeFilter(statusCodeOption);
    customerRecordPage.verifyStatusCodeFilter(statusCodeOption);
  });
  it("should check the 'Toggle All' Active Status checkbox", () => {
    customerRecordPage.checkToggleAllCheckbox();
  });
  it("should toggles all a Active Status checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const activeStatusOptions = [
      "016Q0YW1",
      "Attempted Dest-Closed",
      "Attempted Wrong Address",
      "Christy's Status Test",
      "COD Collected",
      "Damaged",
      "Incorrect Address",
      "Leaking",
      "Left at Door",
      "Left on Dockcccc",
      "Liver Pain",
      "NSM",
      "Outside Geofence",
      "Pickup Comment",
      "qa code",
      "Ran Out of Time",
      "Rejected",
      "Returned",
      "STAPLES - BOX LEFT BEHIND AT SDO (WILL DELVR NEXT DAY)",
      "STAPLES - BOX RECVD - NO PAPERWORK - MISSORT (RECV)",
      "STAPLES - BOX RECVD - NO PAPERWORK - OVERAGE (RECV)",
      "STAPLES - CARRIER DISPATCH ERROR (CARTON PLACED ON WRONG TRUCK - REDELIVER)",
      "STAPLES - CONSIGNEE CLOSED (REDELIVER)",
      "STAPLES - CUST REQ FUTURE DEL (DEL)",
      "STAPLES - DELIVERY SHORTAGE (MISSING CARTON)",
      "STAPLES - HELD PENDING APPT - UNSAFE TO DRIVER RELEASE",
      "STAPLES - HELD PER SHIPPER - HOLIDAY - DELIVERY NOT ATTEMPTED",
      "STAPLES - HOLIDAY CLOSED (BIZ CLOSED - REDELIVER)",
      "STAPLES - INCORRECT ADDRESS - REDELIVEREABLE 4",
      "STAPLES - INSUFF TIME TO DELIVER (BIZ CLOSED - REDELIVER)",
      "STAPLES - LATE TRAILER FROM FC (NOT ALL BOXES DELVRD)",
      "STAPLES - MECHANICAL BREAKDOWN (DEL)",
      "STAPLES - MISSED PICKUP (ALREADY PICKED UP)",
      "STAPLES - PACKAGE MISSING/SHORT (RECV)",
      "STAPLES - RECONSIGNED (RECV)",
      "STAPLES - REFUSED DELIVERY - BY CUSTOMER (DEL)",
      "STAPLES - REFUSED DELIVERY - DAMAGED (DEL)",
      "STAPLES - THIRD ATTEMPT (RETURN TO FC)",
      "STAPLES - WEATHER RELATED - REDELIVER",
      "Stat1",
      "Status Code Test",
      "Status Code Test 2",
      "test load save",
      "Traffic delays",
      "vanish",
      "XD",
    ];

    activeStatusOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
  it("should scroll to the Active Status 'Toggle All' checkbox and randomly check or uncheck it based on its current state", () => {
    cy.wait(2000);
    const activeStatusOptions = [
      "Ran Out of Time",
      "Rejected",
      "Returned",
      "STAPLES - BOX LEFT BEHIND AT SDO (WILL DELVR NEXT DAY)",
      "STAPLES - BOX RECVD - NO PAPERWORK - MISSORT (RECV)",
      "STAPLES - BOX RECVD - NO PAPERWORK - OVERAGE (RECV)",
      "STAPLES - CARRIER DISPATCH ERROR (CARTON PLACED ON WRONG TRUCK - REDELIVER)",
      "STAPLES - CONSIGNEE CLOSED (REDELIVER)",
      "STAPLES - CUST REQ FUTURE DEL (DEL)",
      "STAPLES - DELIVERY SHORTAGE (MISSING CARTON)",
    ];

    activeStatusOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
  it("should randomly select and verify an 'Inactive' option from the Status Codes filter dropdown", () => {
    const statusCodeOption = getRandomStatusCodeInactiveOption();
    customerRecordPage.chooseStatusCodeFilter(statusCodeOption);
    customerRecordPage.verifyStatusCodeFilter(statusCodeOption);
  });
  it("should check again  the In Active 'Toggle All' checkbox", () => {
    customerRecordPage.checkToggleAllCheckbox();
  });
  it("should toggles all a In Active Status checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const activeStatusOptions = [
      "016Q0YW1",
      "Attempted Dest-Closed",
      "Attempted Wrong Address",
      "Christy's Status Test",
      "COD Collected",
      "Damaged",
      "Incorrect Address",
      "Leaking",
      "Left at Door",
      "Left on Dockcccc",
      "Liver Pain",
      "NSM",
      "Outside Geofence",
      "Pickup Comment",
      "qa code",
      "STAPLES - HELD PENDING APPT - UNSAFE TO DRIVER RELEASE",
      "STAPLES - HELD PER SHIPPER - HOLIDAY - DELIVERY NOT ATTEMPTED",
      "STAPLES - HOLIDAY CLOSED (BIZ CLOSED - REDELIVER)",
      "STAPLES - INCORRECT ADDRESS - REDELIVEREABLE 4",
      "STAPLES - INSUFF TIME TO DELIVER (BIZ CLOSED - REDELIVER)",
      "STAPLES - LATE TRAILER FROM FC (NOT ALL BOXES DELVRD)",
      "STAPLES - MECHANICAL BREAKDOWN (DEL)",
      "STAPLES - MISSED PICKUP (ALREADY PICKED UP)",
      "STAPLES - PACKAGE MISSING/SHORT (RECV)",
      "STAPLES - RECONSIGNED (RECV)",
      "STAPLES - REFUSED DELIVERY - BY CUSTOMER (DEL)",
      "STAPLES - REFUSED DELIVERY - DAMAGED (DEL)",
      "STAPLES - THIRD ATTEMPT (RETURN TO FC)",
      "STAPLES - WEATHER RELATED - REDELIVER",
      "Stat1",
      "Status Code Test",
      "Status Code Test 2",
      "test load save",
      "Traffic delays",
      "vanish",
      "XD",
    ];

    activeStatusOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
  it("should scroll to the  In Active Status 'Toggle All' checkbox and randomly check or uncheck it based on its current state", () => {
    cy.wait(2000);
    const inactiveStatusOptions = [
      "Attempted Wrong Address",
      "Leaking",
      "NSM",
      "STAPLES - HOLIDAY CLOSED (BIZ CLOSED - REDELIVER)",
      "STAPLES - MISSED PICKUP (ALREADY PICKED UP)",
      "STAPLES - THIRD ATTEMPT (RETURN TO FC)",
      "Status Code Test",
      "vanish",
    ];

    inactiveStatusOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
  it("should select a random 'Inactive' status code from the filter dropdown and verify the selection", () => {
    const statusCodeOption = getRandomStatusCodeShowAllOption();
    customerRecordPage.chooseStatusCodeFilter(statusCodeOption);
    customerRecordPage.verifyStatusCodeFilter(statusCodeOption);
  });
  it("should toggles all Show All Status checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const showAllOptions = [
      "016Q0YW1",
      "Attempted Dest-Closed",
      "Attempted Wrong Address",
      "Christy's Status Test",
      "COD Collected",
      "Damaged",
      "Incorrect Address",
      "Leaking",
      "Left at Door",
      "Left on Dockcccc",
      "Liver Pain",
      "NSM",
      "Outside Geofence",
      "Pickup Comment",
      "qa code",
      "Ran Out of Time",
      "Rejected",
      "Returned",
      "STAPLES - BOX LEFT BEHIND AT SDO (WILL DELVR NEXT DAY)",
      "STAPLES - BOX RECVD - NO PAPERWORK - MISSORT (RECV)",
      "STAPLES - BOX RECVD - NO PAPERWORK - OVERAGE (RECV)",
      "STAPLES - CARRIER DISPATCH ERROR (CARTON PLACED ON WRONG TRUCK - REDELIVER)",
      "STAPLES - CONSIGNEE CLOSED (REDELIVER)",
      "STAPLES - CUST REQ FUTURE DEL (DEL)",
      "STAPLES - DELIVERY SHORTAGE (MISSING CARTON)",
      "STAPLES - HELD PENDING APPT - UNSAFE TO DRIVER RELEASE",
      "STAPLES - HELD PER SHIPPER - HOLIDAY - DELIVERY NOT ATTEMPTED",
      "STAPLES - HOLIDAY CLOSED (BIZ CLOSED - REDELIVER)",
      "STAPLES - INCORRECT ADDRESS - REDELIVEREABLE 4",
      "STAPLES - INSUFF TIME TO DELIVER (BIZ CLOSED - REDELIVER)",
      "STAPLES - LATE TRAILER FROM FC (NOT ALL BOXES DELVRD)",
      "STAPLES - MECHANICAL BREAKDOWN (DEL)",
      "STAPLES - MISSED PICKUP (ALREADY PICKED UP)",
      "STAPLES - PACKAGE MISSING/SHORT (RECV)",
      "STAPLES - RECONSIGNED (RECV)",
      "STAPLES - REFUSED DELIVERY - BY CUSTOMER (DEL)",
      "STAPLES - REFUSED DELIVERY - DAMAGED (DEL)",
      "STAPLES - THIRD ATTEMPT (RETURN TO FC)",
      "STAPLES - WEATHER RELATED - REDELIVER",
      "Stat1",
      "Status Code Test",
      "Status Code Test 2",
      "test load save",
      "Traffic delays",
      "vanish",
      "XD",
    ];

    showAllOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
  it("should scroll to the  Show all Status 'Toggle All' checkbox and randomly check or uncheck it based on its current state", () => {
    cy.wait(2000);
    const showAllOptions = [
      "Ran Out of Time",
      "Rejected",
      "Returned",
      "STAPLES - BOX LEFT BEHIND AT SDO (WILL DELVR NEXT DAY)",
      "STAPLES - BOX RECVD - NO PAPERWORK - MISSORT (RECV)",
      "STAPLES - BOX RECVD - NO PAPERWORK - OVERAGE (RECV)",
      "STAPLES - CARRIER DISPATCH ERROR (CARTON PLACED ON WRONG TRUCK - REDELIVER)",
      "STAPLES - CONSIGNEE CLOSED (REDELIVER)",
      "STAPLES - CUST REQ FUTURE DEL (DEL)",
      "STAPLES - DELIVERY SHORTAGE (MISSING CARTON)",
    ];

    showAllOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelStatusCodeWithScroll(label);
    });
  });
});
