class CustomerRecordPage {
  visitCustomers() {
    cy.visit(
      `${Cypress.env("BASE_URL").replace(/\/$/, "")}/#/maintenance/customers`
    );
  }

  searchCustomer(name) {
    cy.get('input[placeholder="Search"]').clear().type(name);
  }
  verifyCustomersText() {
    cy.get("div.container > div > h1")
      .contains("Customers")
      .should("be.visible");
  }
  getShipmentsTabButton() {
    cy.contains("button.button-tab", "Shipments").click();
  }
  getShipmentOptionsText() {
    return cy.contains("Shipment Options");
  }
  getTabs(tabName) {
    return cy.contains(tabName);
  }
  getAllTabs() {
    return cy.get("mat-checkbox .mat-checkbox-label");
  }
  getCheckboxForTab(tabName) {
    return this.getTabs(tabName).parent().find("input[type='checkbox']");
  }
  getCreditCardSettingsTitle() {
    return cy.get(
      'mat-label:contains("Credit Card Setting for On Demand Orders (Operations)")'
    );
  }
  selectCreditCardOption(option) {
    switch (option) {
      case "Never Accept Cards":
        this.getNeverAcceptCardsOption().check({ force: true });
        break;
      case "Accept Credit Cards":
        this.getAcceptCreditCardsOption().check({ force: true });
        break;
      case "Only Accept Credit Cards":
        this.getOnlyAcceptCreditCardsOption().check({ force: true });
        break;
      default:
        throw new Error(`Invalid credit card option: ${option}`);
    }
  }
  getNeverAcceptCardsOption() {
    return cy.get("#mat-radio-2-input");
  }
  getOnlyAcceptCreditCardsOption() {
    return cy.get("#mat-radio-4-input");
  }
  checkCheckbox(tabName) {
    this.getTabs(tabName).should("be.visible");

    this.getCheckboxForTab(tabName)
      .should("exist")
      .then(($checkbox) => {
        if (!$checkbox.prop("checked")) {
          cy.wrap($checkbox).check({ force: true });
        }
      });

    this.getCheckboxForTab(tabName).should("be.checked");
  }
  selectOption(optionText) {
    this.openDropdown();

    // Wait for the dropdown to be visible and the options to appear
    cy.get('mat-select[formcontrolname="forceLocationScanPickup"]')
      .should("have.attr", "aria-expanded", "true") // Ensure the dropdown is expanded
      .then(() => {
        // Use cy.contains to select the option directly after the dropdown is opened
        cy.contains("mat-option", optionText)
          .should("be.visible") // Wait for the option to be visible
          .click(); // Click on the option
      });
  }
  openDropdown() {
    this.getForceLocationScanOnPickupDropdown().click();
  }
  getForceLocationScanOnPickupDropdown() {
    return cy.get('[formcontrolname="forceLocationScanPickup"]'); // Or use id: '#mat-select-74'
  }
  selectForceLocationScanDeliveryOption(option) {
    this.getForceLocationScanOnDeliveryDropdown().click(); // Open dropdown
    cy.contains("mat-option", option).click(); // Select option
  }
  getForceLocationScanOnDeliveryDropdown() {
    return cy.get('mat-select[formcontrolname="forceLocationScanDelivery"]');
  }
  selectOriginCaption(option) {
    this.getOriginCaptionInput().click(); // Open dropdown
    cy.get("mat-option").should("be.visible"); // Ensure options are visible
    cy.contains("mat-option", option).click(); // Select option
  }
  getOriginCaptionInput() {
    return cy.get('input[formcontrolname="originCaption"]');
  }
  enterOriginComment(comment) {
    this.getOriginCommentsField().clear().type(comment);
  }
  validateOriginComment(comment) {
    this.getOriginCommentsField().should("have.value", comment);
  }
  getOriginCommentsField() {
    return cy.get("#mat-input-27"); // Using unique ID for reliability
  }
  enterDestinationComment(comment) {
    this.getDestinationCommentsField()
      .clear({ force: true })
      .type(comment, { delay: 100 });
  }

  validateDestinationComment(comment) {
    this.getDestinationCommentsField().should("have.value", comment);
  }
  getDestinationCommentsField() {
    return cy.get("#mat-input-27"); // Using the unique ID
  }
  selectServiceOrVehicleType(option) {
    this.getServiceTypeInput().click(); // Open the dropdown
    cy.contains("mat-option", option).click(); // Select the option
  }
  getServiceTypeInput() {
    return cy.get('input[formcontrolname="serviceTypeCaption"]');
  }

  selectDefaultServiceType(option) {
    this.getDefaultServiceTypeDropdown().click(); // Open dropdown
    cy.contains("mat-option", option).click(); // Select option
  }
  verifySelectedDefaultServiceType(optionText) {
    this.getDefaultServiceTypeDropdown().should("have.text", optionText); // Check for selected text instead of value
  }
  getDefaultServiceTypeDropdown() {
    return cy.get('mat-select[formcontrolname="defaultServiceTypeId"]');
  }
  selectDefaultOrderType(option) {
    this.getDefaultOrderTypeDropdown().click({ force: true }); // Open dropdown
    cy.contains("mat-option", option).click(); // Select option
  }

  getDefaultOrderTypeDropdown() {
    return cy.get(
      'mat-select[formcontrolname="defaultOrderTypeId"] .mat-select-value-text span'
    );
  }

