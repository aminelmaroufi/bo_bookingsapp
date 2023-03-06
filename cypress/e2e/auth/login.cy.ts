describe("Login Page Test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  after(() => {
    cy.logout();
  });

  it("should check that all form elements are displayed", () => {
    cy.get("img").should("be.visible");
    cy.get("#email").should("be.visible");
    cy.get("#password").should("be.visible");
    cy.contains("button", "Sign in").should("be.disabled");
  });

  it("should not let the user to login with an invalid email value", () => {
    cy.get("#email").type("admin@admin", { force: true });
    cy.get("#email-helper-text").should("contain", "email is not valid");
  });

  it("should not enable login button for empty password value", () => {
    cy.get("#email").type("admin@admin.com");
    cy.contains("button", "Sign in").should("be.disabled");
  });

  it("should enable login button for a valid email and password value", () => {
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("ATest");
    cy.contains("button", "Sign in").should("be.enabled");
  });

  it("should show an error message from server for invalid email or password", () => {
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("Test#{enter}");
    cy.get(".Toastify__toast--error").should("be.visible");
  });

  it("should navigate to /dashboard for a successfull login", () => {
    //Enter login information and submit form
    cy.get("#email").type("admin@admin.com");
    cy.get("#password").type("Azerty123@@").type("{enter}");
    //Test if the user is  redirected successfully to dashboard
    cy.location("pathname").should("include", "/dashboard");
  });
});
