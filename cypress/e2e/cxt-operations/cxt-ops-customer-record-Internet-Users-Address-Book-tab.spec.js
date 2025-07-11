import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
import {
  getRandomAddressGroup,
  getRandomLatitude,
  getRandomLongitude,
  getRandomBarcode,
  getRandomInternetUserLabel,
} from "../../support/randomUtils";
describe("Maintenance record Internet Users address Book tab", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Internet Users' text and click the 'Search  Field' ", () => {
    internetPage.visitCustomers();
    cy.wait(3000);
  });
  it("should select the 'Name' option from Internet Users dropdown", () => {
    const dropdownOption = "Name";
    internetPage.selectInternetUserDropdownOption(dropdownOption);
  });
  it("should search for name and edit customer details", () => {
    const customers = ["Sam", "Harry"];

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
      cy.wait(1000);
      customerEditPage.selectEditOption();
      cy.wait(1000);
      customerPage.verifyDrawerVisible();
    }
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
