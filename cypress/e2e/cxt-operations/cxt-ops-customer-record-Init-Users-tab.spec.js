import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";

import {
  getRandomInternetUserTemplate,
  getRandomDriverLocationOption,
  getRandomAcceptCreditCardOption,
  getRandomInternetUserId,
  getRandomInternetUserPassword,
  getRandomInternetUserName,
  getRandomInternetUserEmail,
  getRandSelectDefaultServiceType,
  getRandomRateAdjustment,
  getRandomInternetUserPhone,
  getRandomBillingGroup,
  getRandomDisplayDriverLocation,
  getRandomDefaultOrderInternetType,
  getRandomEditOrderType,
  getRandomCancelOrderType,
  generateRandomEmail,
  getRandomAddressGroup,
  getRandomLatitude,
  getRandomLongitude,
  getRandomBarcode,
  getRandomInternetUserLabel,
  getRandomContractStopAlertOption,
  getRandomContractStopAlertMessage,
  getRandomContractStopCheckboxLabel,
} from "../../support/randomUtils";
describe("Customer record Inet Users tab", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Customers' text and click the 'Search customer Field' ", () => {
    customerRecordPage.visitCustomers();
    cy.wait(3000); // wait after visiting the Customers page
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

  it("should click the Init Users button, even if it is inside the More options menu", () => {
    let found = false; // Flag to track if the button is found

    cy.get("#tab-container button  .ellipsis")
      .each(($button) => {
        cy.wrap($button).then(($el) => {
          if ($el.text().trim() === "Inet Users") {
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
          customerRecordPage.clickInetUsersTab();
        }
      });
  });
  it("should select and verify a random driver location option", () => {
    const locationOption = getRandomDriverLocationOption();

    customerRecordPage.selectDriverLocation(locationOption);
    customerRecordPage.verifyDriverLocation(locationOption);
  });
  it("should click the '+ Add Internet User' button", () => {
    customerRecordPage.clickAddInternetUserButton();
  });
  it("should click the 'General' tab under Internet Users", () => {
    customerRecordPage.clickInternetUsersGeneralTab();
  });
  it("should choose and verify a random Internet User Template", () => {
    cy.wait(5000);
    const template = getRandomInternetUserTemplate();

    customerRecordPage.chooseInternetUserTemplate(template);
    customerRecordPage.verifyInternetUserTemplate(template);
  });
  it("should enter a random Internet User ID", () => {
    cy.wait(1000);
    const userId = getRandomInternetUserId();

    customerRecordPage.enterInternetUserId(userId);
  });
  it("should confirm the Internet User Password", () => {
    cy.wait(1000);
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterInternetUserPassword(password);
  });
  it("should confirm the Internet User Confirm Password", () => {
    const password = getRandomInternetUserPassword();

    customerRecordPage.enterConfirmPassword(password);
  });
  it("should enter a random Internet User Name", () => {
    const name = getRandomInternetUserName();

    customerRecordPage.enterInternetUserName(name);
  });
  it("should enter a random Internet User Email", () => {
    const email = getRandomInternetUserEmail();

    customerRecordPage.enterInternetUserEmail(email);
  });
  it("should choose and verify a random Default Service Type", () => {
    const serviceType = getRandSelectDefaultServiceType();

    customerRecordPage.chooseDefaultServiceType(serviceType);
  });
  it("should enter a random Rate Adjustment", () => {
    const rate = getRandomRateAdjustment();

    customerRecordPage.enterRateAdjustment(rate);
  });
  it("should enter a random Internet User Phone", () => {
    const phone = getRandomInternetUserPhone();

    customerRecordPage.enterInternetUserPhone(phone);
  });

  it("should click the Internet User Options tab", () => {
    cy.wait(3000);
    customerRecordPage.clickInternetUserOptionsTab();
  });
  it("should click the 'Enable All' button on the Options   Button", () => {
    cy.wait(3000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should click the 'Disable All' button on the Options  Button", () => {
    cy.wait(2000);
    customerRecordPage.clickDisableAllButton();
  });
  it("should toggle all Options checkbox by label with scroll and conditional check/uncheck logic", () => {
    const checkboxLabels = [
      "Allow Password",
      "Show Rates",
      "Allow Accessorial Charges",
      "Allow Viewing Invoices",
      "Allow Address Book Access",
      "Allow Address Entry",
      "Allow Edit to Deliver From Time",
      "Show Deliver By Time",
      "View Account Reports",
      "View Route Stops",
      "Modify Route Stops",
      "View Inactive Route Stops",
      "View Detail Tracking",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
  it("should choose and verify a random Accept Credit Cards option", () => {
    const creditCardOption = getRandomAcceptCreditCardOption();

    customerRecordPage.chooseAcceptCreditCardOption(creditCardOption);
    customerRecordPage.verifyAcceptCreditCardOption(creditCardOption);
  });
  it("should toggles all option checkbox by label with scroll and conditional check/uncheck logic", () => {
    const checkboxLabels = [
      "Allow Map Based Validation",
      "Allow Cart Checkout",
      "Create from Recent Orders",
      "Create from Recent Templates",
      "View Track Order",
      "View Inet User Orders Only ",
      "View User Profile",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
  it("should choose and verify a random Display Driver Location", () => {
    const location = getRandomDisplayDriverLocation();
    customerRecordPage.chooseDisplayDriverLocation(location);
    customerRecordPage.verifyDisplayDriverLocation(location); // if needed
  });
  it("should choose and verify a random Default Order Type", () => {
    const orderType = getRandomDefaultOrderInternetType();

    customerRecordPage.chooseDefaultOrderType(orderType);
  });
  it("should select and verify a random Edit Order Type", () => {
    const editOrderType = getRandomEditOrderType();
    customerRecordPage.chooseEditOrderType(editOrderType);
    customerRecordPage.verifyEditOrderType(editOrderType);
  });
  it("should select and verify a random Cancel Order Type", () => {
    const cancelOrderType = getRandomCancelOrderType();
    // Select random option from Cancel Order Type dropdown
    customerRecordPage.chooseCancelOrderType(cancelOrderType);
    customerRecordPage.verifyCancelOrderType(cancelOrderType);
  });
  it("should enter and verify Email/SMS Text Alerts", () => {
    const email = generateRandomEmail();
    customerRecordPage.enterEmailSmsTextAlert(email);
  });
  it("should toggle all Internet And web Services User Options tab checkboxes", () => {
    const checkboxLabels = [
      "Address Book Pop Up ",
      "Allow Rating Override ",
      "Allow Webservice API ",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });
  it("should search for 'Allow Edit to Deliver From Time' in the shipping label options tab search field", () => {
    cy.wait(3000);
    const option = "Allow Edit to Deliver From Time";
    customerRecordPage.searchUserOption(option);
  });

  it("should toggle a Options checkbox by label with scroll and conditional check/uncheck logic", () => {
    const checkboxLabels = ["Allow Edit to Deliver From Time"];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabel(label);
    });
  });

  it("should click the Internet User Customers tab", () => {
    cy.wait(5000);
    customerRecordPage.clickInternetUserCustomersTab();
  });
  it("should click the 'Enable All' button on the Customers  Button", () => {
    cy.wait(3000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should click the 'Disable All' button on the Customers Button", () => {
    cy.wait(2000);
    customerRecordPage.clickDisableAllButton();
  });

  it("should toggles All  Customers checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const checkboxLabels = [
      "123 Alpha - 23462",
      "49ers 2024 - 1105",
      "50 Character Compan - 1112",
      "Acestreet - 2510",
      "ADP Integration Test - 40000",
      "ahmad - 167801",
      "Air Service Company - 2175",
      "Anholding - 1950",
      "Asad-New112 - 23432543",
      "Bamquote - 3740",
      "Billy's Baseball Camp - 201149",
      "Blam Delivery - 1009",
      "Brando Hours - 234265383",
      "Brandon Soccer Mom Van - 234265379",
      "Brandon's Boxers - 234265378",
      "Brandon's Covid Party for accusers - 234265408",
      "Brandon's Ear Buds - 234265405",
      "Brandon's Headsets - 234265407",
      "Brandon's Monitors - 234265403",
      "Brandon's Reflex Balls - 234265376",
      "Brandon's Tiger School - 234265390",
      "Brandon's Violations - 234259",
      "Brandons Ballies - 234240",
      "Brandons Cars - 234265397",
      "Brandy's Brandy - 234265393",
      "Canada Customer - 2176",
      "Canetexon - 3280",
      "Cantanix - 2190",
      "Cardinal Integration Test - 40002",
      "CEM Industries - 1011",
      "Christy Christy Christy Test - 1096",
      "Christy's Swagger Testing - 40010",
      "Cone-line - 1920",
      "Consolidation Company - 2177",
      "Credit Card Testing Customer - 4",
      "CXT Order Updates - 507110",
      "CXT Order Updates - 822045",
      "D-kaytaxon - 540",
      "D-zumkix - 9550",
      "Damtechi - 1520",
      "Default customer - 1017",
      "Dingdanlab - 13401",
      "Domcom - 9058",
      "Dongreen - 800",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelWithScroll(label);
    });
  });
  it("should search for 'Brandy's Brandy - 234265393' in the shipping customer label search field", () => {
    cy.wait(3000);
    const option = "ABCEEM";
    customerRecordPage.searchCustomer(option);
  });

  it("should toggles a  Customers checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const checkboxLabels = ["ABCEEM"];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelWithScroll(label);
    });
  });

  it("should click the X Route tab", () => {
    customerRecordPage.clickXRouteTab();
  });
  it("should check the Advanced Driver Permissions checkbox", () => {
    cy.wait(3000);
    customerRecordPage.checkAdvancedDriverPermissions();
  });
  it("should click the 'Enable All' button on the X Route  Button", () => {
    cy.wait(3000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });

  it("should click the 'Disable All' button on the  X Route Button", () => {
    cy.wait(2000);
    customerRecordPage.clickDisableAllButton();
  });
  it("should click the 'Enable All' button again on the X Route section", () => {
    cy.wait(3000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should toggles all  X Route checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const checkboxLabels = [
      "Aaren Ryhorovich - 14783",
      "Aaren Ovill - 19184",
      "Aaren Bourley - 22098",
      "Aaren Wheowall - 23099",
      "Aarika Radband - 21167",
      "Aarika Toppes - 26965",
      "Aaron Newman - 125",
      "Aaron Newman - 501",
      "Aaron Pudding - 18891",
      "Aaron Hillborne - 21885",
      "Aaron Cartin - 28905",
      "Ab Stoad - 16890",
      "Ab Lamont - 23787",
      "Ab Shackleton - 26810",
      "Abagail Pitson - 17448",
      "Abba Langthorne - 10979",
      "Abba Threadgall - 19427",
      "Abba Burnsall - 22206",
      "Abbe Whitcher - 10668",
      "Abbe Fraanchyonok - 23323",
      "Abbe Castellani - 24782",
      "Abbe Rumble - 27142",
      "Abbe Girardoni - 29290",
      "Abbey Costan - 12540",
      "Abbey Daniels - 13402",
      "Abbey MacAdie - 17507",
      "Abbey Frede - 25838",
      "Abbey Gadaud - 28411",
      "Abbi Winscomb - 12469",
      "Abbie Sim - 11826",
      "Abbie Morcombe - 13871",
      "Abbie Heninghem - 18227",
      "Abbie Moppett - 19421",
      "Abbie Cohan - 23908",
      "Abbie Alexandrescu - 25668",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelXRouteWithScroll(label);
    });
  });
  it("should search for 'Abigail Cranshaw - 28125' in the shipping X Route label search field", () => {
    cy.wait(3000);
    const option = "Advanced Driver Permissions";
    customerRecordPage.searchDriver(option);
  });

  it("should toggles a X Route checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const checkboxLabels = ["Advanced Driver Permissions"];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelXRouteWithScroll(label);
    });
  });

  it("should click the Custom Procedures tab", () => {
    customerRecordPage.clickCustomProceduresTab();
  });
  it("should click the 'Enable All' button on the Custom Procedures  Button", () => {
    cy.wait(5000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should toggles all a custom procedure checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const customProcedureOptions = [
      "Allow Shipping Labels",
      "-24 - 4x4 Shipping Label",
      "24 - 4x4 Shipping Label NS",
      "5 - 4x4 Shipping Labels",
      "-25 - 4x6 Shipping Label",
      "25 - 4x6 Shipping Label",
      "4949 - Christy Test",
      "2147 - CSV Test Format",
      "100 - CSV Test Raw",
      "-10 - CXT - Cardinal Parcel Scan Report",
      "-9 - CXT - Cardinal Weekly Report",
      "9 - CXT - Cardinal Weekly Report",
      "-1 - CXT - Order Shipping Label",
      "-19 - CXT - Standard 4x6 Shipping Label - X Internet",
      "50 - CXT - Standard 4x6 Shipping Label - X Internet",
      "26 - QA Test",
    ];

    customProcedureOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelCustomProceduresWithScroll(label);
    });
  });
  it("should search for 'Allow Shipping Labels' in the shipping label search field", () => {
    cy.wait(3000);
    const option = "Allow Shipping Labels";
    customerRecordPage.searchShippingLabelOption(option);
  });

  it("should toggles  a custom procedure checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const customProcedureOptions = ["Allow Shipping Labels"];

    customProcedureOptions.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelCustomProceduresWithScroll(label);
    });
  });
  it("should click the Internet User Save Button", () => {
    cy.wait(8000);
    customerRecordPage.clickInternetSaveButton();
  });
  it("should click  the edit button icon on Inet user  ", () => {
    cy.wait(8000);
    customerRecordPage.clickInetUserEditIcon();
  });

  it("should click the Contract Stop Alerts tab", () => {
    cy.wait(3000);
    internetPage.clickContractStopAlertsTab();
  });
  it("should select and verify Contract Stop Alert Enforcement option", () => {
    cy.wait(2000);
    const randomOption = getRandomContractStopAlertOption();

    internetPage.selectContractStopAlertEnforcement(randomOption);
  });
  it("should enter a random Contract Stop Alert Message in the field", () => {
    const randomMessage = getRandomContractStopAlertMessage();
    internetPage.enterContractStopAlertMessage(randomMessage);
  });
  //
  it("should click the Revert to Default button", () => {
    internetPage.clickRevertToDefaultButton();
  });
  it("should  All toggle a random Contract Stop checkbox", () => {
    cy.wait(3000);
    const randomLabel = getRandomContractStopCheckboxLabel();
    customerRecordPage.scrollAndToggleCheckbox(randomLabel);
  });

  it("should search for 'The Wine Room - 200270' in the Available Contract Stops label search field", () => {
    cy.wait(3000);
    const option = "The Wine Room";
    internetPage.searchShippingCustomer(option);
  });
  it("should click the 'Delete' button Selected Contract Stops ", () => {
    cy.wait(1000);
    internetPage.clickDeletedButtons();
  });
  it("should click the Internet User Address Book tab", () => {
    customerRecordPage.clickInternetUserAddressBookTab();
  });
  it("should toggle Internet User Address Book radio options", () => {
    const radioLabels = ["Private", "Consolidated", "Group"];

    radioLabels.forEach((label) => {
      customerRecordPage.toggleRadioByLabel(label);
    });
  });
  it("should select and verify Address Book Group option", () => {
    const randomGroup = getRandomAddressGroup();

    internetPage.selectAddressBookGroup(randomGroup);
  });

  it("should click the Internet Users Address Book button", () => {
    internetPage.clickInternetUserAddressBookButton();
  });
  it("should click the Inet Users Address Book plus button", () => {
    cy.wait(2000);
    internetPage.clickInetUserAddressBookPlusButton();
  });
  it("should click on the Details tab", () => {
    cy.wait(3000);
    internetPage.clickDetailsTab();
  });

  it("should enter a random latitude in the Latitude field", () => {
    cy.wait(2000);
    const randomLatitude = getRandomLatitude();
    internetPage.enterLatitude(randomLatitude);
  });
  it("should enter a random longitude in the Longitude field", () => {
    const randomLongitude = getRandomLongitude();
    internetPage.enterLongitude(randomLongitude);
  });
  it("should enter a random Lookup Barcode in the field", () => {
    const randomBarcode = getRandomBarcode();
    internetPage.enterLookupBarcode(randomBarcode);
  });
  it("should update the Internet User Address Label with a new random value", () => {
    const label = getRandomInternetUserLabel();

    internetPage.enterInternetUserAddressLabel(label);
  });
  it("should click on the General tab", () => {
    cy.wait(3000);
    internetPage.clickInternetUsersGeneralTab();
  });

  it("should click on the Google Icon button", () => {
    cy.wait(2000);
    internetPage.clickGoogleIcon();
  });
  it("should search a random location in Search Google Places field", () => {
    const randomLocation = "United States";

    internetPage.setSearchGooglePlace(randomLocation);
  });
  it("should fill in contact details with random Google Places field  values", () => {
    internetPage.fillAddressInfo(
      "Suite 202, Room 5B, Temperature Control Unit",
      "Suite 305",
      "Little Rock",
      "John Doe",
      "",
      "",
      "72201",
      "1234",
      "72201",

      "(501) 555-5678"
    );
  });
  it("should open the Inet Users Address Book entry form by clicking the plus button", () => {
    cy.wait(2000);
    internetPage.clickInetUserAddressBookPlusButton();
  });
  it("should click on the Address Book icon button", () => {
    internetPage.clickAddressBookIcon();
  });

  it("should fill in contact details with random values", () => {
    cy.wait(3000);
    internetPage.fillAddressGoogleInfo(
      "Suite 202, Room 5B, Temperature Control Unit",
      "Suite 305",
      "Little Rock",
      "John Doe",
      "",
      "",
      "72201",
      "1234",
      "72201",

      "(501) 555-5678"
    );
  });

  it("should open the 'Inet Users Address Book' entry form when the plus (+) button is clicked", () => {
    cy.wait(2000);
    internetPage.clickInetUserAddressBookPlusButton();
  });
  it("should click on the Drop Pin button", () => {
    cy.wait(3000);
    internetPage.clickDropPin();
  });
  it("should drag and scroll the Google Map", () => {
    cy.wait(10000);
    internetPage.dragMap();
    internetPage.scrollMap(-300);
    internetPage.scrollMap(300);
  });

  it("should click on the Google draggable minus (Zoom Out) button", () => {
    cy.wait(2000);
    internetPage.clickGoogleZoomOutButton();
  });
  it("should click on the Google draggable Move up button", () => {
    cy.wait(2000);
    internetPage.clickGoogleMoveUpButton();
  });

  it("should click on the Google draggable Move down button", () => {
    cy.wait(2000);
    internetPage.clickGoogleMoveDownButton();
  });
});
