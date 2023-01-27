describe("Test Dashboard Components", () => {
  before(() => {
    cy.login();
  });

  after(() => {
    cy.logout();
  });

  it("should render all the dashboard elements", () => {
    cy.visit("/dashboard");
  });
});
