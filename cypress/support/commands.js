Cypress.Commands.add("addAuthorizationHeader", (token) => {
    cy.intercept({ url: "*", middleware: true }, (req) => {
      req.headers["Authorization"] = token;
    });
  });