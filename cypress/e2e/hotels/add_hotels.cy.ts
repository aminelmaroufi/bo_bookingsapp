import { baseURL } from "../../../src/config";

describe("Test the hotels page", () => {
  beforeEach(() => {
    cy.goToHotels();
    cy.get('[cy-data="add-hotel-btn"]').click();
  });

  after(() => {
    cy.logout();
  });

  it("should render add new hotel modal when the add button is clicked", () => {
    cy.get('[data-testid="hotel-modal"]').should("be.visible");
  });

  it("should render the modal with the save button disabled", () => {
    cy.get('[data-testid="save-hotel-btn"]').should("be.visible");
    cy.get('[data-testid="save-hotel-btn"]').should("be.disabled");
  });

  it("should fill and add the new hotal to table", () => {
    cy.intercept("POST", `${baseURL}/administrators/hotels`, {
      fixture: "hotels/add_hotel_response.json",
    }).as("addHotel");
    //fill the form
    cy.get('[data-testid="hotel-form-name"').type("New Hotel");

    cy.get("#hotel-form-mainpic")
      .invoke("show")
      .selectFile("cypress/fixtures/hotels/1.jpeg");
    cy.get("#hotel-form-secpic")
      .invoke("show")
      .selectFile("cypress/fixtures/hotels/2.jpeg");
    cy.get('[data-testid="hotel-form-type"').type("Test hotel type");
    cy.get('select[name="rcrs-country"]').eq(0).select("France");
    cy.get('[data-testid="hotel-form-city"').type("Paris");
    cy.get('[data-testid="hotel-form-rating"]').find("label").eq(2).click();
    cy.get('[data-testid="hotel-form-shortaddr"').type(
      "Test hotel short address"
    );
    cy.get('[data-testid="hotel-form-address"').type("Test hotel address");
    cy.get('[data-testid="hotel-form-location"').type("Test hotel location");
    cy.get('[data-testid="save-hotel-btn"]').should("be.enabled");
    cy.get('[data-testid="save-hotel-btn"]').click();
    cy.wait("@addHotel");
    cy.get(".Toastify__toast-container").should("be.visible");
    cy.get(".Toastify__toast-container")
      .find("div")
      .eq(0)
      .should("have.class", "Toastify__toast--success");
    cy.fixture("hotels/add_hotel_response").then((res) => {
      cy.get('[role="alert"]').should("contain", res.result.message);
    });
    cy.get('[data-testid="hotels-table"]')
      .find("tbody")
      .find("tr")
      .eq(0)
      .find("td")
      .eq(0)
      .should("contain", "New Hotel");
  });
});
