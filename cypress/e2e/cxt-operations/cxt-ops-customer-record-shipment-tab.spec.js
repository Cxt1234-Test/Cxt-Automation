import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomComment,
  getRandomTab,
  getRandomForceLocationScanOption,
  getRandomForceLocationScanDeliveryOption,
  getRandomOriginCaption,
  getRandomServiceOrVehicleType,
  getRandomDefaultServiceType,
  getRandomDefaultOrderType,
  getRandomImageFileConversion,
  getRandomTabSelection,
  getRandomReminderText,
  getRandomDriverNote,
  getRandomRouteComment,
  getRandomCaption,
  getRandomSignatureText,
  getRandomDistanceUnit,
  getRandomDispatchPriority,
} from "../../support/randomUtils"; 
describe("Customer Record Shipment Tab", () => {
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
  it("should verify shipments Tab and new features", () => {
    customerRecordPage.getShipmentsTabButton();
    customerRecordPage.getShipmentOptionsText().should("be.visible");
 
    const randomTabToSelect = getRandomTabSelection();
 
    const toggleCheckbox = (tab) => {
      customerRecordPage.getTabs(tab).should("be.visible");
 
      customerRecordPage
        .getCheckboxForTab(tab)
        .should("exist")
        .then(($checkbox) => {
          if ($checkbox.prop("checked")) {
            cy.wrap($checkbox).uncheck({ force: true });
            customerRecordPage.getCheckboxForTab(tab).should("not.be.checked");
          } else {
            cy.wrap($checkbox).check({ force: true });
            customerRecordPage.getCheckboxForTab(tab).should("be.checked");
          }
        });
    };
 
    // Flip the state of all checkboxes, then randomly select one
    customerRecordPage.getAllTabs().each(($tab) => {
      toggleCheckbox($tab.text().trim());
    });
 
    // Randomly select one tab
    toggleCheckbox(randomTabToSelect);
  });
  it("should verify credit card settings for on-demand orders", () => {
    customerRecordPage
      .getCreditCardSettingsTitle()
      .should(
        "contain",
        "Credit Card Setting for On Demand Orders (Operations)"
      );
 
    // Step 1: Check "Never Accept Cards"
    customerRecordPage.selectCreditCardOption("Never Accept Cards");
    customerRecordPage.getNeverAcceptCardsOption().should("be.checked");
 
    // Step 2: Check "Only Accept Credit Cards" (this unchecks "Never Accept Cards")
    customerRecordPage.selectCreditCardOption("Only Accept Credit Cards");
    customerRecordPage.getOnlyAcceptCreditCardsOption().should("be.checked");
    customerRecordPage.getNeverAcceptCardsOption().should("not.be.checked");
 
    // Step 3: Check back "Never Accept Cards" (this unchecks "Only Accept Credit Cards")
    customerRecordPage.selectCreditCardOption("Never Accept Cards");
    customerRecordPage.getNeverAcceptCardsOption().should("be.checked");
    customerRecordPage
      .getOnlyAcceptCreditCardsOption()
      .should("not.be.checked");
  });
 
  it("should verify shipments Tab and randomly select a feature", () => {
    const randomTab = getRandomTab();
 
    // Select a random checkbox
    customerRecordPage.checkCheckbox(randomTab);
 
    // Verify that it is checked
    customerRecordPage.getCheckboxForTab(randomTab).should("be.checked");
  });
  it("should select a random option from Force Location Scan on PickUp", () => {
    const randomOption = getRandomForceLocationScanOption();
 
    // Select a random option from the dropdown
    customerRecordPage.selectOption(randomOption);
 
    // Validate that the correct option is selected
    customerRecordPage
      .getForceLocationScanOnPickupDropdown()
      .should("contain", randomOption);
  });
 
  it("should select a random option from Force Location Scan on Delivery", () => {
    const randomOption = getRandomForceLocationScanDeliveryOption();
 
    // Select a random option from the dropdown
    customerRecordPage.selectForceLocationScanDeliveryOption(randomOption);
 
    // Validate that the correct option is selected
    customerRecordPage
      .getForceLocationScanOnDeliveryDropdown()
      .should("contain", randomOption);
  });
  it("should select a random option from Origin Caption", () => {
    const randomOption = getRandomOriginCaption();
     customerRecordPage.selectOriginCaption(randomOption);
     customerRecordPage
      .getOriginCaptionInput()
      .should("have.value", randomOption);
  });
  it("should add a comment in the Origin Comments field", () => {
    const randomComment = getRandomComment(); 
 
    customerRecordPage.enterOriginComment(randomComment); 
    customerRecordPage.validateOriginComment(randomComment); 
  });
  it("should add a comment in the 'Destination Comments' field", () => {
    const randomComment = getRandomComment(); 
 
    customerRecordPage.enterDestinationComment(randomComment); 
    customerRecordPage.validateDestinationComment(randomComment); 
  });
  it("should select a random option between 'Service Type' and 'Vehicle Type'", () => {
    const randomOption = getRandomServiceOrVehicleType();
 
    customerRecordPage.selectServiceOrVehicleType(randomOption);
 
    customerRecordPage.getServiceTypeInput().should("have.value", randomOption);
  });
  it("should select and verify Default Service Type options", () => {
    const randomServiceType = getRandomDefaultServiceType();
 
    customerRecordPage.selectDefaultServiceType(randomServiceType);
 
    // Verify the selected option
    customerRecordPage.verifySelectedDefaultServiceType(randomServiceType);
  });
  it("should select and verify Default Order Type options and finally select randomly option", () => {
    const randomOrderType = getRandomDefaultOrderType();
 
    // Select the Default Order Type option
    customerRecordPage.selectDefaultOrderType(randomOrderType);
 
    // Verify the selected option
    customerRecordPage.verifySelectedDefaultOrderType(randomOrderType);
  });
 
  it("should select and verify Default Image File Conversion options and finally select 'BMP'", () => {
    const randomConversionType = getRandomImageFileConversion();
 
    // Select the Default Image File Conversion option
    customerRecordPage.selectDefaultImageConversion(randomConversionType);
 
    // Verify the selected option
    customerRecordPage.verifySelectedDefaultImageConversion(
      randomConversionType
    );
  });
  it("should add a random CSR reminder", () => {
    const randomReminderText = getRandomReminderText();
 
    customerRecordPage.getCsrReminderField().clear().type(randomReminderText);
    customerRecordPage
      .getCsrReminderField()
      .should("have.value", randomReminderText);
  });
  it("should select and verify Dispatch Priority options", () => {
    const randomPriority = getRandomDispatchPriority();
 
    // Select Dispatch Priority
    customerRecordPage.selectDispatchPriority(randomPriority);
 
    // Verify the selected option
    customerRecordPage.verifySelectedDispatchPriority(randomPriority);
  });
  it("should add a random dispatch reminder", () => {
    const randomDispatchReminder = getRandomReminderText();
    customerRecordPage
      .getDispatchReminderField()
      .clear()
      .type(randomDispatchReminder);
    customerRecordPage
      .getDispatchReminderField()
      .should("have.value", randomDispatchReminder);
  });
  it("should add a random driver note", () => {
    const randomDriverNote = getRandomDriverNote();
 
    customerRecordPage.getDriverNotesField().clear().type(randomDriverNote);
    customerRecordPage
      .getDriverNotesField()
      .should("have.value", randomDriverNote);
  });
  it("should add a random route comment", () => {
    const randomRouteComment = getRandomRouteComment();
 
    customerRecordPage.getRouteCommentsField().clear().type(randomRouteComment);
    customerRecordPage
      .getRouteCommentsField()
      .should("have.value", randomRouteComment);
  });
  it("should add random display text during signature collections", () => {
    const randomSignatureText = getRandomSignatureText();
 
    customerRecordPage
      .getSignatureCollectionTextField()
      .clear()
      .type(randomSignatureText);
    customerRecordPage
      .getSignatureCollectionTextField()
      .should("have.value", randomSignatureText);
  });
  it("should select and verify Default Distance Unit options", () => {
    const randomDistanceUnit = getRandomDistanceUnit();
 
    // Select the Default Distance Unit option
    customerRecordPage.selectDefaultDistanceUnit(randomDistanceUnit);
 
    // Verify the selected option
    customerRecordPage.verifySelectedDefaultDistanceUnit(randomDistanceUnit);
  });
 
  it("should set random captions for all User Fields", () => {
    // Loop through all 6 User Fields
    for (let i = 1; i <= 6; i++) {
      const randomCaption = getRandomCaption(i);
      customerRecordPage.setUserFieldCaption(i, randomCaption);
    }
  });
  it("should save the button", () => {
    customerRecordPage.clickSaveButton2();
  });
});
 
 