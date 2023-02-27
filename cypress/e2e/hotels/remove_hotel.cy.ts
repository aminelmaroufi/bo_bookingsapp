import { baseURL } from "../../../src/config";

describe("Test the hotels page", () => {
  beforeEach(() => {
    cy.goToHotels();
  });

  after(() => {
    cy.logout();
  });

  it("Should render the delete hotel modal after clicking to delete button", () => {
    cy.get('[data-testid="hotels-table"]')
      .find("tbody")
      .find("tr")
      .eq(0)
      .find("td")
      .find('[aria-label="Delete Hotel"]')
      .click();
    cy.get('[data-testid="remove-hotel-modal"]').should("be.visible");
  });

  it("Should delete the selected hotel", () => {
    cy.fixture("hotels/hotel_example").then((hotel) => {
      cy.intercept("DELETE", `${baseURL}/administrators/hotels/${hotel.id}`, {
        fixture: "hotels/delete_hotel_response.json",
      }).as("deleteHotel");
      cy.get('[data-testid="hotels-table"]')
        .find("tbody")
        .find("tr")
        .eq(0)
        .find("td")
        .find('[aria-label="Delete Hotel"]')
        .click();
      cy.get('[data-testid="remove-hotel-modal"]')
        .find('[data-testid="delete-hotel-btn"]')
        .click();
      cy.wait("@deleteHotel");
      cy.get(".Toastify__toast-container")
        .find("div")
        .eq(0)
        .should("have.class", "Toastify__toast--success");
      cy.fixture("hotels/delete_hotel_response").then((res) => {
        cy.get('[role="alert"]').should("contain", res.result.message);
      });
      cy.get('[data-testid="hotels-table"]')
        .find("tbody")
        .find("tr")
        .find("td")
        .eq(0)
        .should("not.contain", hotel.name);
    });
  });
});
