import * as numeral from "numeral";
import { baseURL } from "../../../src/config";

describe("Test the home page", () => {
  beforeEach(() => {
    cy.intercept("GET", `${baseURL}/administrators/statistics`, {
      fixture: "statistics.json",
    }).as("getStatistics");
    cy.login();
    cy.visit("/dashboard");
    //wait for the statistics response
    cy.wait("@getStatistics");
  });

  after(() => {
    cy.logout();
  });

  it("should render hotels card with the correct data", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="hotels-card"').contains(statistics.result.hotels.total);
      cy.get('[cy-data="hotels-card"').contains(
        statistics.result.hotels.percentOfIncrease
      );
    });
  });
  it("should render rooms card with the correct data", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="rooms-card"').contains(statistics.result.rooms.total);
      cy.get('[cy-data="rooms-card"').contains(
        statistics.result.rooms.percentOfIncrease
      );
    });
  });
  it("should render customers card with the correct data", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="customers-card"').contains(
        statistics.result.customers.total
      );
      cy.get('[cy-data="customers-card"').contains(
        statistics.result.customers.percentOfIncrease
      );
    });
  });
  it("should render orders card with the correct data", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="orders-card"').contains(statistics.result.orders.total);
      cy.get('[cy-data="orders-card"').contains(
        statistics.result.orders.percentOfIncrease
      );
    });
  });

  it("should render the correct total amount of the current month and the percent of increast related to last month", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="data-amount-currMonth"]').contains(
        numeral(statistics.result.totalAmount.totalAmountOfMonth).format(
          `$0,0.00`
        )
      );
      cy.get('[cy-data="data-amount-currMonth"]').contains(
        statistics.result.totalAmount.percentOfIncrease
      );
    });
  });
  it("should redirect user to view bookings details from 'view details' link", () => {
    cy.get('[cy-data="deposit-view-viewDetails').click();
    cy.location("pathname").should("include", "/bookings");
  });

  it("shuld display the correct data of the last orders", () => {
    cy.fixture("statistics").then((statistics) => {
      cy.get('[cy-data="last-orders-table"')
        .find("tr")
        .should("have.length", statistics.result.orders.lastOrders.length);
    });
  });
  it("should redirect user to view bookings details from 'see more orders' link", () => {
    cy.get('[cy-data="orders-details-link"]').click();
    cy.location("pathname").should("include", "/bookings");
  });

  it("should display the chart title", () => {
    cy.get('[cy-data="chart-title"]').should(
      "contain",
      `This year (${new Date().getFullYear()})`
    );
  });

  it("should display y axis", () => {
    cy.get(".yAxis").should("be.visible");
  });

  it("should display y axis title", () => {
    cy.get(".recharts-label").should("contain", `Bookings ($)`);
  });
  it("should display x axis", () => {
    cy.get(".xAxis").should("be.visible");
  });
  it("should display the chart with 1 simple line", () => {
    cy.get(".recharts-layer.recharts-line").should("be.visible");
    cy.get(".recharts-layer.recharts-line")
      .find("path")
      .should("have.length", 1);
  });
});
