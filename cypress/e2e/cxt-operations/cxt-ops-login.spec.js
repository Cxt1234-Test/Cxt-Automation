describe("Login Page Functionality - Invalid and Valid Input Handling", () => {
  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
 
  beforeEach(() => {
    cy.visit(Cypress.env("BASE_URL")); // Use environment variable for URL
  });
 
  it("should test invalid login scenarios", () => {
    // Define an array of invalid login attempts
    const invalidAttempts = [
      {
        username: "",
        password: "",
        errorMessage: "An error occurred during authentication",
      },
      {
        username: "*********",
        password: "*****",
        errorMessage: "An error occurred during authentication",
      },
      {
        username: "******",
        password: "",
        errorMessage: "An error occurred during authentication",
      },
      {
        username: "",
        password: "*********",
        errorMessage: "An error occurred during authentication",
      },
    ];
 
    invalidAttempts.forEach((attempt) => {
      // Enter credentials only if they are not empty
      if (attempt.username) {
        cy.get(".mat-input-element").first().type(attempt.username);
      }
      if (attempt.password) {
        cy.get(".mat-input-element").last().type(attempt.password);
      }
 
      // Click the login button
      cy.get(".mat-flat-button").contains("Login").click();
 
      // Assert error message visibility
      cy.get("h2.dimmer")
        .should("be.visible")
        .then(($error) => {
          const errorText = $error.text();
 
          // Handle error message conditions
          if (errorText.includes("An error occurred during authentication")) {
            cy.wait(3000);
          } else if (
            errorText.includes(
              "You do not have permission to perform that action"
            )
          ) {
            cy.wait(3000);
          } else {
            throw new Error("Unexpected error message: " + errorText);
          }
 
          // Close the error dialog
          cy.get("button.mat-raised-button.mat-primary").click();
        });
 
      // Clear fields for next attempt
      cy.get(".mat-input-element").first().clear();
      cy.get(".mat-input-element").last().clear();
    });
  });
 
  it("should test valid login scenarios and successful login", () => {
    cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
  });
});