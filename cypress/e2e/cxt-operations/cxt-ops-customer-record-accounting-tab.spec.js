import customerPage from "../../support/Pages/customerPage"; // Import the page object
import customerEditPage from "../../support/Pages/customerEditPage"; // Import the page object
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomName,
  getRandomNum,
  getFaxNum,
  getRandomEmail,
  getRandomComment,
  getRandomAccountStatus,
  getRandomInvoiceOption,
  getRandomBillingCycle,
  getRandomVerificationOption,
  getRandomEmailInvoiceFormat,
  getRandomBaseRateChartOption,
  getRandomItemRateChartOption,
  getRandomSurchargeOption,
  getRandomItemOption,
  getRandomNumbers,
  getRandomMileNumbers,
  getRandomExpiryMonth,
  getRandomExpiryYear,
  getRandomCardNumber,
  getRandomSecurityCode,
  getRandomCardHolderName,
  generateRandomAddress,
  generateRandomPostalCode,
  fillRandomCustomersDetails,
} from "../../support/randomUtils";
describe("Accounting tab Checking", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    customerRecordPage.visitCustomers();
    cy.wait(1000); // wait after visiting the Customers page
  });

  it("should search for name and edit customer details", () => {
    const customers = ["Saad2494", "Ahmed9724"];

    function searchAndEdit(customerIndex) {
      const currentCustomer = customers[customerIndex];
      const newCustomer = customers[1 - customerIndex];

      cy.wait(1000); // wait before first search
      customerEditPage.searchCustomer(currentCustomer);

      customerEditPage.isCustomerVisible().then((isFound) => {
        if (isFound) {
          proceedWithEditing(currentCustomer, newCustomer);
        } else {
          cy.get("mat-card.mat-card", { timeout: 4000 }).then(($card) => {
            if ($card.length && $card.text().includes("No data to display")) {
              customerEditPage.clearSearchField();

              cy.wait(1000); // wait before second search
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

  it("should verify and check the Accounting Tab", () => {
    customerRecordPage.getAccountingTab().should("be.visible").click();
  });
  it("should edit and verify address information", () => {
    fillRandomCustomersDetails(customerPage, customerEditPage);
  });
  it("should add the  other Accounting  information", () => {
    customerRecordPage
      .getInputField("Contact Name")
      .should("be.visible")
      .clear()
      .type(getRandomName());
    customerRecordPage
      .getInputField("Phone")
      .should("be.visible")
      .clear()
      .type(getRandomNum());
    customerRecordPage
      .getInputField("Fax")
      .should("be.visible")
      .clear()
      .type(getFaxNum());
    customerRecordPage
      .getInputField("Email")
      .should("be.visible")
      .clear()
      .type(getRandomEmail());
    customerRecordPage
      .getInputField("Notes")
      .should("be.visible")
      .clear()
      .type(getRandomComment());
  });
  it("should select and verify Account Status options", () => {
    const randomStatus = getRandomAccountStatus();

    // Select Billing Status
    customerRecordPage.selectBillingStatus(randomStatus);

    // Verify the selected option
    customerRecordPage.verifySelectedBillingStatus(randomStatus);
  });
  it("should select and verify Require Verification Before options", () => {
    const randomVerificationOption = getRandomVerificationOption();
    customerRecordPage.selectVerificationOption(randomVerificationOption);
    customerRecordPage.verifySelectedVerificationOption(
      randomVerificationOption
    );
  });

  it("should select and verify Print Invoice Format options", () => {
    const randomInvoiceFormat = getRandomInvoiceOption();

    // Select Invoice Format
    customerRecordPage.selectInvoiceFormat(randomInvoiceFormat);

    // Verify the selected option
    customerRecordPage.verifySelectedInvoiceFormat(randomInvoiceFormat);
  });
  it("should select and verify Email Invoice Detail Format options", () => {
    const randomEmailInvoiceFormat = getRandomEmailInvoiceFormat();
    customerRecordPage.selectEmailInvoiceFormat(randomEmailInvoiceFormat);
    customerRecordPage.verifySelectedEmailInvoiceFormat(
      randomEmailInvoiceFormat
    );
  });
  // Select "Billing Cycle" options
  it("should select and verify Billing Cycle options", () => {
    const randomBillingCycle = getRandomBillingCycle();

    // Select Billing Cycle
    customerRecordPage.selectBillingCycle(randomBillingCycle);

    // Verify the selected option
    customerRecordPage.verifySelectedBillingCycle(randomBillingCycle);
  });
  it("should check and uncheck specific checkboxes", () => {
    const checkboxesToUncheck = [
      "Create a separate invoice for each order",
      "House Account (Exclude from Sales Reports)",
      "Tax Exempt",
    ];

    checkboxesToUncheck.forEach((label) => {
      customerRecordPage.uncheckCheckbox(label);
      customerRecordPage.checkCheckbox(label);
    });
  });
  it("should select and verify Base Rate Chart options", () => {
    const randomBaseRateChartOption = getRandomBaseRateChartOption();
    customerRecordPage.selectBaseRateChart(randomBaseRateChartOption);
    customerRecordPage.verifySelectedBaseRateChart(randomBaseRateChartOption);
  });
  it("should select and verify Item Rate Chart options", () => {
    const randomItemRateChartOption = getRandomItemRateChartOption();
    customerRecordPage.selectItemRateChart(randomItemRateChartOption);
    customerRecordPage.verifySelectedItemRateChart(randomItemRateChartOption);
  });
  it("should select and verify Item options", () => {
    const randomItemOption = getRandomItemOption();
    customerRecordPage.selectItem(randomItemOption);
    customerRecordPage.verifySelectedItem(randomItemOption);
  });
  it("should select and verify Surcharge options", () => {
    const randomSurchargeOption = getRandomSurchargeOption();
    customerRecordPage.selectSurcharge(randomSurchargeOption);
    customerRecordPage.verifySelectedSurcharge(randomSurchargeOption);
  });
  it("should enter and verify 'Rate Adjustments' values", () => {
    const randomRateAdjustment = getRandomNumbers(10, 100); // Random number for Rate Adjustments

    // Enter the random "Rate Adjustments" value
    customerRecordPage.enterRateAdjustment(randomRateAdjustment);

    // Verify the entered "Rate Adjustments" value
    customerRecordPage.verifyRateAdjustmentValue(randomRateAdjustment);
  });
  it("should enter and verify  'Driver Override' values", () => {
    const randomDriverOverride = getRandomNumbers(5, 50); // Random number for Driver Override
    // Enter the random "Driver Override" value
    customerRecordPage.enterDriverOverride(randomDriverOverride);

    // Verify the entered "Driver Override" value
    customerRecordPage.verifyDriverOverrideValue(randomDriverOverride);
  });

  it("should click the Order Type Overrides button and verify the title", () => {
    customerRecordPage.clickOrderTypeOverridesButton();

    customerRecordPage
      .getOrderTypesOverridesHeading()
      .should("be.visible")
      .and("have.text", "Order Types Overrides");
  });
  it("should click on the parameter Tab button and also click on the plus Add button", () => {
    customerRecordPage.clickTimeParameterTab();

    // Verify the tab is selected
    customerRecordPage.getTimeParameterTab();
    cy.wait(2000);
    customerRecordPage.clickAddDiscountButton();
  });
  it("should enter and verify 'Begin Within'  values", () => {
    cy.wait(1000);
    const randomBeginWithin = getRandomNumbers(); // Random number for Begin Within
    customerRecordPage.enterBeginWithin(randomBeginWithin);
  });
  it("should enter and verify  'Deliver Within' values", () => {
    const randomDeliverWithin = getRandomNumbers(1, 10); // Random number for Deliver Within

    // Enter the random "Deliver Within" value
    customerRecordPage.enterDeliverWithin(randomDeliverWithin);

    // Verify the entered "Deliver Within" value
    customerRecordPage.verifyDeliverWithinValue(randomDeliverWithin);
  });
  it("should add  select dates", () => {
    customerEditPage.selectCustomerSinceDate();
    customerEditPage.selectLastOrderedDate();
  });

  it("should uncheck and check the 'Override' button", () => {
    customerRecordPage.toggleOverride(false); // Uncheck the override checkbox
    customerRecordPage.verifyOverrideUnchecked();

    customerRecordPage.toggleOverride(true); // Check the override checkbox
    customerRecordPage.verifyOverrideChecked();
  });
  it("should click the 'Save' button", () => {
    customerRecordPage.clickSaveButton();
  });
  //
  it("should click the 'Discount Parameter' tab and add a new entry", () => {
    customerRecordPage.clickDiscountParameterTab();
    customerRecordPage.clickAddParameterButton();
  });
  it("should enter and verify 'Amount' value", () => {
    const randomAmount = getRandomNumbers(); // Random amount between 100 and 1000
    cy.wait(500);

    // Enter the random "Amount" value
    customerRecordPage.enterAmount(randomAmount);

    // Verify the entered "Amount" value
    customerRecordPage.verifyAmountValue(randomAmount);
  });
  it("should uncheck and check the 'Percentage' checkbox", () => {
    customerRecordPage.togglePercentage(false); // Uncheck the percentage checkbox
    customerRecordPage.verifyPercentageUnchecked();

    customerRecordPage.togglePercentage(true); // Check the percentage checkbox
    customerRecordPage.verifyPercentageChecked();
  });
  it("should add  select dates", () => {
    customerEditPage.selectCustomerSinceDate();
    customerEditPage.selectLastOrderedDate();
  });

  it("should click the 'Save' button", () => {
    customerRecordPage.clickSaveButton();
  });
  //
  it("should click 'Distance Factor' tab and add a new entry", () => {
    customerRecordPage.clickDistanceFactorTab();
    customerRecordPage.clickAddDistanceButton();
  });
  it("should enter and verify 'Mile Factor' value", () => {
    cy.wait(1000);
    const randomMileFactor = getRandomMileNumbers(); // Random number for Mile Factor

    // Enter the random "Mile Factor" value
    customerRecordPage.enterMileFactor(randomMileFactor);

    // Verify the entered "Mile Factor" value
    customerRecordPage.verifyMileFactorValue(randomMileFactor);
  });
  it("should add and  select dates", () => {
    customerEditPage.selectCustomerSinceDate();
    customerEditPage.selectLastOrderedDate();
  });

  it("should click the 'Save' button", () => {
    customerRecordPage.clickSaveButton();
  });
  it("should click the 'Save' button of overall Order Types Overrides ", () => {
    customerRecordPage.clickSubmitButton();
  });
  it("should enter and verify 'Route Surcharge Adjustment' value", () => {
    cy.wait(1000);
    const randomAmount = getRandomNumbers(1, 100); // Random amount between 1 and 100

    // Enter the random "Route Surcharge Adjustment" value
    customerRecordPage.enterRouteSurchargeAdjustment(randomAmount);

    // Verify the entered "Route Surcharge Adjustment" value
    customerRecordPage.verifyRouteSurchargeAdjustmentValue(randomAmount);
  });
  it("should enter and verify 'Booked Percentage' value", () => {
    const randomPercentage = getRandomNumbers(1, 100); // Random percentage between 1 and 100

    // Enter the random "Booked Percentage" value
    customerRecordPage.enterBookedPercentage(randomPercentage);

    // Verify the entered "Booked Percentage" value
    customerRecordPage.verifyBookedPercentageValue(randomPercentage);
  });
  it("should select and Click on the Add a New Card Button ", () => {
    customerRecordPage.addnewCardButton();
    customerRecordPage.addCardTitle();
  });
  it("should enter and verify 'Card Description' value", () => {
    const randomDescription = getRandomComment();

    // Enter the random "Card Description" value
    customerRecordPage.addCardDescription(randomDescription);

    // Verify the entered "Card Description" value
    customerRecordPage.verifyCardDescriptionValue(randomDescription);
  });
  it("should Add the Card Number", () => {
    const cardNumber = getRandomCardNumber();

    // Enter the random card number
    customerRecordPage.enterCardNumber(cardNumber);
  });

  it("should select the Random Month options", () => {
    const expiryMonth = getRandomExpiryMonth();

    // Select the random expiry month
    customerRecordPage.selectExpiryMonth(expiryMonth);
  });

  it("should select the Random Year options", () => {
    const expiryYear = getRandomExpiryYear();

    // Select the random expiry year
    customerRecordPage.selectExpiryYear(expiryYear);
  });
  it("should add the Security Code", () => {
    const securityCode = getRandomSecurityCode(); // Generate random security code

    // Enter the security code
    customerRecordPage.enterSecurityCode(securityCode);
  });
  it("should add the Card Holder Name", () => {
    const cardHolderName = getRandomCardHolderName(); // Generate a random card holder name

    // Enter the card holder name
    customerRecordPage.enterCardHolderName(cardHolderName);
  });
  it("should add the Street Address", () => {
    const address = generateRandomAddress(); // Generate a random address

    // Enter the street address
    customerRecordPage.enterStreetAddress(address);
  });
  it("should add the Postal Code", () => {
    const postalCode = generateRandomPostalCode(); // Generate a random postal code

    // Enter the postal code
    customerRecordPage.enterPostalCode(postalCode);
  });
  it("should save card button", () => {
    customerRecordPage.CardsaveButton();
  });
});
