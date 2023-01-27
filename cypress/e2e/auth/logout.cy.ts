describe("Test logout scenario", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("should find menu button/not find user box element", () => {
    cy.get('[data-cy="user-box"]').should("be.visible");
    cy.get('[data-cy="popover"]').should("not.exist");
  });

  it("should logout successfully", () => {
    cy.get('[data-cy="user-box"]').click();
    cy.log("Test that the user box is visible");
    cy.get('[data-cy="popover"]').should("be.visible");
    cy.log("Click on logout button");
    cy.get('[data-cy="logout-btn"]').click();
    cy.location("pathname").should("include", "/login");
  });
});
