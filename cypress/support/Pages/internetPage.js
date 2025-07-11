class InternetPage {
  visitCustomers() {
    cy.visit(
      `${Cypress.env("BASE_URL").replace(
        /\/$/,
        ""
      )}/#/maintenance/internet-users`
    );
  }

  verifyCustomersText() {
    cy.get("div.container > div > h1")
      .contains("Internet Users")
      .should("be.visible");
  }

  clickCreateNewButton() {
    cy.get('button[mattooltip="Create New"]')
      .should("be.visible")
      .click({ force: true });
  }
  selectInternetUserDropdownOption(option) {
    cy.get("#mat-select-0").click();
    cy.get("mat-option")
      .filter((index, el) => Cypress.$(el).text().trim() === option)
      .click();
  }
  clickInternetUserAddressBookButton() {
    cy.contains("button span.mat-button-wrapper", "Address Book").click();
  }
  clickInetUserAddressBookPlusButton() {
    cy.get('button[mattooltip="Create New"][mat-flat-button]').click({
      force: true,
    });
  }
  chooseSearchAddressBookEntry(entryName) {
    cy.get(".cdk-overlay-backdrop", { timeout: 10000 }).should("not.exist");

    cy.get('input[aria-label="Number"][data-placeholder="Search Address Book"]')
      .clear()
      .type(entryName)
      .type("{enter}");
  }
  fillAddressInfo(
    address,
    suite,
    city,
    name,
    country,
    state,
    zip,
    plus4,
    postalCode,
    phone
  ) {
    cy.get('input[formcontrolname="name"]').clear().type(name);

    cy.get('input[formcontrolname="address"]').clear().type(address);
    cy.get('input[formcontrolname="address2"]')
      .should("be.visible")
      .type(suite);
    cy.get('input[formcontrolname="city"]').clear().type(city);

    const countries = ["US", "CA", "OTHER"];

    countries.forEach((country) => {
      cy.get('mat-select[formcontrolname="country"]').click();
      cy.get("mat-option").contains(country).click();

      if (country === "US") {
        cy.get('mat-select[formcontrolname="state"]').click({ force: true });
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
          cy.get("mat-option").contains(state).click({ force: true });
          if (index !== states.length - 1) {
            cy.get('mat-select[formcontrolname="state"]').click({
              force: true,
            });
          }
        });

        cy.wait(1000);
        cy.get('input[formcontrolname="zip"]').clear().type(zip);
        cy.get('input[formcontrolname="plus4"]')
          .should("be.visible")
          .clear()
          .type(plus4);
        cy.get('input[formcontrolname="phone"]').type(phone);
      } else if (country === "CA") {
        cy.get('mat-select[formcontrolname="state"]').click();

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
            cy.get('mat-select[formcontrolname="state"]').click();
          }
        });

        // Now enter the Postal Code
        cy.get('input[formcontrolname="postalCode"]')
          .should("be.visible")
          .and("not.be.disabled")
          .clear()
          .type(postalCode);
      } else if (country === "OTHER") {
        const alertOptions = [
          "Disabled",
          "Always Add w/ API",
          "Always Add w/ No API",
        ];
        const randomOption =
          alertOptions[Math.floor(Math.random() * alertOptions.length)];

        cy.get('mat-select[formcontrolname="autoShipTextAlertType"]')
          .should("be.visible")
          .click();

        cy.get("mat-option").contains(randomOption).click();
        cy.get('textarea[formcontrolname="originComments"]')
          .clear()
          .type("Test comment for origin.");
        cy.get('textarea[formcontrolname="destComments"]')
          .clear()
          .type("Test comment for destination.");
      }
    });
    cy.get("#btnSaved").click();
  }
  fillAddressGoogleInfo(
    address,
    suite,
    city,
    name,
    country,
    state,
    zip,
    plus4,
    postalCode,
    phone
  ) {
    cy.get('input[formcontrolname="name"]').clear().type(name);

    cy.get('input[formcontrolname="address"]').clear().type(address);
    cy.get('input[formcontrolname="address2"]')
      .should("be.visible")
      .type(suite);
    cy.get('input[formcontrolname="city"]').clear().type(city);

    const countries = ["US", "CA", "OTHER"];

    countries.forEach((country) => {
      cy.get('mat-select[formcontrolname="country"]').click();
      cy.get("mat-option").contains(country).click();

      if (country === "US") {
        cy.get('mat-select[formcontrolname="state"]').click({ force: true });
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
          cy.get("mat-option").contains(state).click({ force: true });
          if (index !== states.length - 1) {
            cy.get('mat-select[formcontrolname="state"]').click({
              force: true,
            });
          }
        });

        cy.wait(1000);
        cy.get('input[formcontrolname="zip"]').clear().type(zip);
        cy.get('input[formcontrolname="plus4"]')
          .should("be.visible")
          .clear()
          .type(plus4);
        cy.get('input[formcontrolname="phone"]').type(phone);
      } else if (country === "CA") {
        cy.get('mat-select[formcontrolname="state"]').click();

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
            cy.get('mat-select[formcontrolname="state"]').click();
          }
        });

        // Now enter the Postal Code
        cy.get('input[formcontrolname="postalCode"]')
          .should("be.visible")
          .and("not.be.disabled")
          .clear()
          .type(postalCode);
      } else if (country === "OTHER") {
        const alertOptions = [
          "Disabled",
          "Always Add w/ API",
          "Always Add w/ No API",
        ];
        const randomOption =
          alertOptions[Math.floor(Math.random() * alertOptions.length)];

        cy.get('mat-select[formcontrolname="autoShipTextAlertType"]')
          .should("be.visible")
          .click();

        cy.get("mat-option").contains(randomOption).click();
        cy.get('textarea[formcontrolname="originComments"]')
          .clear()
          .type("Test comment for origin.");
        cy.get('textarea[formcontrolname="destComments"]')
          .clear()
          .type("Test comment for destination.");
      }
    });
    cy.get("#btnSaved").click();
  }

  clickInetAddressClose() {
    cy.contains("button.mat-flat-button", "Close").click();
  }
  getSearchAddressBookInput() {
    return cy.get('input[data-placeholder="Search Address Book"]', {
      timeout: 10000,
    });
  }

  setRandomSearchAddress(searchTerm) {
    cy.get('input[data-placeholder="Search Address Book"]', { timeout: 10000 })
      .first() // ensures single element
      .click({ force: true })
      .clear({ force: true })
      .type(searchTerm)
      .type("{enter}");
  }
  clickGoogleIcon() {
    cy.get("button.mat-button-toggle-button")
      .find("mat-icon.google-address-icon")
      .scrollIntoView()
      .click({ force: true });
  }
  setSearchGooglePlace(location) {
    cy.contains("mat-label", "Search Google Places")
      .parents("mat-form-field")
      .find("input[matinput]")
      .should("be.visible")
      .click({ force: true })
      .clear({ force: true })
      .type(location)
      .type("{enter}");
  }
  clickDropPin() {
    cy.get("button.mat-button-toggle-button")
      .find("mat-icon.mat-ligature-font")
      .contains("pin_drop")
      .should("be.visible")
      .click({ force: true });
  }
  clickDoneButton() {
    cy.contains("button.mat-flat-button", "Done")
      .should("be.visible")
      .click({ force: true });
  }
  clickAddressBookIcon() {
    cy.get("button.mat-button-toggle-button")
      .find("mat-icon.mat-ligature-font")
      .contains("book")
      .scrollIntoView()
      .click({ force: true });
  }
  selectAddressBookGroup(groupName) {
    cy.get("input#address-group-input")
      .should("be.visible")
      .clear()
      .type(groupName)
      .type("{enter}");
  }

  clickDetailsTab() {
    cy.get(".mat-tab-label-content")
      .contains("Details")
      .should("be.visible")
      .click({ force: true });
  }
  enterLatitude(latitude) {
    cy.get('input[formcontrolname="lat"]')
      .should("be.visible")
      .clear()
      .type(latitude);
  }
  enterLongitude(longitude) {
    cy.get('input[formcontrolname="lon"]')
      .should("be.visible")
      .clear()
      .type(longitude);
  }
  enterLookupBarcode(barcode) {
    cy.get('input[formcontrolname="barcode"]')
      .should("be.visible")
      .clear()
      .type(barcode);
  }
  // enterInternetUserAddressLabel(label) {
  //   cy.get('input.mat-chip-input[aria-label="Label"]')
  //     .should("be.visible")
  //     .clear()
  //     .type(`${label}{enter}`);
  // }
  enterInternetUserAddressLabel(label) {
    cy.get('input.mat-chip-input[aria-label="Label"]')
      .should("be.visible")
      .clear()
      .type(`${label}{enter}`);

    // Give the UI a moment to potentially show the error message
    cy.wait(1000);

    // Check if 'duplicate label' error is present
    cy.get("body").then(($body) => {
      if (
        $body
          .text()
          .includes(
            "The provided value is already in use and cannot be duplicated"
          )
      ) {
        // If error is found, click the "Ok" button
        cy.contains("button span.mat-button-wrapper", "Ok").click({
          force: true,
        });
      }
    });
  }

  mapContainer() {
    return cy.get('div[aria-label="Map"][role="region"]');
  }

  dragMap() {
    this.mapContainer()
      .should("exist")
      .trigger("mousedown", {
        button: 1,
        clientX: 200,
        clientY: 200,
        force: true,
      })
      .trigger("mousemove", { clientX: 250, clientY: 250, force: true })
      .trigger("mouseup", { force: true });
  }

  scrollMap(delta = -300) {
    this.mapContainer().trigger("wheel", {
      deltaY: delta,
      clientX: 200,
      clientY: 200,
      force: true,
    });
  }

  // clickGeneralTab() {
  //   cy.get('[aria-controls="mat-tab-content-3-0"]').click({ force: true });
  // }
  clickInternetUsersGeneralTab() {
    cy.get('div[role="tab"]')
      .filter((i, el) => el.textContent.trim() === "General")
      .eq(1) // change to .eq(2) for 3rd tab
      .click({ force: true });
  }

  clickGoogleDraggableButton() {
    cy.get(
      'button[aria-label="Map camera controls"][title="Map camera controls"]'
    )
      .should("be.visible")
      .click({ force: true });
  }
  clickGoogleZoomInButton() {
    cy.get('button[aria-label="Zoom in"][title="Zoom in"]')
      .should("be.visible")
      .click({ force: true });
  }

  clickGoogleZoomOutButton() {
    cy.get('button[aria-label="Zoom out"][title="Zoom out"]')
      .should("exist")
      .click({ force: true });
  }
  clickGoogleMoveUpButton() {
    cy.get('button[aria-label="Move up"]').click({ force: true });
  }

  clickGoogleMoveDownButton() {
    cy.get('button[aria-label="Move down"]').click({ force: true });
  }
  clickGoogleMoveLeftButton() {
    cy.get('button[aria-label="Move left"]').click();
  }

  clickGoogleMoveRightButton() {
    cy.get('button[aria-label="Move right"]').click();
  }
  // clickContractStopAlertsTab() {
  //   cy.contains("div.mat-tab-label-content", "Contract Stop Alerts").click();
  // }
  clickContractStopAlertsTab() {
    cy.contains("div.mat-tab-label-content", "Contract Stop Alerts").click();

    // Give the UI a moment to potentially show the error message
    cy.wait(1000);

    // Check if 'Unexpected Server Exception' is present
    cy.get("body").then(($body) => {
      if ($body.text().includes("Unexpected Server Exception")) {
        // If error is found, click the "Ok" button
        cy.contains("button span.mat-button-wrapper", "Ok").click({
          force: true,
        });
      }
    });
  }

  selectContractStopAlertEnforcement(option) {
    cy.get('mat-select[formcontrolname="contractAlertEnforcement"]')
      .should("be.visible")
      .click({ force: true }); // Force click to bypass overlay issue

    cy.get(".mat-option-text").contains(option).click({ force: true }); // Also force-select the desired option
  }

  enterContractStopAlertMessage(message) {
    cy.contains("mat-form-field", "Contract Stop Alert Message")
      .find("textarea")
      .scrollIntoView()
      .should("exist")
      .clear({ force: true })
      .type(message, { delay: 10, force: true });
  }

  clickRevertToDefaultButton() {
    cy.contains("button span", "Revert to Default")
      .should("be.visible")
      .click();
  }
//
  clickDeletedButtons() {
    cy.get("button mat-icon")
      .contains("delete")
      .parents("button")
      .then(($buttons) => {
        if ($buttons.length > 1) {
          cy.wrap($buttons.eq(1)).click({ force: true });
        } else {
          cy.log("Second delete button not found");
        }
      });
  }
//
  searchShippingCustomer(option) {
    cy.get('input[data-placeholder="Search"]')
      .eq(1)
      .should("be.visible")
      .scrollIntoView()
      .clear()
      .type(option);
  }
  getLocationSearchInput() {
    // Target the correct input field using a specific class or index
    return cy.get('.list-filter-form input[placeholder="Search"]').first();
  }

  typeInLocationSearch(term) {
    this.getLocationSearchInput().clear().type(term, { delay: 100 });
  }

  selectLocationOption(term) {
    // Click the matching dropdown item
    cy.contains("mat-option", term).click({ force: true });
  }
}
export default new InternetPage();
