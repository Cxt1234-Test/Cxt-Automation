class CustomerPage {
  // Visit the customer maintenance page
  visitCustomers() {
    cy.visit(
      `${Cypress.env("BASE_URL").replace(/\/$/, "")}/#/maintenance/customers`
    );
  }

  // Verify the 'Customers' text is visible
  verifyCustomersText() {
    cy.get("div.container > div > h1")
      .contains("Customers")
      .should("be.visible");
  }

  // Click the 'Create New' button
  clickCreateNewButton() {
    cy.get('button[mattooltip="Create New"]')
      .should("be.visible")
      .click({ force: true });
  }

  // Verify the drawer is visible
  verifyDrawerVisible() {
    cy.get(".mat-drawer.right-drawer").should("be.visible");
  }

  // Click on the button with text 'General' and then verify the drawer is visible
  clickGeneralButtonAndVerifyDrawer() {
    // Click on the button that has the text 'General'
    cy.contains("div.ellipsis.active", "General").should("be.visible").click();

    // Verify the drawer is visible after clicking the 'General' button
    this.verifyDrawerVisible();
  }

  // Fill in customer information
  fillCustomerInfo(id, name, lookup) {
    cy.get('input[id="mat-input-3"]').should("be.visible").type(id);

    cy.get('input[id="mat-input-4"]').should("be.visible").type(name);

    cy.get('input[id="mat-input-22"]').should("be.visible").type(lookup);
  }

  // Click on the 'Local Information' menu button
  clickLocalInfoButton() {
    cy.get("mat-expansion-panel-header")
      .eq(0) // Ensure you're selecting the first panel header
      .then(($header) => {
        const isExpanded = $header.attr("aria-expanded") === "true"; // Check if it's expanded (open)

        if (isExpanded) {
          // If it's already open, click to close it
          cy.wrap($header).find(".mat-expansion-indicator").click();
        }

        // Click again to open the dropdown
        cy.wrap($header).find(".mat-expansion-indicator").click();
      });
  }

  clickEditAddressButton() {
    cy.get('button[mattooltip="Edit Address"]').click();
  }

  // Verify that "Edit Address" text is visible on the new screen
  verifyEditAddressText() {
    cy.contains("Edit Address", { timeout: 8000 }) // Wait up to 8 seconds
      .should("be.visible");
  }

  // Fill in address fields
  fillAddressInfo(address, suite, city, country, state, zip, phone) {
    cy.get('input[formcontrolname="address"]').type(address);
    cy.get('input[formcontrolname="address2"]')
      .should("be.visible")
      .type(suite);
    cy.get('input[formcontrolname="city"]').type(city);

    const countries = ["US", "CA", "OTHER"];

    countries.forEach((country) => {
      // Open the country dropdown
      cy.get('mat-select[formcontrolname="country"]').click();

      // Select the country from the dropdown
      cy.get("mat-option").contains(country).click();

      if (country === "US") {
        // If country is US, show state dropdown and select all states
        cy.get('mat-select[formcontrolname="state"]').click();
        const states = [
          "AL",
          "AK",
          "AS",
          "AZ",
          "AR",
          "CA",
          "CO",
          "CT",
          "DE",
          "DC",
          "FM",
          "FL",
          "GA",
          "GU",
          "HI",
          "ID",
          "IL",
          "IN",
          "IA",
          "KS",
          "KY",
          "LA",
          "ME",
          "MH",
          "MD",
          "MA",
          "MI",
          "MN",
          "MS",
          "MO",
          "MT",
          "NE",
          "NV",
          "NH",
          "NJ",
          "NM",
          "NY",
          "NC",
          "ND",
          "MP",
          "OH",
          "OK",
          "OR",
          "PW",
          "PA",
          "PR",
          "RI",
          "SC",
          "SD",
          "TN",
          "TX",
          "UT",
          "VT",
          "VI",
          "VA",
          "WA",
          "WV",
          "WI",
          "WY",
        ]; // Example states

        states.forEach((state, index) => {
          cy.get("mat-option").contains(state).click();

          // Close the dropdown after each selection, except the last state
          if (index !== states.length - 1) {
            cy.get('mat-select[formcontrolname="state"]').click();
          }
        });
        cy.wait(1000);
        cy.get('input[formcontrolname="zip"]').type(zip);
        cy.get('input[formcontrolname="phone"]').type(phone);
      } else if (country === "CA") {
        // If country is CA, show province dropdown and select all provinces
        cy.get('mat-select[formcontrolname="state"] .mat-select-arrow').click();

        const provinces = [
          "AB",
          "BC",
          "MB",
          "NB",
          "NL",
          "NS",
          "NT",
          "NU",
          "ON",
          "PE",
          "QC",
          "SK",
          "YK",
        ]; // Example provinces

        provinces.forEach((province, index) => {
          cy.get("mat-option").contains(province).click();

          // Close the dropdown after each selection, except the last province
          if (index !== provinces.length - 1) {
            cy.get(
              'mat-select[formcontrolname="state"] .mat-select-arrow'
            ).click();
          }
        });
      } else if (country === "OTHER") {
        // If country is "OTHER", just move on without showing any dropdown
        // Click the Save button
        cy.get("#btnSaved").click(); // This is the most reliable selector since IDs are unique
      }
    });
  }

  fillAdditionalContactInfo(phone1, phone2, fax, contact, contactTitle, email) {
    cy.get('input[id="mat-input-7"]', { timeout: 10000 })
      .should("be.visible")
      .type(phone2); // Phone 2 (using the correct ID for Phone 2)
    cy.get('input[id="mat-input-8"]', { timeout: 10000 })
      .should("be.visible")
      .type(fax); // Fax
    cy.get('input[id="mat-input-9"]', { timeout: 10000 })
      .should("be.visible")
      .type(contact); // Assuming `contact` is a variable containing the contact value

    cy.get('input[id="mat-input-10"]', { timeout: 10000 })
      .should("be.visible")
      .type(contactTitle); // Assuming `contactTitle` is a variable containing the contact title
    cy.get('input[id="mat-input-11"]', { timeout: 10000 })
      .should("be.visible")
      .type(email); // Email
  }

  // Click on the save button
  clickSaveButton() {
    // Using the ID attribute to select the save button directly
    cy.get("#btnSaved").click(); // This is the most reliable selector since IDs are unique
  }

  // Click on the Process Address button
  clickProcessAddressButton() {
    cy.get("button").contains("Process Address").click();
  }
  clickSaveButton2() {
    cy.get('button.mat-flat-button.mat-primary[type="submit"]')
      .should("be.visible")
      .click({ force: true });
  }

  // Click on the Undo button
  clickUndoButton() {
    cy.get("button").contains("Undo").click();
  }
  clickGeneralInfoDropdown() {
    cy.contains("mat-expansion-panel-header", "General Information")
      .then(($header) => {
        if ($header.attr("aria-expanded") === "true") {
          cy.wrap($header).click(); // Close if open
        }
      })
      .then(() => {
        cy.contains(
          "mat-expansion-panel-header",
          "General Information"
        ).click(); // Open again
      });
  }
  verifyFieldLabel(labelText) {
    cy.get(".mat-chip-list-wrapper")
      .contains("mat-chip", labelText)
      .should("be.visible");
  }
  // Method to open the business unit dropdown
  openBusinessUnitDropdown() {
    cy.get('mat-select[formcontrolname="businessUnitId"]').click();
  }

  // Method to select an option from the business unit dropdown
  selectBusinessUnit(optionText) {
    cy.contains("mat-option", optionText).click();
  }

  // Method to verify the selected option in the dropdown
  verifySelectedBusinessUnit(optionText) {
    cy.get('mat-select[formcontrolname="businessUnitId"]').should(
      "contain",
      optionText
    );
  }
  // Method to open the 'Customer Type' dropdown by clicking on the arrow (force click)
  openCustomerTypeDropdown() {
    cy.get('mat-select[formcontrolname="custType"]')
      .find(".mat-select-arrow-wrapper") // Target the arrow wrapper div
      .click({ force: true }); // Force click to bypass visibility check
  }

  // Method to select an option from the 'Customer Type' dropdown
  selectCustomerType(optionText) {
    cy.contains("mat-option", optionText).click({ force: true }); // Force click to bypass overlay blocking
  }

  // Method to verify the selected 'Customer Type'
  verifySelectedCustomerType(optionText) {
    cy.get('mat-select[formcontrolname="custType"]').should(
      "contain",
      optionText
    );
  }
  // Method to open the 'Customer Source' dropdown by clicking on the arrow (force click)
  openCustomerSourceDropdown() {
    cy.get('mat-select[formcontrolname="custSource"]')
      .find(".mat-select-arrow-wrapper") // Target the arrow wrapper div
      .click({ force: true }); // Force click to bypass visibility check
  }

  // Method to select an option from the 'Customer Source' dropdown
  selectCustomerSource(optionText) {
    cy.contains("mat-option", optionText) // Find the mat-option containing the text
      .click({ force: true }); // Force click to bypass overlay blocking
  }

  // Method to verify the selected 'Customer Source'
  verifySelectedCustomerSource(optionText) {
    cy.get('mat-select[formcontrolname="custSource"]').should(
      "contain",
      optionText
    );
  }
  // / Method to add text to the 'userField1' input
  addTextToUserField1(text) {
    cy.get('[formcontrolname="userField1"]') // Target the input by its formcontrolname
      .type(text, { force: true }); // Type the text into the input field, bypassing visibility check
  }
  addTextToUserField2(text) {
    cy.get('[formcontrolname="userField2"]') // Target the input by its formcontrolname
      .type(text, { force: true }); // Type the text into the input field, bypassing visibility check
  }
  addTextToUserField(fieldSelector, text) {
    cy.get(fieldSelector)
      .clear({ force: true }) // Clears the input field before typing
      .type(text.trim(), { force: true, delay: 0 }); // Ensures single-line text entry
  }

  // Method to click the 'Customer Since' date picker and select a random date
  selectCustomerSinceDate() {
    // Open the date picker by clicking the first calendar icon (if multiple exist)
    cy.get("mat-datepicker-toggle").first().click({ force: true }); // Force click to bypass visibility check

    // Wait for the calendar to be visible
    cy.get(".mat-calendar").should("be.visible");

    // Select a random date from the calendar
    cy.get(".mat-calendar-body-cell")
      .not(".mat-calendar-body-cell-disabled") // Exclude disabled dates (if any)
      .then((dates) => {
        const enabledDates = Cypress._.filter(
          dates,
          (date) => !Cypress.$(date).hasClass("mat-calendar-body-cell-disabled")
        );
        const randomDate = Cypress._.sample(enabledDates); // Randomly pick an enabled date
        cy.wrap(randomDate).click(); // Click the random date
      });
  }
  selectLastOrderedDate() {
    cy.get("mat-datepicker-toggle").eq(1).click({ force: true });

    cy.get(".mat-calendar", { timeout: 15000 }).should("be.visible");

    // Select a random date from the calendar
    cy.get(".mat-calendar-body-cell")
      .not(".mat-calendar-body-cell-disabled") // Exclude disabled dates
      .then((dates) => {
        const enabledDates = Cypress._.filter(
          dates,
          (date) => !Cypress.$(date).hasClass("mat-calendar-body-cell-disabled")
        );
        const randomDate = Cypress._.sample(enabledDates); // Randomly pick an enabled date
        cy.wrap(randomDate).click(); // Click the random date
      });
  }
  clickCloseButton() {
    cy.get("button.mat-icon-button").contains("close").click({ force: true });
  }

  clickOkButton() {
    cy.get("button.mat-raised-button.mat-primary").contains("Ok").click();
  }
  clickDeleteButton() {
    cy.get("button[mat-menu-item]").contains("Delete").click();
  }
  clickYesButton() {
    cy.get("button.mat-raised-button.mat-primary").contains("Yes").click();
  }
  handleSaveAndCloseIfNeeded() {
    // Step 1: Click Save button
    cy.get('button.mat-flat-button.mat-primary[type="submit"]')
      .should("be.visible")
      .click({ force: true });

    // Wait for possible dialog/modal to appear
    cy.wait(2000);

    // Step 2: Check if Close button is visible
    cy.get("body").then(($body) => {
      if ($body.find('button.mat-icon-button:contains("close")').length > 0) {
        // Close button is visible, click Close and then Ok
        cy.get("button.mat-icon-button")
          .contains("close")
          .click({ force: true });
        cy.get("button.mat-raised-button.mat-primary")
          .contains("Ok")
          .click({ force: true });
      } else {
        // Close button not visible, do nothing further
        cy.log("Close button not visible; only Save button was clicked");
      }
    });
  }
  handleSaveAndCloseeditIfNeeded() {
    // Step 1: Click Save button
    cy.get('button.mat-flat-button.mat-primary[type="submit"]')
      .should("be.visible")
      .click({ force: true });

    // Wait for possible dialog/modal to appear
    cy.wait(2000);

    // Step 2: Check if Close button is visible
    cy.get("body").then(($body) => {
      if ($body.find('button.mat-icon-button:contains("close")').length > 0) {
        // Close button is visible, click Close and then Ok
        cy.get("button.mat-icon-button")
          .contains("close")
          .click({ force: true });
        cy.get("button.mat-raised-button.mat-primary")
          .contains("Ok")
          .click({ force: true });
        cy.get("button.mat-raised-button.mat-primary")
          .contains("Ok")
          .click({ force: true });
      } else {
        // Close button not visible, do nothing further
        cy.log("Close button not visible; only Save button was clicked");
      }
    });
  }
}
export default new CustomerPage();
