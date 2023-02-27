describe("Test Sidebar", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
  });

  it("should display the dahsboard header", () => {
    cy.get('[data-cy="dash-header"]').should("be.visible");
  });
  it("should display the menu tooltip", () => {
    cy.get('[data-cy="dash-tooltip"]').should("be.visible");
  });
  it("should display the admin fullname in the sidebar header", () => {
    cy.fixture("admin").then((admin) => {
      cy.get('[data-cy="user-fullname"]').contains(admin.fullname);
    });
  });
  it("should display the admin email in the sidebar header", () => {
    cy.fixture("admin").then((admin) => {
      cy.get('[data-cy="user-email"]').contains(admin.email);
    });
  });
  it("should display the dahsboard sidebar", () => {
    cy.get('[data-cy="dash-tooltip"]').click();
    cy.get('[data-cy="dash-sidebar"]').should("be.visible");
  });
  it("should display the footer", () => {
    cy.get('[data-cy="footer"]').scrollIntoView();
    cy.get('[data-cy="footer"]').should("be.visible");
    cy.get('[data-cy="footer"]').contains(
      /2022 - Booking Hotels Admin Dashboard/
    );
  });
});

describe("Test the Sidebar Navigation", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard");
    cy.get('[data-cy="dash-tooltip"]').click();
  });

  after(() => {
    cy.logout();
  });

  it("should navigate to hotels page", () => {
    cy.get('[data-cy="nav-list"]').contains("Hotels").click();
    cy.location("pathname").should("include", "/hotels");
  });
  it("should navigate to rooms page", () => {
    cy.get('[data-cy="nav-list"]').contains("Rooms").click();
    cy.location("pathname").should("include", "/rooms");
  });
  it("should navigate to customers page", () => {
    cy.get('[data-cy="nav-list"]').contains("Customers").click();
    cy.location("pathname").should("include", "/customers");
  });
  it("should navigate to moderators page", () => {
    cy.get('[data-cy="nav-list"]').contains("Moderators").click();
    cy.location("pathname").should("include", "/moderators");
  });
});
