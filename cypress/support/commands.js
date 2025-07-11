Cypress.Commands.add("login", (user, password) => {
  cy.visit(Cypress.env("BASE_URL"));
  
 
  cy.get(".login-image", { timeout: 30000 }).should("be.visible");
 
  // Type the username and password
  cy.get(".mat-input-element").first().clear().type(user);
  cy.get(".mat-input-element").last().clear().type(password);
 
  // Click the login button
  cy.get(".mat-flat-button").contains("Login").click();
 
  // Assert successful login
  cy.url({ timeout: 30000 }).should("include", "/home");
 
  cy.get(".ng-star-inserted", { timeout: 30000 })
    .contains("Dashboard")
    .should("be.visible");
  // Verify company name after login
  cy.get("h4.company-name.mat-tooltip-trigger")
    .should("be.visible")
    .and("contain", "Cxt Software");
});