  verifySelectedDefaultOrderType(optionText) {
    this.getDefaultOrderTypeDropdown()
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq(optionText);
      });
  }

  selectDefaultImageConversion(option) {
    this.getDefaultImageConversionDropdown().click({ force: true }); // Open dropdown
    cy.contains("mat-option", option).click(); // Select option
  }
  verifySelectedDefaultImageConversion(option) {
    this.getDefaultImageConversionDropdown().should("contain", option); // Validate selection
  }
  getDefaultImageConversionDropdown() {
    return cy.get('mat-select[formcontrolname="defaultImageConversion"]'); // Adjust selector as per DOM
  }
  getCsrReminderField() {
    return cy.get('[formcontrolname="csrReminder"]');
  }
  selectDispatchPriority(priority) {
    this.getDispatchPriorityDropdown().click({ force: true }); // Open dropdown
    cy.contains("mat-option", priority).click(); // Select option
  }

  verifySelectedDispatchPriority(priority) {
    this.getDispatchPriorityDropdown().should("contain", priority); // Validate selection
  }
  getDispatchPriorityDropdown() {
    return cy.get('mat-select[formcontrolname="dispatchPriority"]'); // Adjust selector as per DOM
  }
  getDispatchReminderField() {
    return cy.get('[formcontrolname="dispatchReminder"]');
  }
  getDriverNotesField() {
    return cy.get('[formcontrolname="driverNotes"]');
  }
  getRouteCommentsField() {
    return cy.get('[formcontrolname="defaultRouteComments"]');
  }
  getSignatureCollectionTextField() {
    return cy.get('[formcontrolname="xMobileSignatureText"]');
  }
  getDistanceUnitDropdown() {
    return cy.get('[formcontrolname="defaultMileageUnit"]');
  }

  getDistanceUnitOptions() {
    return cy.get(".mat-option");
  }

  selectDefaultDistanceUnit(unit) {
    this.getDistanceUnitDropdown().click();
    this.getDistanceUnitOptions().contains(unit).click();
  }

  verifySelectedDefaultDistanceUnit(unit) {
    this.getDistanceUnitDropdown().should("contain", unit);
  }
  getUserFieldInput(fieldNumber) {
    return cy.get(`input[formcontrolname="userCaption${fieldNumber}"]`);
  }

  // Function to set a caption for a specific user field
  setUserFieldCaption(fieldNumber, caption) {
    this.getUserFieldInput(fieldNumber)
      .clear()
      .type(caption)
      .should("have.value", caption);
  }
  clickSaveButton2() {
    cy.get('button.mat-flat-button.mat-primary[type="submit"]')
      .should("be.visible")
      .click({ force: true });
  }
  //
  getAccountingTab() {
    return cy
      .get(
        "button.mat-focus-indicator.button-tab.mat-button.mat-button-base.ng-star-inserted"
      )
      .contains("Accounting");
  }
  getInputField(label) {
    return cy
      .contains("mat-label", label)
      .parents("mat-form-field")
      .find("input");
  }
  selectBillingStatus(status) {
    this.selectDropdownOption(this.getDropdown("billingStatus"), [status]);
  }
  selectDropdownOption(dropdown, options) {
    dropdown.should("be.visible").click();

    cy.get("mat-option").should("have.length.greaterThan", 0); // Ensure options are loaded

    options.forEach((option, index) => {
      cy.get("mat-option").each(($el) => {
        cy.wrap($el)
          .invoke("text")
          .then((text) => {
            if (text.trim() === option.trim()) {
              cy.wrap($el).click({ force: true });
            }
          });
      });

      if (index < options.length - 1) {
        // Ensure the dropdown is closed before reopening
        cy.get("body").click(0, 0); // Click outside to close the dropdown

        dropdown.click({ force: true });
      }
    });
  }
  verifySelectedBillingStatus(status) {
    this.getDropdown("billingStatus").invoke("text").should("contain", status);
  }
  getDropdown(formControlName) {
    return cy.get(`mat-select[formcontrolname="${formControlName}"]`);
  }
  selectVerificationOption(option) {
    this.selectDropdownOption(
      this.getDropdown("requireVerificationBeforeOption"),
      [option]
    );
  }
  verifySelectedVerificationOption(option) {
    this.getDropdown("requireVerificationBeforeOption")
      .invoke("text")
      .should("contain", option);
  }
  selectInvoiceFormat(format) {
    this.selectDropdownOption(this.getDropdown("printInvoiceFormat"), [format]);
  }
  verifySelectedInvoiceFormat(format) {
    this.getDropdown("printInvoiceFormat")
      .invoke("text")
      .should("contain", format);
  }
  selectEmailInvoiceFormat(format) {
    this.selectDropdownOption(this.getDropdown("emailInvoiceFormat"), [format]);
  }
  verifySelectedEmailInvoiceFormat(format) {
    this.getDropdown("emailInvoiceFormat")
      .invoke("text")
      .should("contain", format);
  }
  selectBillingCycle(cycle) {
    this.selectDropdownOption(this.getDropdown("billingCycleId"), [cycle]);
  }
  verifySelectedBillingCycle(cycle) {
    this.getDropdown("billingCycleId").invoke("text").should("contain", cycle);
  }
  uncheckCheckbox(tabName) {
    this.getTabs(tabName).should("be.visible");

    this.getCheckboxForTab(tabName)
      .should("exist")
      .then(($checkbox) => {
        if ($checkbox.prop("checked")) {
          cy.wrap($checkbox).uncheck({ force: true });
        }
      });

    this.getCheckboxForTab(tabName).should("not.be.checked");
  }
  getTabs(tabName) {
    return cy.contains(tabName);
  }
  getCheckboxForTab(tabName) {
    // Assuming the tab label contains the name of the tab, and it wraps the checkbox input
    return cy
      .contains(tabName)
      .parents("mat-checkbox")
      .find('input[type="checkbox"]');
  }
  checkCheckbox(tabName) {
    this.getTabs(tabName).should("be.visible");

    this.getCheckboxForTab(tabName)
      .should("exist")
      .then(($checkbox) => {
        if (!$checkbox.prop("checked")) {
          cy.wrap($checkbox).check({ force: true });
        }
      });

    this.getCheckboxForTab(tabName).should("be.checked");
  }
  selectBaseRateChart(option) {
    this.selectDropdownOption(this.getDropdown("baseRateChartId"), [option]);
  }
  verifySelectedBaseRateChart(option) {
    this.getDropdown("baseRateChartId").click(); // Reopen the dropdown
    cy.get("mat-option").contains(option).should("be.visible"); // Ensure full option is visible
  }
  selectItemRateChart(option) {
    this.chooseDropdownOption(this.findDropdown("itemRateChartId"), [option]);
  }
  verifySelectedItemRateChart(option) {
    this.findDropdown("itemRateChartId").click(); // Reopen the dropdown
    cy.get("mat-option")
      .contains(option, { timeout: 10000 })
      .scrollIntoView() // Make sure the option is in view
      .should("be.visible") // Confirm it's visible
      .click(); // Click the option
  }
  chooseDropdownOption(dropdown, option) {
    dropdown.click({ force: true }); // Open the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`))
      .scrollIntoView()
      .should("exist")
      .should("not.be.disabled")
      .click({ force: true }); // Select and click the option

    // Click outside to close the dropdown
    cy.get("body").click(0, 0);
  }
  findDropdown(controlName) {
    return cy.get(`[formcontrolname="${controlName}"]`).scrollIntoView();
  }
  selectItem(option) {
    this.pickItemFromDropdown(
      this.getItemDropdownElement("overrideItemPayChartId"),
      option
    );
  }
  pickItemFromDropdown(dropdown, option) {
    dropdown.click({ force: true }); // Open the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("exist")
      .should("not.be.disabled")
      .click({ force: true }); // Select and click the option

    // Click outside to close the dropdown
    cy.get("body").click(0, 0);
  }
  getItemDropdownElement(controlName) {
    return cy.get('[formcontrolname="' + controlName + '"]').scrollIntoView();
  }
  verifySelectedItem(option) {
    this.getItemDropdownElement("overrideItemPayChartId").click(); // Reopen the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true }); // Select the option
  }

  getItemDropdownElement(controlName) {
    return cy.get('[formcontrolname="' + controlName + '"]').scrollIntoView();
  }
  selectSurcharge(option) {
    this.pickDropdownOption(
      this.getSurchargeDropdown("overrideSurchargePayChartId"),
      option
    );
  }
  pickDropdownOption(dropdown, option) {
    dropdown.click({ force: true }); // Open the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("exist")
      .should("not.be.disabled")
      .click({ force: true }); // Select and click the option

    // Click outside to close the dropdown
    cy.get("body").click(0, 0);
  }
  getSurchargeDropdown(controlName) {
    return cy.get(`[formcontrolname="${controlName}"]`).scrollIntoView();
  }
  verifySelectedSurcharge(option) {
    this.getSurchargeDropdown("overrideSurchargePayChartId").click(); // Reopen the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true }); // Select the option
  }
  clickOrderTypeOverridesButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .contains("Order Type Overrides")
      .should("be.visible")
      .click();
  }
  getOrderTypesOverridesHeading() {
    return cy.get("h3").contains("Order Types Overrides");
  }
  getTimeParameterTab() {
    return cy
      .get(".mat-tab-label")
      .contains("Time Parameter", { timeout: 10000 })
      .should("be.visible");
  }

  clickTimeParameterTab() {
    this.getTimeParameterTab().click();
  }
  clickAddDiscountButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .filter(':contains("Add")') // Only buttons containing the "Add" text
      .eq(1) // Select the second button (0-based index)
      .should("be.visible")
      .click({ force: true });
  }

  selectCustomerSinceDate(date) {
    // Open the date picker for "Customer Since"
    cy.get("mat-datepicker-toggle").first().click({ force: true });

    // Ensure the calendar is fully loaded
    cy.get(".mat-calendar").should("be.visible");

    // Scroll into view before clicking to avoid overlap issues
    cy.get(".mat-calendar-body-cell-content")
      .contains(date)
      .scrollIntoView()
      .should("not.have.class", "mat-calendar-body-cell-disabled")
      .click();
  }

  selectLastOrderedDate(date) {
    // Open the date picker for "Last Ordered"
    cy.get("mat-datepicker-toggle").eq(1).click({ force: true });

    // Ensure the calendar is fully loaded
    cy.get(".mat-calendar").should("be.visible");

    // Scroll into view before clicking to avoid overlap issues
    cy.get(".mat-calendar-body-cell-content")
      .contains(date)
      .scrollIntoView()
      .should("not.have.class", "mat-calendar-body-cell-disabled")
      .click();
  }

  enterBeginWithin(number) {
    cy.get('[formcontrolname="pickupWithin"]') // Using formcontrolname for stability
      .clear()
      .type(number, { force: true });
  }
  // verifyBeginWithinValue(expectedValue) {
  //   cy.get('[formcontrolname="pickupWithin"]') // More stable selector
  //     .should("have.value", expectedValue.toString());
  // }
  enterDeliverWithin(number) {
    cy.get('[formcontrolname="deliverWithin"]') // Stable selector for "Deliver Within" field
      .clear()
      .type(number, { force: true });
  }
  verifyDeliverWithinValue(expectedValue) {
    cy.get('[formcontrolname="deliverWithin"]').should(
      "have.value",
      expectedValue.toString()
    );
  }
  toggleOverride(shouldCheck) {
    const checkbox = cy.get(
      '[formcontrolname="isOverride"] .mat-checkbox-input'
    ); // Stable selector

    checkbox.then(($el) => {
      if (shouldCheck && !$el.is(":checked")) {
        checkbox.click({ force: true }); // Check if not already checked
      } else if (!shouldCheck && $el.is(":checked")) {
        checkbox.click({ force: true }); // Uncheck if already checked
      }
    });
  }
  verifyOverrideUnchecked() {
    cy.get('[formcontrolname="isOverride"] .mat-checkbox-input').should(
      "not.be.checked"
    );
  }
  verifyOverrideChecked() {
    cy.get('[formcontrolname="isOverride"] .mat-checkbox-input').should(
      "be.checked"
    );
  }
  clickSaveButton() {
    cy.get("button.mat-raised-button.mat-primary") // Unique and stable selector
      .contains("Save") // Ensure it's the right button by text
      .click({ force: true }); // Force click in case of visibility issues
  }
  clickDiscountParameterTab() {
    cy.get('div[role="tab"]')
      .contains("Discount Parameter") // Match the tab by its label
      .should("be.visible") // Ensure it's visible
      .click({ force: true });
  }
  clickAddParameterButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .filter(':contains("Add")') // Only buttons containing the "Add" text
      .eq(1) // Select the second button (0-based index)
      .should("be.visible")
      .click({ force: true });
  }
  verifyAmountValue(expectedAmount) {
    cy.get('input[formcontrolname="amount"]') // Same unique selector
      .should("have.value", expectedAmount.toString()); // Verify the entered value
  }
  enterAmount(amount) {
    cy.get('input[formcontrolname="amount"]') // Best unique selector
      .should("be.visible") // Ensure the input is visible
      .clear() // Clear any existing value
      .type(amount); // Type the provided amount
  }
  togglePercentage(shouldCheck) {
    const checkbox = cy.get('mat-checkbox[formcontrolname="isPercentage"]');

    checkbox.then(($el) => {
      const isChecked = $el.hasClass("mat-checkbox-checked");

      if (shouldCheck && !isChecked) {
        checkbox.find(".mat-checkbox-inner-container").click({ force: true }); // Click the visible container
      } else if (!shouldCheck && isChecked) {
        checkbox.find(".mat-checkbox-inner-container").click({ force: true }); // Click to uncheck
      }
    });
  }
  verifyPercentageChecked() {
    cy.get('mat-checkbox[formcontrolname="isPercentage"]').should(
      "have.class",
      "mat-checkbox-checked"
    );
  }

  verifyPercentageUnchecked() {
    cy.get('mat-checkbox[formcontrolname="isPercentage"]').should(
      "not.have.class",
      "mat-checkbox-checked"
    );
  }
  clickDistanceFactorTab() {
    cy.get('div[role="tab"]')
      .contains("Distance Factor") // Match by visible text
      .should("be.visible")
      .click({ force: true });
  }
  clickAddDistanceButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .filter(':contains("Add")') // Only buttons containing the "Add" text
      .eq(1) // Select the second button (0-based index)
      .should("be.visible")
      .click({ force: true });
  }
  enterMileFactor(value) {
    cy.get('input[formcontrolname="mileFactor"]') // Best unique selector
      .clear()
      .type(value)
      .should("have.value", value); // Verify entered value immediately
  }
  verifyMileFactorValue(expectedValue) {
    cy.get('input[formcontrolname="mileFactor"]').should(
      "have.value",
      expectedValue
    ); // Final verification
  }
  clickSubmitButton() {
    cy.get('button[mattooltip="Save"][color="primary"]') // Best unique selector
      .should("be.visible") // Ensure button is visible
      .click({ force: true }); // Click the button
  }
  enterRateAdjustment(value) {
    cy.get('input[formcontrolname="rateAdjustment"]') // Best selector
      .should("be.visible")
      .clear()
      .type(value);
  }
  verifyRateAdjustmentValue(expectedValue) {
    cy.get('input[formcontrolname="rateAdjustment"]').should(
      "have.value",
      expectedValue.toString()
    );
  }
  enterDriverOverride(value) {
    cy.get('input[formcontrolname="overrideDriverPercent"]') // Best selector
      .should("be.visible")
      .clear()
      .type(value);
  }
  verifyDriverOverrideValue(expectedValue) {
    cy.get('input[formcontrolname="overrideDriverPercent"]').should(
      "have.value",
      expectedValue.toString()
    );
  }
  enterRouteSurchargeAdjustment(value) {
    cy.get('input[formcontrolname="routeSurchargeAdjustment"]') // Stable selector
      .should("be.visible")
      .clear()
      .type(value);
  }

  verifyRouteSurchargeAdjustmentValue(expectedValue) {
    cy.get('input[formcontrolname="routeSurchargeAdjustment"]').should(
      "have.value",
      expectedValue.toString()
    );
  }
  enterBookedPercentage(value) {
    cy.get('input[formcontrolname="bookedPercentage"]') // Stable and unique selector
      .should("be.visible")
      .clear()
      .type(value)
      .should("have.value", value.toString());
  }
  verifyBookedPercentageValue(expectedValue) {
    cy.get('input[formcontrolname="bookedPercentage"]').should(
      "have.value",
      expectedValue.toString()
    );
  }
  addnewCardButton() {
    cy.contains("button", "Add a New Card").click();
  }
  addCardTitle() {
    cy.contains("h1, h2, h3", "Add Credit Card").should("be.visible");
  }
  addCardDescription(description) {
    cy.get('input[formcontrolname="description"]') // Stable selector
      .scrollIntoView()
      .should("be.visible")
      .clear()
      .type(description)
      .should("have.value", description);
  }

  verifyCardDescriptionValue(expectedValue) {
    cy.get('input[formcontrolname="description"]').should(
      "have.value",
      expectedValue
    );
  }
  enterCardNumber(cardNumber) {
    cy.get('input[formcontrolname="number"]').clear().type(cardNumber); // Enter card number
  }
  selectExpiryMonth(expiryMonth) {
    cy.get('mat-select[formcontrolname="expMonth"]').click(); // Open dropdown
    cy.get("mat-option").contains(expiryMonth).click(); // Select the option
  }
  selectExpiryYear(expiryYear) {
    cy.get('mat-select[formcontrolname="expYear"]').click(); // Open dropdown
    cy.get("mat-option").contains(expiryYear).click(); // Select the option
  }

  addSecurityCode() {
    // Fill in the "Security Code" field
    cy.get('input[formcontrolname="securityCode"]').clear().type("123");
  }
  addCardHolderName() {
    cy.get('input[formcontrolname="name"]').clear().type("John Doe");
  }
  addStreetAddress() {
    cy.get('input[formcontrolname="address"]').clear().type("123 Main Street");
  }
  addPostalCode() {
    cy.get('input[formcontrolname="zip"]').clear().type("12345");
  }
  CardsaveButton() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true });
  }
  enterSecurityCode(securityCode) {
    // Add Security Code in the field
    cy.get('input[formcontrolname="securityCode"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(securityCode);
  }
  enterCardHolderName(cardHolderName) {
    // Add Card Holder Name in the field
    cy.get('input[formcontrolname="name"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(cardHolderName);
  }
  enterStreetAddress(address) {
    // Add Street Address in the field
    cy.get('input[formcontrolname="address"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(address);
  }
  enterPostalCode(postalCode) {
    // Add Postal Code in the field
    cy.get('input[formcontrolname="zip"]', { timeout: 10000 })
      .should("be.visible")
      .clear()
      .type(postalCode);
  }
  enterAmount(amount) {
    cy.get('input[formcontrolname="amount"]') // Best unique selector
      .should("be.visible") // Ensure the input is visible
      .clear() // Clear any existing value
      .type(amount); // Type the provided amount
  }
  CardsaveButton() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true });
  }
  getContactsTab() {
    return cy.get("button.mat-button").contains("Contacts");
  }
  toggleCheckbox(label, shouldCheck) {
    this.getCheckboxByLabel(label).then(($checkbox) => {
      if (shouldCheck) {
        cy.wrap($checkbox).check({ force: true }).should("be.checked");
      } else {
        cy.wrap($checkbox).uncheck({ force: true }).should("not.be.checked");
      }
    });
  }
  getCheckboxByLabel(label) {
    return cy.contains("label", label).parents("mat-checkbox").find("input");
  }

  clickAddContactButton() {
    cy.contains("button", "Add a Contact").should("be.visible").click();
  }

  verifyAddContactScreen() {
    cy.contains("h1, h2, h3", "Add Contact").should("be.visible");
  }

  enterContactDetails(name, title, company) {
    cy.get('input[formcontrolname="name"]').should("be.visible").type(name);
    cy.get('input[formcontrolname="contactTitle"]')
      .should("be.visible")
      .type(title);
    cy.contains("mat-form-field", "Company Name")
      .find("input")
      .should("be.visible")
      .type(company);
  }
  toggleOverrideAddressCheckbox() {
    cy.get('mat-checkbox[formcontrolname="overrideAddress"]')
      .should("be.visible")
      .click();
    cy.get('mat-checkbox[formcontrolname="overrideAddress"] input').should(
      "be.checked"
    );

    cy.get('mat-checkbox[formcontrolname="overrideAddress"]').click();
    cy.get('mat-checkbox[formcontrolname="overrideAddress"] input').should(
      "not.be.checked"
    );
  }

  toggleOverrideBillingGroupCheckbox() {
    cy.get('mat-checkbox[formcontrolname="overrideBillingGroup"]')
      .should("be.visible")
      .click();
    cy.get('mat-checkbox[formcontrolname="overrideBillingGroup"] input').should(
      "be.checked"
    );

    cy.get('mat-checkbox[formcontrolname="overrideBillingGroup"]').click();
    cy.get('mat-checkbox[formcontrolname="overrideBillingGroup"] input').should(
      "not.be.checked"
    );
  }
  selectBillingGroup(option) {
    cy.get('input[formcontrolname="billingGroup"]')
      .should("be.visible")
      .click();

    cy.get(".mat-option-text").contains(option).click();

    cy.get('input[formcontrolname="billingGroup"]').should(
      "have.value",
      option
    );
  }

  enterFaxNumber(fax) {
    cy.contains("mat-form-field", "Fax")
      .scrollIntoView()
      .within(() => {
        cy.get("input").should("be.visible").type(fax, { force: true });
      });
  }

  saveContact() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true });
  }
  clickEditAddressButton() {
    cy.get('button[mattooltip="Edit Address"]').click();
  }
  fillAddressInfo(
    address,
    suite,
    city,
    country,
    state,
    zip,
    plus4,
    postalCode,
    phone
  ) {
    cy.get('input[formcontrolname="address"]').type(address);
    cy.get('input[formcontrolname="address2"]')
      .should("be.visible")
      .type(suite);
    cy.get('input[formcontrolname="city"]').type(city);

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
        cy.get('input[formcontrolname="zip"]').type(zip);
        cy.get('input[formcontrolname="plus4"]')
          .should("be.visible")
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
          .type(postalCode);
      } else if (country === "OTHER") {
        cy.get("#btnSaved").click();
      }
    });
  }

  enterEmailSmsText(text) {
    cy.get("input#mat-chip-list-input-1").should("be.visible").type(text);
  }
  setPhoneNumber(phoneNumber) {
    cy.contains("mat-label", "Phone")
      .parents("mat-form-field")
      .find("input[matinput]")
      .should("be.visible")
      .clear()
      .type(phoneNumber);
  }

  setFaxNumber(faxNumber) {
    cy.contains("mat-label", "Fax")
      .parents("mat-form-field")
      .find("input[matinput]")
      .should("be.visible")
      .clear()
      .type(faxNumber);
  }

  setDefaultOriginComments(comments) {
    cy.contains("mat-label", "Default Origin Comments")
      .parents("mat-form-field")
      .find("textarea[matinput]")
      .should("be.visible")
      .clear()
      .type(comments);
  }

  setDefaultDestinationComments(comments) {
    cy.contains("mat-label", "Default Destination Comments")
      .parents("mat-form-field")
      .find("textarea[matinput]")
      .should("be.visible")
      .clear()
      .type(comments);
  }

  setContactComment(comment) {
    cy.contains("mat-label", "Contact Comments")
      .parents("mat-form-field")
      .find("textarea[matinput]")
      .should("be.visible")
      .clear()
      .type(comment);
  }
  clickDeleteButton() {
    cy.get("button[mat-icon-button]").contains("delete").click();
  }
  //to do
  clickAddAlertButton() {
    cy.get("button.mat-mini-fab.mat-accent")
      .filter(
        ':has(mat-icon[aria-hidden="true"][data-mat-icon-type="font"]:contains("notification_important"))'
      )
      .should("be.visible")
      .click();
  }
  toggleCheckbox(label, shouldCheck) {
    this.getCheckboxByLabel(label).then(($checkbox) => {
      if (shouldCheck) {
        cy.wrap($checkbox).check({ force: true }).should("be.checked");
      } else {
        cy.wrap($checkbox).uncheck({ force: true }).should("not.be.checked");
      }
    });
  }
  getCheckboxByLabel(label) {
    return cy.contains("label", label).parents("mat-checkbox").find("input");
  }

  setEmailOrPhone(text) {
    cy.get("input.mat-input-element.mat-chip-input")
      .should("be.visible")
      .type(text);
  }
  setDefaultEmailOrSms(text) {
    cy.get('input[formcontrolname="defaultEmailAddress"]')
      .should("be.visible")
      .clear()
      .type(text);
  }
  clickInsideAlertButton() {
    cy.contains("button", "Add an Alert").should("be.visible").click();
  }
  selectStatusEvent(option) {
    this.getItemDropdownElement("statusCode").click(); // Click to open dropdown

    // Wait for the dropdown panel to appear
    cy.get(".cdk-overlay-pane", { timeout: 10000 }).should("be.visible");

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true }); // Select the option
  }

  verifySelectedStatusEvent(option) {
    this.getItemDropdownElement("statusCode").click(); // Reopen the dropdown

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true }); // Select the option
  }
  selectMessageFormat(option) {
    cy.get('mat-select[formcontrolname="messageFormatId"]').click(); // Open dropdown

    // Ensure dropdown panel is visible
    cy.get(".cdk-overlay-pane", { timeout: 10000 }).should("be.visible");

    cy.get("mat-option")
      .contains(new RegExp(`^\\s*${Cypress._.escapeRegExp(option)}\\s*$`), {
        timeout: 10000,
      })
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true }); // Select the option
  }
  verifySelectedMessageFormat(option) {
    cy.get(
      'mat-select[formcontrolname="messageFormatId"] .mat-select-value-text',
      {
        timeout: 10000,
      }
    )
      .should("be.visible")
      .and("contain.text", option); // Ensure selection is reflected
  }
  setCheckboxState(label, shouldCheck) {
    this.getCheckboxByLabel(label).then(($checkbox) => {
      if (shouldCheck) {
        cy.wrap($checkbox).check({ force: true }).should("be.checked");
      } else {
        cy.wrap($checkbox).uncheck({ force: true }).should("not.be.checked");
      }
    });
  }
  getCheckboxByLabel(label) {
    return cy.contains("mat-checkbox", label).find('input[type="checkbox"]');
  }

  clickViewMessageFormat() {
    cy.get('mat-form-field:has(mat-select[formcontrolname="messageFormatId"])')
      .should("exist") // Ensure the dropdown exists
      .scrollIntoView(); // Ensure it's in view

    cy.wait(1000); // Wait for UI to stabilize

    cy.get('button[mattooltip="View Message Format"]')
      .should("be.visible")
      .eq(0) // Clicks the FIRST matching button (adjust index if needed)
      .click({ force: true }); // Force-click in case of overlays
  }
  verifyEditMessageFormat() {
    cy.contains("Edit Message Format").should("be.visible");
  }

  selectRandomMessageType(messageType) {
    cy.get('mat-select[formcontrolname="type"]').should("be.visible").click();
    cy.get("mat-option").contains(messageType).should("be.visible").click();
    cy.get('mat-select[formcontrolname="type"]').should("contain", messageType); // Verify selection
  }
  selectRandomDateFormat(dateFormat) {
    cy.get('mat-select[formcontrolname="dateFormat"]')
      .should("be.visible")
      .click();
    cy.get("mat-option").contains(dateFormat).should("be.visible").click();
    cy.get('mat-select[formcontrolname="dateFormat"]').should(
      "contain",
      dateFormat
    ); // Verify selection
  }
  enterReturnEmailName(name) {
    cy.get('input[formcontrolname="returnEmailName"]')
      .should("be.visible")
      .clear()
      .type(name);
  }
  enterReturnEmailAddress(email) {
    cy.get('input[formcontrolname="returnEmailAddress"]')
      .should("be.visible")
      .clear()
      .type(email);
  }

  // Enters CC Email Address
  enterCCEmailAddress(email) {
    cy.get('input[formcontrolname="ccAddress"]')
      .should("be.visible")
      .clear()
      .type(email);
  }

  enterReturnEmailAddress(email) {
    cy.get('input[formcontrolname="returnEmailAddress"]')
      .should("be.visible")
      .clear()
      .type(email);
  }

  // Enters CC Email Address
  enterCCEmailAddress(email) {
    cy.get('input[formcontrolname="ccAddress"]')
      .should("be.visible")
      .clear()
      .type(email);
  }

  enterMessageSubject(subject) {
    cy.get('input[formcontrolname="subject"]')
      .should("be.visible")
      .clear()
      .type(subject);
  }
  enterDelayMessage(delay) {
    cy.get('input[formcontrolname="processDelaySeconds"]')
      .should("be.visible")
      .clear()
      .type(delay);
  }
  saveMessageFormat() {
    cy.get('button[mattooltip="Save"]').eq(2).click({ force: true }); // Change index if needed
  }

  saveAlertButton() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true }); // Change index if needed
  }

  clickSaveAlertButton() {
    cy.get('button[mattooltip="Save"][type="submit"]')
      .eq(1) // selects the second save button
      .click({ force: true });
  }
  openMenuTab() {
    cy.get("button.mat-mini-fab")
      .filter(
        (index, el) => Cypress.$(el).find("mat-icon").text().trim() === "menu"
      )
      .should("be.visible")
      .click();
  }
  clickReqInputButton() {
    return cy
      .get("button.mat-menu-item")
      .contains("Req. Input")
      .click({ force: true });
  }
  clickAddNewPromptButton() {
    cy.get("button.mat-stroked-button.add-button.mat-primary")
      .contains("+ Add New Prompt")
      .click();
  }
  setDriverPrompt(prompt) {
    cy.get('input[formcontrolname="label"]').clear().type(prompt);
  }
  selectEvent(event) {
    cy.get('mat-select[formcontrolname="eventType"]').click(); // Click dropdown
    cy.contains(".mat-option-text", event).click(); // Select option
  }

  selectInputType(inputType) {
    cy.get('mat-select[formcontrolname="fieldType"]').click(); // Open dropdown
    cy.get("mat-option").contains(inputType).click(); // Select the option
  }
  requiredDriverSave() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true }); // Change index if needed
  }
  clickEditButton() {
    cy.get("mat-icon.pointer").contains("edit").click();
  }
  setDriverPrompt(prompt) {
    cy.get('input[formcontrolname="label"]').clear().type(prompt);
  }

  selectInputType(inputType) {
    cy.get('mat-select[formcontrolname="fieldType"]').click(); // Open dropdown
    cy.get("mat-option").contains(inputType).click(); // Select the option
  }
  requiredDriverSave() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true }); // Change index if needed
  }
  clickEditButton() {
    cy.get("mat-icon.pointer").contains("edit").click();
  }
  clickDeletedButton() {
    cy.get("mat-icon").contains("delete").click();
  }
  clickDeletePromptYes() {
    cy.get("button span.mat-button-wrapper").contains("Yes").click();
  }
  clickDeletePromptNo() {
    cy.get("button.mat-raised-button span.mat-button-wrapper")
      .contains("No")
      .parents("button")
      .click();
  }
  clickAddNewPromptRouteButton() {
    cy.get("button.mat-stroked-button.add-button.mat-primary")
      .eq(1) // Change the index based on the button's position in the DOM
      .click();
  }
  setDriverPrompt(prompt) {
    cy.get('input[formcontrolname="label"]').clear().type(prompt);
  }
  selectStopType(stopType) {
    cy.get('mat-select[formcontrolname="stopType"]').click(); // Click dropdown
    cy.contains(".mat-option-text", stopType).click(); // Select option
  }

  selectInputType(inputType) {
    cy.get('mat-select[formcontrolname="fieldType"]').click(); // Open dropdown
    cy.get("mat-option").contains(inputType).click(); // Select the option
  }
  openMenuTab() {
    cy.get("button.mat-mini-fab")
      .filter(
        (index, el) => Cypress.$(el).find("mat-icon").text().trim() === "menu"
      )
      .should("be.visible")
      .click();
  }
  openNoteTab() {
    cy.get("button.mat-menu-item")
      .contains("Notes") // Looks for the button containing the "Notes" text
      .should("be.visible") // Ensures the button is visible
      .click(); // Clicks on the button
  }
  clickDateStampButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .contains("+ Date Stamp")
      .click();
  }
  clickNewNoteButton() {
    cy.get("button.mat-stroked-button.mat-primary")
      .contains("+ New Note")
      .click();
  }
  verifyAddTextFileVisible() {
    cy.contains("Add Text File").should("be.visible");
  }
  chooseNoteType(noteType) {
    cy.get('mat-select[formcontrolname="noteTypeId"]').click(); // Open dropdown
    cy.get("mat-option").contains(noteType).click(); // Select random option
  }

  verifyNoteType(expectedNoteType) {
    cy.get(
      'mat-select[formcontrolname="noteTypeId"] span.mat-select-min-line'
    ).should("have.text", expectedNoteType); // Verify selection
  }
  enterNoteText(note) {
    cy.get('textarea[formcontrolname="note"]').clear().type(note);
  }
  saveNoteButton() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true });
  }
  clickEditNoteButton() {
    cy.get("mat-icon.pointer").contains("edit").click();
  }
  verifyEditNoteTextFileVisible() {
    cy.contains("Edit Text Note").should("be.visible");
  }
  clickDeleteNoteButton() {
    cy.get("mat-icon").contains("delete").click();
  }
  clickDeleteNoteNo() {
    cy.get("button.mat-raised-button span.mat-button-wrapper")
      .contains("No")
      .parents("button")
      .click();
  }
  clickDeleteNoteButton() {
    cy.get("mat-icon").contains("delete").click();
  }
  clickDeleteNoteYes() {
    cy.get("button span.mat-button-wrapper").contains("Yes").click();
  }
  clickTasksTab() {
    cy.get("button").contains("Tasks").click();
  }
  clickAddTaskButton() {
    cy.get('button[mattooltip="Add New Task"]').click();
  }
  enterTaskName(taskName) {
    cy.get('input[formcontrolname="taskName"]').clear().type(taskName);
  }
  selectAssignedTo(user) {
    const cleanUser = user.replace(/^~/, ""); // remove leading ~ if exists

    cy.get('input[formcontrolname="assignedTo"]')
      .should("be.visible")
      .focus()
      .clear({ force: true }) // clear forcefully in case of UI constraints
      .type("{selectall}{backspace}") // ensure all text is removed
      .type(cleanUser); // no delay

    cy.get("mat-option").should("be.visible").contains(cleanUser).click();

    cy.get('input[formcontrolname="assignedTo"]').should(
      "have.value",
      cleanUser
    );
  }

  verifyAssignedTo(user) {
    cy.get('input[formcontrolname="assignedTo"]').should("have.value", user);
  }

  selectReminder(reminderOption) {
    cy.get('mat-select[formcontrolname="reminderMinutes"]').click();
    cy.get("mat-option").contains(reminderOption).click();
  }

  verifyReminder(reminderOption) {
    cy.get(
      'mat-select[formcontrolname="reminderMinutes"] span.mat-select-value-text'
    ).should("contain.text", reminderOption);
  }
  selectDueDateTime() {
    const dueDateTime = "2025-04-23T09:04";

    cy.get('input[formcontrolname="displayDueDate"]')
      .should("be.visible")
      .clear()
      .type(dueDateTime, { delay: 100 })
      .should("have.value", dueDateTime);
  }
  addTaskComments(comment) {
    cy.get('textarea[formcontrolname="toDoComments"]')
      .should("be.visible")
      .clear()
      .type(comment, { delay: 50 })
      .should("have.value", comment);
  }
  clickMarkAsCompleted() {
    cy.contains("button.mat-flat-button", "Mark As Completed")
      .should("be.visible")
      .click();
  }
  selectCompletedDateTime() {
    const completedDateTime = "2025-08-26T09:04";

    cy.get('input[formcontrolname="displayCompletionDate"]')
      .should("be.visible")
      .clear()
      .type(completedDateTime, { delay: 100 })
      .should("have.value", completedDateTime);
  }
  addCompletedComments(comment) {
    cy.get('textarea[formcontrolname="completionComments"]')
      .should("be.visible")
      .clear()
      .type(comment, { delay: 50 })
      .should("have.value", comment);
  }
  clickTasksSaveButton() {
    cy.get('button[mattooltip="Save Task"]').click();
  }
  get tasksCheckbox() {
    return cy.get(".mat-checkbox-inner-container");
  }

  clickCheckbox() {
    this.tasksCheckbox.click();
  }

  clickTaskCompletedYes() {
    cy.get("button span.mat-button-wrapper").contains("Yes").click();
  }
  OpenCrmFieldsTab() {
    cy.get('button mat-icon:contains("border_color")').click();
  }
  toggleCrmDropdown() {
    // Click to close
    cy.contains("mat-expansion-panel-header", "CRM FIELDS").click();

    // Click to reopen
    cy.contains("mat-expansion-panel-header", "CRM FIELDS").click();
  }
  enterTest1Number(value) {
    cy.get("mat-form-field")
      .contains("Test 1")
      .parents("mat-form-field")
      .find("input")
      .clear()
      .type(value);
  }
  enterTest2Number(value) {
    cy.get("mat-form-field")
      .contains("Test 2")
      .parents("mat-form-field")
      .find("input")
      .clear()
      .type(value);
  }
  chooseTest3Option(option) {
    cy.get("mat-form-field")
      .contains("Test 3")
      .parents("mat-form-field")
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyTest3Option(option) {
    cy.get("mat-form-field")
      .contains("Test 3")
      .parents("mat-form-field")
      .find("mat-select")
      .should("contain.text", option);
  }
  enterTest4Number(value) {
    cy.get("mat-form-field")
      .contains("Test 4")
      .parents("mat-form-field")
      .find("input")
      .clear()
      .type(value);
  }
  enterTest5Value(value) {
    cy.get("mat-form-field")
      .contains("Test 5")
      .parents("mat-form-field")
      .find("input")
      .clear()
      .type(value);
  }
  chooseTest6Option(option) {
    cy.get("mat-form-field")
      .contains("Test 6")
      .parents("mat-form-field")
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyTest6Option(option) {
    cy.get("mat-form-field")
      .contains("Test 6")
      .parents("mat-form-field")
      .find("mat-select")
      .contains(option)
      .should("exist");
  }
  chooseTest7Option(option) {
    cy.get("mat-form-field")
      .contains("Test 7")
      .parents("mat-form-field")
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyTest7Option(option) {
    cy.get("mat-form-field")
      .contains("Test 7")
      .parents("mat-form-field")
      .find("mat-select")
      .contains(option)
      .should("exist");
  }
  choosePeanutButterType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Peanut Butter"))')
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyPeanutButterType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Peanut Butter"))')
      .find("mat-select")
      .should("contain.text", option);
  }
  chooseJellyType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Jelly"))')
      .find("input[matinput]")
      .clear()
      .type(option, { force: true });

    cy.get("mat-option").contains(option).click();
  }

  verifyJellyType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Jelly"))')
      .find("input[matinput]")
      .should("have.value", option);
  }
  chooseBreadType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Bread"))')
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyBreadType(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Bread"))')
      .find("mat-select")
      .should("contain.text", option);
  }
  chooseSideOption(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Sides"))')
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifySideOption(option) {
    cy.get("mat-form-field")
      .filter(':has(mat-label:contains("Sides"))')
      .find("mat-select")
      .should("contain.text", option);
  }
  //
  clickBillingGroupsTab() {
    cy.get("button[mat-menu-item]").contains("Billing Groups").click();
  }
  clickAddBillingGroupButton() {
    cy.get("button.mat-stroked-button").contains("Add a Billing Group").click();
  }
  toggleBillingGroupsPanel() {
    const billingGroupsHeader =
      'mat-expansion-panel-header:contains("Billing Groups")';

    // Close panel if open
    cy.get(billingGroupsHeader).then(($el) => {
      if ($el.attr("aria-expanded") === "true") {
        cy.wrap($el).click();
      }
    });

    // Re-open panel
    cy.get(billingGroupsHeader).click();
  }
  toggleBillingGroupsOptionsPanel() {
    const optionsPanelHeader = 'mat-expansion-panel-header:contains("Options")';

    // Close panel if open
    cy.get(optionsPanelHeader).then(($el) => {
      if ($el.attr("aria-expanded") === "true") {
        cy.wrap($el).click();
      }
    });

    // Re-open panel
    cy.get(optionsPanelHeader).click();
  }
  verifyAddBillingGroupHeader() {
    cy.get("div[matdialogtitle] h3")
      .should("be.visible")
      .and("have.text", "Add Billing Group");
  }
  enterBillingGroupName(name) {
    cy.get('input[formcontrolname="description"]')
      .should("be.visible")
      .clear()
      .type(name);
  }
  clickBillingGroupSaveButton() {
    cy.get('button[mattooltip="Save"]').eq(1).click();
  }
  clickEditBillingGroupButton() {
    cy.get("button mat-icon").contains("edit").click();
  }
  enterBillingGroupDisplayCaption(caption) {
    cy.get('input[formcontrolname="billingGroupCaption"]')
      .clear()
      .type(caption);
  }
  checkBillingGroupRequired() {
    cy.get(
      'mat-checkbox[formcontrolname="billingGroupRequired"] input[type="checkbox"]'
    ).check({ force: true });
  }

  uncheckBillingGroupRequired() {
    cy.get(
      'mat-checkbox[formcontrolname="billingGroupRequired"] input[type="checkbox"]'
    ).uncheck({ force: true });
  }

  checkAcceptOnlyOnDemand() {
    cy.get(
      'mat-checkbox[formcontrolname="acceptOnlyListedBillingGroupsOnDemand"] input[type="checkbox"]'
    ).check({ force: true });
  }

  uncheckAcceptOnlyOnDemand() {
    cy.get(
      'mat-checkbox[formcontrolname="acceptOnlyListedBillingGroupsOnDemand"] input[type="checkbox"]'
    ).uncheck({ force: true });
  }

  checkAcceptOnlyRouted() {
    cy.get(
      'mat-checkbox[formcontrolname="acceptOnlyListedBillingGroupsRouted"] input[type="checkbox"]'
    ).check({ force: true });
  }

  uncheckAcceptOnlyRouted() {
    cy.get(
      'mat-checkbox[formcontrolname="acceptOnlyListedBillingGroupsRouted"] input[type="checkbox"]'
    ).uncheck({ force: true });
  }
  //
  getReferencesTab() {
    return cy.contains("button", "References").click();
  }
  toggleReferencesDropdown() {
    // Click to close
    cy.contains("mat-expansion-panel-header", "References").click();

    // Click to reopen
    cy.contains("mat-expansion-panel-header", "References").click();
  }
  clickAddReferenceButton() {
    cy.contains("button", "Add a Reference").click();
  }
  enterReferenceName(value) {
    cy.get('input[formcontrolname="name"]').clear().type(value);
  }
  chooseReferenceType(option) {
    cy.get('mat-select[formcontrolname="type"]').click();
    cy.get("mat-option").contains(option).click();
  }

  verifyReferenceType(option) {
    cy.get('mat-select[formcontrolname="type"] .mat-select-value-text').should(
      "contain.text",
      option
    );
  }
  AddReferenceSave() {
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true }); // Change index if needed
  }
  clickEditReferenceButton() {
    cy.get("button mat-icon").contains("edit").click();
  }
  clickRefrencesDeletedButton() {
    cy.get("mat-icon").contains("delete").click();
  }
  toggleReferencesOptionsDropdown() {
    // Click to close
    cy.contains("mat-expansion-panel-header", "Options").click();

    // Click to reopen
    cy.contains("mat-expansion-panel-header", "Options").click();
  }
  enterDisplayOption1(value) {
    cy.get('input[formcontrolname="reference1Caption"]').clear().type(value);
  }
  enterDisplayOption2(option) {
    cy.get('input[formcontrolname="reference2Caption"]').clear().type(option);
  }
  enterReference1Format(format) {
    cy.get('input[formcontrolname="reference1Format"]').clear().type(format);
  }
  enterReference2Format(format) {
    cy.get('input[formcontrolname="reference2Format"]').clear().type(format);
  }
  toggleCheckboxByText() {
    cy.get('mat-checkbox[formcontrolname="reference2Required"]')
      .find('input[type="checkbox"]')
      .click({ force: true });
  }
  toggleCheckboxByLabel(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .parents("mat-checkbox")
      .click(); // just click once to toggle, regardless of current state
  }
  // toggleCheckboxByLabelWithScroll(labelText) {
  //   cy.contains(".mat-checkbox-label", labelText)
  //     .scrollIntoView()
  //     .wait(500) // wait for 500ms after scroll
  //     .should("be.visible")
  //     .parents("mat-checkbox")
  //     .then(($checkbox) => {
  //       const checkboxInput = $checkbox.find('input[type="checkbox"]');

  //       if (checkboxInput.prop("checked")) {
  //         cy.wrap(checkboxInput).uncheck({ force: true });
  //       } else {
  //         cy.wrap(checkboxInput).check({ force: true });
  //       }
  //     });
  // }
  toggleCheckboxByLabelWithScroll(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .scrollIntoView()
      .wait(500)
      .parents("mat-checkbox")
      .then(($checkbox) => {
        const checkboxInput = $checkbox.find('input[type="checkbox"]');
        if (checkboxInput.prop("checked")) {
          cy.wrap(checkboxInput).uncheck({ force: true });
        } else {
          cy.wrap(checkboxInput).check({ force: true });
        }
      });
  }
  scrollAndToggleCheckbox(labelText) {
    cy.get("mat-list-option .mat-list-text")
      .contains(labelText)
      .scrollIntoView()
      .should("be.visible")
      .click({ force: true });
  }

  toggleCheckboxListByText() {
    cy.get('mat-checkbox[formcontrolname="displayReferenceList"]')
      .find("label.mat-checkbox-layout")
      .click();
  }
  toggleCheckboxRefrences1ByText() {
    cy.get('mat-checkbox[formcontrolname="validateReference1"]')
      .find("label.mat-checkbox-layout")
      .click();
  }
  toggleCheckboxRefrences2ByText() {
    cy.get('mat-checkbox[formcontrolname="validateReference2"]')
      .find("label.mat-checkbox-layout")
      .click();
  }
  clickInetUsersTab() {
    cy.contains("button.button-tab", "Inet Users").click();
  }
  selectDriverLocation(option) {
    cy.contains("mat-form-field", "Display Driver Location")
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyDriverLocation(expectedOption) {
    cy.contains("mat-form-field", "Display Driver Location")
      .find("mat-select")
      .should("contain.text", expectedOption);
  }
  clickAddInternetUserButton() {
    cy.contains("button", "+ Add Internet User").click();
  }
  clickInternetUsersGeneralTab() {
    cy.get('div[role="tab"]').contains("General").click();
  }
  chooseInternetUserTemplate(template) {
    cy.get("mat-label")
      .contains("Template")
      .parents("mat-form-field")
      .find("mat-select")
      .click();
    cy.wait(2000);

    cy.get("mat-option").contains(template).click();
  }

  verifyInternetUserTemplate(template) {
    cy.get("mat-label")
      .contains("Template")
      .parents("mat-form-field")
      .find("mat-select")
      .find(".mat-select-value-text span")
      .should("contain.text", template);
  }
  enterInternetUserId(userId) {
    cy.get('input[formcontrolname="userID"]').clear().type(userId);
  }
  enterInternetUserPassword(password) {
    cy.get('input[formcontrolname="password"]').clear().type(password);
  }
  enterConfirmPassword(password) {
    cy.get('input[formcontrolname="confirmPassword"]').clear().type(password);
  }
  enterInternetUserName(name) {
    cy.get('input[formcontrolname="name"]').clear().type(name);
  }
  enterInternetUserEmail(email) {
    cy.get('input[formcontrolname="email"]').clear().type(email);
  }
  chooseDefaultServiceType(serviceType) {
    cy.get('input[formcontrolname="defaultServiceType"]')
      .clear()
      .type(serviceType)
      .type("{enter}");
  }
  enterInternetUserPhone(phone) {
    cy.get('input[formcontrolname="phone"]').clear().type(phone);
  }
  chooseDefaultBillingGroup(group) {
    cy.get('input[formcontrolname="defaultBillingGroup"]')
      .clear()
      .type(group)
      .type("{enter}");
  }
  clickInternetUserOptionsTab() {
    cy.contains("div.mat-tab-label", "Options").click();
  }
  chooseAcceptCreditCardOption(option) {
    cy.contains("mat-label", "Accept Credit Cards")
      .parents("mat-form-field")
      .find("mat-select")
      .click();

    cy.get("mat-option").contains(option).click();
  }

  verifyAcceptCreditCardOption(expectedOption) {
    cy.contains("mat-label", "Accept Credit Cards")
      .parents("mat-form-field")
      .find("mat-select")
      .find(".mat-select-value-text span")
      .should("have.text", expectedOption);
  }
  toggleCheckboxByLabel(labelText) {
    cy.contains("mat-checkbox", labelText)
      .find('input[type="checkbox"]')
      .click({ force: true });
  }
  chooseDisplayDriverLocation(option) {
    cy.contains("mat-form-field", "Display Driver Location")
      .find("mat-select")
      .click({ force: true });

    cy.get("mat-option").contains(option).click({ force: true });
  }
  verifyDisplayDriverLocation(expectedValue) {
    cy.contains("mat-form-field", "Display Driver Location")
      .find("mat-select")
      .find(".mat-select-value-text span")
      .should("have.text", expectedValue);
  }
  // pageObject/customerRecordPage.js
  chooseDefaultOrderType(option) {
    cy.contains("mat-form-field", "Default Order Type")
      .find("input")
      .clear()
      .type(option, { delay: 100 }) // simulate typing
      .type("{enter}");
  }
  chooseEditOrderType(option) {
    cy.contains("mat-form-field", "Edit Order")
      .find("mat-select")
      .click({ force: true });

    cy.get("mat-option").contains(option).click({ force: true });
  }

  verifyEditOrderType(expected) {
    cy.contains("mat-form-field", "Edit Order")
      .find(".mat-select-value-text span")
      .should("have.text", expected);
  }
  chooseCancelOrderType(value) {
    cy.contains("mat-label", "Cancel Order") // reliably finds the label
      .parents("mat-form-field")
      .find("mat-select")
      .click();

    cy.get("mat-option .mat-option-text").contains(value).click();
  }

  verifyCancelOrderType(expectedValue) {
    cy.contains("mat-label", "Cancel Order")
      .parents("mat-form-field")
      .find(".mat-select-value-text span")
      .should("have.text", expectedValue);
  }
  enterEmailSmsTextAlert(value) {
    cy.contains("mat-label", "Email/SMS Text Alerts")
      .parents("mat-form-field")
      .find("input")
      .type(value)
      .type("{enter}");
  }
  clickInternetSaveButton() {
    cy.wait(3000); // wait for 1 second
    cy.get('button[mattooltip="Save"]').eq(1).click({ force: true });
  }

  clickInternetUserCustomersTab() {
    cy.contains(".mat-tab-label-content", "Customers").click();
  }
  clickXRouteTab() {
    cy.contains(".mat-tab-label-content", "X Route").click();
  }
  checkAdvancedDriverPermissions() {
    cy.contains(".mat-checkbox-label", "Advanced Driver Permissions")
      .parents("mat-checkbox")
      .find('input[type="checkbox"]')
      .check({ force: true });
  }
  toggleCheckboxByLabelXRouteWithScroll(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .scrollIntoView()
      .wait(500)
      .parents("mat-checkbox")
      .then(($checkbox) => {
        const checkboxInput = $checkbox.find('input[type="checkbox"]');
        if (checkboxInput.prop("checked")) {
          cy.wrap(checkboxInput).uncheck({ force: true });
        } else {
          cy.wrap(checkboxInput).check({ force: true });
        }
      });
  }
  clickCustomProceduresTab() {
    cy.get(".mat-tab-label-content")
      .contains("Custom Procedures")
      .click({ force: true });
  }
  toggleCheckboxByLabelCustomProceduresWithScroll(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .scrollIntoView()
      .wait(500)
      .parents("mat-checkbox")
      .then(($checkbox) => {
        const checkboxInput = $checkbox.find('input[type="checkbox"]');
        if (checkboxInput.prop("checked")) {
          cy.wrap(checkboxInput).uncheck({ force: true });
        } else {
          cy.wrap(checkboxInput).check({ force: true });
        }
      });
  }
  toggleApprovedCheckboxByLabel() {
    cy.contains(".mat-checkbox-label", "Approved")
      .parents("mat-checkbox")
      .click(); // toggles the checkbox regardless of state
  }
  clickConfirmChangedOkButton() {
    cy.contains("button.mat-raised-button", "Ok").click();
  }
  clickEnableAllCustomProcedures() {
    cy.get("button")
      .contains("Enable All")
      .should("be.visible")
      .click({ force: true });
  }
  clickDisableAllButton() {
    cy.contains("button", "Disable All", { timeout: 10000 })
      .should("be.visible")
      .scrollIntoView()
      .click({ force: true });
  }

  clickInternetUserAddressBookTab() {
    cy.contains(".mat-tab-label-content", "Address Book").click();
  }
  toggleRadioByLabel(labelText) {
    cy.contains(".mat-radio-label-content", labelText)
      .parents("mat-radio-button")
      .click(); // just click once to toggle, regardless of current state
  }
  searchShippingLabelOption(option) {
    cy.get("input#customProcedureSearch").scrollIntoView().clear().type(option);
  }
  searchUserOption(option) {
    cy.get("input#optionsSearch").scrollIntoView().clear().type(option);
  }
  searchCustomer(option) {
    cy.get("input#customerSearch").scrollIntoView().clear().type(option);
  }
  searchDriver(option) {
    cy.get("input#driverSearch").scrollIntoView().clear().type(option);
  }

  clickInetUserEditIcon() {
    cy.get("mat-icon.icon-button").contains("edit").click({ force: true });
  }
  clickStatusCodesTab() {
    cy.get("button mat-icon").contains("code").parents("button").click();
  }
  toggleStatusCodesDropdown() {
    // Click to close
    cy.contains("mat-expansion-panel-header", "Status Codes").click();

    // Click to reopen
    cy.contains("mat-expansion-panel-header", "Status Codes").click();
  }
  toggleCheckboxByLabel(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .parents("mat-checkbox")
      .click(); // just click once to toggle, regardless of current state
  }
  chooseStatusCodeFilter(option) {
    cy.get('mat-select[formcontrolname="filter"]').click();
    cy.get("mat-option").contains(option).scrollIntoView().click();
  }

  verifyStatusCodeFilter(option) {
    cy.get('mat-select[formcontrolname="filter"]')
      .find(".mat-select-value-text")
      .should("contain.text", option);
  }
  checkToggleAllCheckbox() {
    cy.get(
      'mat-checkbox[formcontrolname="toggleAll"] input[type="checkbox"]'
    ).check({ force: true }); // force needed in case it’s hidden or overlayed
  }
  chooseStatusCodeFilter(option) {
    cy.get('mat-select[formcontrolname="filter"]').click();
    cy.get("mat-option").contains(option).scrollIntoView().click();
  }

  verifyStatusCodeFilter(option) {
    cy.get('mat-select[formcontrolname="filter"]')
      .find(".mat-select-value-text")
      .should("contain.text", option);
  }
  toggleCheckboxByLabelStatusCodeWithScroll(labelText) {
    cy.contains(".mat-checkbox-label", labelText)
      .scrollIntoView()
      .wait(500)
      .parents("mat-checkbox")
      .then(($checkbox) => {
        const checkboxInput = $checkbox.find('input[type="checkbox"]');
        if (checkboxInput.prop("checked")) {
          cy.wrap(checkboxInput).uncheck({ force: true });
        } else {
          cy.wrap(checkboxInput).check({ force: true });
        }
      });
  }
  clickInvoicesTab() {
    cy.contains("button", "Invoices").click();
  }
  clickEnableCreditLimit() {
    cy.get("mat-expansion-panel-header")
      .contains("Enable Credit Limit")
      .parents("mat-expansion-panel-header")
      .then(($el) => {
        if ($el.attr("aria-expanded") === "true") {
          cy.wrap($el).click(); // Collapse first
          cy.wrap($el).click(); // Expand again
        } else {
          cy.wrap($el).click(); // Just expand
        }
      });
  }
  enterCreditLimit(amount) {
    cy.get("input#credit-limit").clear().type(amount);
  }
  verifyCreditLimitText() {
    cy.get("mat-list-item").contains("Credit Limit").should("be.visible");
  }
  verifyOutstandingInvoicedText() {
    cy.get("div.aging-option--wrapper")
      .contains("Outstanding Invoiced")
      .should("be.visible");
  }
  verifyZeroToThirtyText() {
    cy.get("div.aging-option--wrapper").contains("0-30").should("be.visible");
  }
  verifyThirtyOneToSixtyText() {
    cy.get("div.aging-option--wrapper").contains("31-60").should("be.visible");
  }
  verifySixtyOneToNinetyText() {
    cy.get("div.aging-option--wrapper").contains("61-90").should("be.visible");
  }
  verifyPlusNinetyOneText() {
    cy.get("div.aging-option--wrapper").contains("+91").should("be.visible");
  }
  verifyUninvoicedOrdersText() {
    cy.get("mat-list-item").contains("Uninvoiced Orders").should("be.visible");
  }
  verifyUninvoicedRouteStopsText() {
    cy.get("mat-list-item")
      .contains("Uninvoiced Route Stops")
      .should("be.visible");
  }
  verifyUninvoicedContractsText() {
    cy.get("mat-list-item")
      .contains("Uninvoiced Contracts")
      .should("be.visible");
  }
  verifyRemainingCreditText() {
    cy.get("mat-list-item").contains("Remaining Credit").should("be.visible");
  }
  verifyAgingDateAccuracyText() {
    cy.get("div.date-wrapper")
      .contains("Date ranges for aging are accurate as of:")
      .should("be.visible");
  }

  chooseStartPastDueWarning(option) {
    const label = "Start Past Due Warning";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get("mat-select").click();
      });

    cy.get("mat-option").contains(option).click();
  }

  verifyStartPastDueWarning(option) {
    const label = "Start Past Due Warning";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get(".mat-select-value-text span").should("have.text", option);
      });
  }
  chooseStartCreditHoldEnforcement(option) {
    const label = "Start Credit Hold Enforcement";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get("mat-select").click();
      });

    cy.get("mat-option").contains(option).click();
  }

  verifyStartCreditHoldEnforcement(option) {
    const label = "Start Credit Hold Enforcement";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get(".mat-select-value-text span").should("have.text", option);
      });
  }
  searchInvoiceByRandomType() {
    const types = ["Date", "ID", "Status"];
    const selectedType = types[Math.floor(Math.random() * types.length)];

    // Select the invoice type dropdown
    cy.get("mat-form-field.search-types mat-select", { timeout: 10000 })
      .should("be.visible")
      .click();

    // Select random option
    cy.get("mat-option", { timeout: 10000 })
      .contains(selectedType)
      .should("be.visible")
      .click();

    // Conditional input based on selected type
    if (selectedType === "Date") {
      // Click calendar icon
      cy.get('button[aria-label="Open calendar"]', { timeout: 10000 })
        .should("exist")
        .and("be.visible")
        .click();

      // Wait for calendar to appear and select a random enabled date
      cy.get(
        ".mat-calendar-body-cell-content:not(.mat-calendar-body-disabled)",
        { timeout: 10000 }
      ).then(($dates) => {
        const randomIndex = Math.floor(Math.random() * $dates.length);
        cy.wrap($dates[randomIndex]).click();
      });
    } else if (selectedType === "ID") {
      const invoiceId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
      cy.get(
        'mat-form-field.search-field input[placeholder="Search"][name="search"]',
        { timeout: 10000 }
      )
        .should("exist")
        .and("be.visible")
        .clear()
        .type(invoiceId);
    } else if (selectedType === "Status") {
      const statuses = ["Open", "Closed", "Pending"];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      cy.get(
        'mat-form-field.search-field input[placeholder="Search"][name="search"]',
        { timeout: 10000 }
      )
        .should("exist")
        .and("be.visible")
        .clear()
        .type(randomStatus);
    }
  }
  clickInvoicesAging() {
    cy.get("mat-expansion-panel-header")
      .contains("Aging")
      .parents("mat-expansion-panel-header")
      .then(($el) => {
        if ($el.attr("aria-expanded") === "true") {
          cy.wrap($el).click(); // Collapse first
          cy.wrap($el).click(); // Expand again
        } else {
          cy.wrap($el).click(); // Just expand
        }
      });
  }
  verifyAgingAlertOverridesText() {
    cy.get("mat-expansion-panel-header")
      .contains("Aging Alert Overrides")
      .should("be.visible");
  }
  chooseStartPastDueWarning(option) {
    const label = "Start Past Due Warning";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get("mat-select").click();
      });

    cy.get("mat-option").contains(option).click();
  }

  verifyStartPastDueWarning(option) {
    const label = "Start Past Due Warning";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get(".mat-select-value-text span").should("have.text", option);
      });
  }
  chooseStartCreditHoldEnforcement(option) {
    const label = "Start Credit Hold Enforcement";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get("mat-select").click();
      });

    cy.get("mat-option").contains(option).click();
  }

  verifyStartCreditHoldEnforcement(option) {
    const label = "Start Credit Hold Enforcement";
    cy.get("mat-form-field")
      .contains(label)
      .parents("mat-form-field")
      .within(() => {
        cy.get(".mat-select-value-text span").should("have.text", option);
      });
  }
}
export default new CustomerRecordPage();
