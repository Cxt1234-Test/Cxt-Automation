import customerPage from "../../support/Pages/customerPage";
import customerEditPage from "../../support/Pages/customerEditPage";
import customerRecordPage from "../../support/Pages/customerRecordPage";
import {
  getRandomContactName,
  getRandomTitle,
  getRandomCompany,
  getRandomPhoneNumber,
  getRandomEmail,
  getRandomFaxNumber,
  getRandomRouteComment,
} from "../../support/randomUtils";
describe("Customer record Contact Tab", () => {
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

  it("clicks on the Contact tab", () => {
    // Click the "Contacts" tab and ensure it is visible
    customerRecordPage.getContactsTab().should("be.visible").click();
  });
  it("should verify and check the Checkbox of Contact tab", () => {
    // Define and toggle checkboxes
    const checkboxes = [
      "Require during order entry",
      "Automatically save during order entry",
    ];
    checkboxes.forEach((checkboxLabel) => {
      customerRecordPage.toggleCheckbox(checkboxLabel);
    });
  });
  it("should click on the plus Add a contact button", () => {
    // Click on "Add a Contact" button
    customerRecordPage.clickAddContactButton();
  });
  it("should verify Add Contact Screen Text", () => {
    // Verify new screen title is "Add Contact"
    customerRecordPage.verifyAddContactScreen();
  });

  it("should fill in contact details with random values Add the Name Title and company ", () => {
    const name = getRandomContactName();
    const title = getRandomTitle();
    const company = getRandomCompany();
    customerRecordPage.enterContactDetails(name, title, company);
  });
  it("should click Add Contact Edit Address Button", () => {
    customerRecordPage.clickEditAddressButton();
  });
  it("should fill in contact details with random values", () => {
    customerRecordPage.fillAddressInfo(
      "Suite 305",
      "Suite 202, Room 5B, Temperature Control Unit",
      "Little Rock",
      "",
      "",
      "72201",
      "1234", // Plus 4 code added (you can change it as needed)
      "72201", // Postal Code (not needed for US)

      "(501) 555-5678"
    );
  });

  it("should Check the toggle Overrride address checkbox", () => {
    customerRecordPage.toggleOverrideAddressCheckbox();
  });
  it("should Check the toggle Override Billing Group Checkbox", () => {
    customerRecordPage.toggleOverrideBillingGroupCheckbox();
  });
  it("should select the Billig Group Option randomly", () => {
    //cy.wait(5000);
    const billingGroup = "ref2";
    customerRecordPage.selectBillingGroup(billingGroup);
  });
  it("should add the Email Sms Text", () => {
    const emailSmsText = getRandomEmail();

    customerRecordPage.enterEmailSmsText(emailSmsText);
  });
  it("should add the Phone Number", () => {
    const phoneNumber = getRandomPhoneNumber();

    customerRecordPage.setPhoneNumber(phoneNumber);
  });
  it("should add the Fax Number", () => {
    const faxNumber = getRandomFaxNumber();

    customerRecordPage.setFaxNumber(faxNumber);
  });
  it("should add the Default Origin Comments", () => {
    const defaultOriginComments = getRandomRouteComment();

    customerRecordPage.setDefaultOriginComments(defaultOriginComments);
  });
  it("should add the Default Destination Comments", () => {
    const defaultDestinationComments = getRandomRouteComment();

    customerRecordPage.setDefaultDestinationComments(
      defaultDestinationComments
    );
  });
  it("should add the set Contact Comment", () => {
    const contactComment = getRandomRouteComment();

    customerRecordPage.setContactComment(contactComment);
  });
  it("should Click On the save Contact button", () => {
    // Save contact
    customerRecordPage.saveContact();
  });
  it("should click on the delete button", () => {
    cy.wait(1000);
    customerRecordPage.clickDeleteButton();

  });
});
