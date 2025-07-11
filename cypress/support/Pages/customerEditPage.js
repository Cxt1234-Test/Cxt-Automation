class customerEditPage {
  // Visit the customer maintenance page
  visitCustomerPage() {
    cy.visit(
      `${Cypress.env("BASE_URL").replace(/\/$/, "")}/#/maintenance/customers`
    );
  }

  verifyCustomersText() {
    cy.contains(" View Customers").should("be.visible");
  }

  searchCustomer(name) {
    cy.get('input[placeholder="Search"]').clear().type(name);
  }
  clearSearchField() {
    cy.get('input[placeholder="Search"]').clear();
  }

  clickThreeDotIcon(customerName) {
    cy.get("tr")
      .contains("td", customerName) // Find the row that contains 'saad'
      .parents("tr") // Get the parent <tr> element
      .find("button.mat-menu-trigger") // Find the 3-dot menu button inside that row
      .click(); // Click the button
  }
  verifyCustomersText() {
    cy.get("div.container > div > h1")
      .contains("Customers")
      .should("be.visible");
  }
  selectEditOption() {
    cy.get(".mat-menu-panel").contains("button", "Edit").click();
  }
  fillCustomerInfo(name, lookup) {
    cy.get('input[formcontrolname="name"]')
      .should("be.visible")
      .clear()
      .type(name);

    cy.get('input[formcontrolname="accountKey"]')
      .should("be.visible")
      .clear()
      .type(lookup);
  }

  // Fill in address fields
  fillAddressInfos(name, address, suite, city, country, state, zip, phone) {
    if (name) {
      cy.get('input[formcontrolname="name"]')
        .should("be.visible")
        .clear()
        .type(name);
    }

    if (address) {
      cy.get('input[formcontrolname="address"]').clear().type(address);
    }

    if (suite) {
      cy.get('input[formcontrolname="address2"]')
        .should("be.visible")
        .clear()
        .type(suite);
    }

    if (city) {
      cy.get('input[formcontrolname="city"]')
        .should("be.visible")
        .and("not.be.disabled")
        .clear()
        .type(city);
    }

    const countries = ["US", "CA", "OTHER"];

    countries.forEach((country) => {
      cy.get('mat-select[formcontrolname="country"]').click();
      cy.get("mat-option").contains(country).click();

      if (country === "US") {
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
        ];

        states.forEach((state, index) => {
          cy.get("mat-option").contains(state).click();
          if (index !== states.length - 1) {
            cy.get('mat-select[formcontrolname="state"]').click();
          }
        });
        cy.wait(1000);

        if (zip) {
          cy.get('input[formcontrolname="zip"]').clear().type(zip);
        }
        if (phone) {
          cy.get('input[formcontrolname="phone"]').clear().type(phone);
        }
      } else if (country === "CA") {
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
        ];

        provinces.forEach((province, index) => {
          cy.get("mat-option").contains(province).click();
          if (index !== provinces.length - 1) {
            cy.get(
              'mat-select[formcontrolname="state"] .mat-select-arrow'
            ).click();
          }
        });
      } else if (country === "OTHER") {
        cy.get("#btnSaved").click();
      }
    });
  }
  fillAddressInfo(address, suite, city, country, state, zip, phone) {
    // Clear and type the address
    cy.get('input[formcontrolname="address"]').clear().type(address);

    // Clear and type the suite (address2)
    cy.get('input[formcontrolname="address2"]')
      .should("be.visible")
      .clear()
      .type(suite);

    // Clear and type the city
    cy.get('input[formcontrolname="city"]').clear().type(city);

    const countries = ["US", "CA", "OTHER"];

    countries.forEach((country) => {
      // Open the country dropdown
      cy.get('mat-select[formcontrolname="country"]').click();

      // Select the country from the dropdown
      cy.get("mat-option").contains(country).click();

      if (country === "US") {
        cy.wait(500); // Adjust wait time if needed or use intercept
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
        cy.get('input[formcontrolname="phone"]').clear().type(phone);
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

  selectCustomerSinceDate() {
    const beginDate = "2025-04-10";
    cy.get('input[formcontrolname="beginDate"]')
      .clear()
      .type(beginDate, { delay: 100 })
      .should("have.value", beginDate);
  }

  selectLastOrderedDate() {
    const endDate = "2025-04-20"; // Make sure the format matches placeholder YYYY-MM-DD
    cy.get('input[formcontrolname="endDate"]')
      .should("be.visible")
      .clear()
      .type(endDate, { delay: 100 })
      .should("have.value", endDate);
  }

  fillAdditionalContactInfo(phone2, fax, contact, contactTitle, email) {
    // Clear and enter Phone 2
    cy.get("input#mat-input-7")
      .should("be.visible")
      .clear() // First, clear the existing value
      .type(phone2); // Then, enter the new value

    // Clear and enter Fax
    cy.get('input[id="mat-input-8"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(fax);

    // Clear and enter Contact
    cy.get('input[id="mat-input-9"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(contact);

    // Clear and enter Contact Title
    cy.get('input[id="mat-input-10"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(contactTitle);

    // Clear and enter Email
    cy.get('input[id="mat-input-11"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(email);
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
  openCustomerTypeDropdown() {
    cy.get('mat-select[formcontrolname="custType"]')
      .find(".mat-select-arrow-wrapper") // Target the arrow wrapper div
      .click({ force: true }); // Force click to bypass visibility check
  }
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
  openCustomerSourceDropdown() {
    cy.get('mat-select[formcontrolname="custSource"]')
      .find(".mat-select-arrow-wrapper") // Target the arrow wrapper div
      .click({ force: true }); // Force click to bypass visibility check
  }
  selectCustomerSource(optionText) {
    cy.contains("mat-option", optionText) // Find the mat-option containing the text
      .click({ force: true }); // Force click to bypass overlay blocking
  }
  verifySelectedCustomerSource(optionText) {
    cy.get('mat-select[formcontrolname="custSource"]').should(
      "contain",
      optionText
    );
  }
  addTextToUserField1(text) {
    cy.get('[formcontrolname="userField1"]')
      .clear()
      .type(text, { force: true });
  }
  addTextToUserField2(text) {
    cy.get('[formcontrolname="userField2"]')
      .clear()
      .type(text, { force: true });
  }

  clickSaveButton2() {
    cy.get('button[mattooltip="Save"]').should("be.visible").click();
  }

  editCustomerDetails(details) {
    cy.get('input[name="firstName"]').clear().type(details.firstName);
    cy.get('input[name="lastName"]').clear().type(details.lastName);
    cy.get('input[name="email"]').clear().type(details.email);
    cy.get('input[name="phone"]').clear().type(details.phone);
    cy.get('textarea[name="address"]').clear().type(details.address);
    // Adjust these selectors and add more fields as per your actual form
    cy.get("button").contains("Save").click();
  }

  verifyCustomerUpdated(name) {
    cy.contains(name)
      .parents("tr") // Find the row of the customer
      .should("contain", "Updated"); // Adjust the condition or message according to your app
  }
  isCustomerVisible(customerName) {
    cy.wait(3000);

    return cy.get("body").then(($body) => {
      if ($body.find("tr.mat-row", { timeout: 8000 }).length) {
        return true;
      } else {
        return false;
      }
    });
  }
}

export default new customerEditPage();
