import { baseURL } from "../../../src/config";

describe("Test the hotels page", () => {
  beforeEach(() => {
    cy.goToHotels();
  });

  after(() => {
    cy.logout();
  });

  describe("Test the hotel view header", () => {
    it("should render the correct view title", () => {
      cy.get('[cy-data="hotels-view-title"]').should("be.visible");
      cy.get('[cy-data="hotels-view-title"]').should("contain", "Hotels");
    });
    it("should render the view subtitle", () => {
      cy.get('[cy-data="hotels-subtitle"]').should("be.visible");
    });
    it("should render the add new hotel button", () => {
      cy.get('[cy-data="add-hotel-btn"]').should("be.visible");
    });
  });

  describe("Test search box", () => {
    it("should render the search box", () => {
      cy.get('[cy-data="hotels-search-box"]').should("be.visible");
    });
    it("should render the search box icon", () => {
      cy.get('[data-testid="SearchTwoToneIcon"]').should("be.visible");
    });
  });

  describe("Test hotels table", () => {
    it("should render the hotels table", () => {
      cy.get('[data-testid="hotels-table"]').should("be.visible");
    });

    it("should render table header", () => {
      cy.get(
        ".MuiTableRow-root.MuiTableRow-head.css-k4az6q-MuiTableRow-root"
      ).should("be.visible");
    });

    it("should render the hotels table", () => {
      cy.fixture("hotels/hotels").then((data) => {
        cy.get('[data-testid="hotels-table"]')
          .find("tbody")
          .find("tr")
          .should("have.length", data.result.hotels.length);
      });
    });
    it("should render the export hotels button", () => {
      cy.get('[cy-data="export-hotels-btn"]').scrollIntoView();
      cy.get('[cy-data="export-hotels-btn"]').should("be.visible");
    });
  });

  describe("Test pagination", () => {
    it("should render the pagination component", () => {
      cy.get('[aria-label="pagination navigation"]').scrollIntoView();
      cy.get('[aria-label="pagination navigation"]').should("be.visible");
    });
    it("should render the pagination view with the first page as the current page", () => {
      cy.get('[aria-label="pagination navigation"]').scrollIntoView();
      cy.get('[aria-label="pagination navigation"]')
        .find('[aria-current="true"]')
        .should("contain", "1");
    });

    it("should have the pagination with the correct number of pages", () => {
      cy.get('[aria-label="pagination navigation"]').scrollIntoView();
      cy.fixture("hotels/hotels").then((data) => {
        cy.get('[aria-label="pagination navigation"]')
          .find(".MuiPaginationItem-page")
          .should("have.length", data.result.pages);
      });
    });
    it("should display the second page after clicking on page 2 pagination", () => {
      cy.intercept("GET", `${baseURL}/administrators/hotels?q=&page=2`, {
        fixture: "hotels/hotels_page_2.json",
      }).as("getHotelsPage2");

      cy.get('[aria-label="pagination navigation"]').scrollIntoView();

      cy.get('[aria-label="Go to next page"]').click();
      cy.wait("@getHotelsPage2");
      cy.get('[aria-current="true"]').should("contain", "2");
      cy.fixture("hotels/hotels_page_2").then((data) => {
        cy.get('[data-testid="hotels-table"]')
          .find("tbody")
          .find("tr")
          .should("have.length", data.result.hotels.length);
        cy.url().should("include", "page=2");
      });
    });
    it("should display the first page if the user lick on previous button", () => {
      cy.get('[aria-label="pagination navigation"]').scrollIntoView();
      cy.get('[aria-label="Go to next page"]').click();
      cy.get('[aria-label="Go to previous page"]').click();
      cy.wait("@getHotels");
      cy.get('[aria-current="true"]').should("contain", "1");
      cy.fixture("hotels/hotels").then((data) => {
        cy.get('[data-testid="hotels-table"]')
          .find("tbody")
          .find("tr")
          .should("have.length", data.result.hotels.length);
        cy.url().should("include", "page=1");
      });
    });
  });

  describe("Test search box results", () => {
    before(() => {
      cy.intercept("GET", `${baseURL}/administrators/hotels?q=paris&page=1`, {
        fixture: "hotels/hotels_search.json",
      }).as("getHotelsSearchResult");
    });
    it("should render the correct result after a user search", () => {
      cy.get('[cy-data="hotels-search-box"]').type("paris");
      //wait for the hotels response
      cy.wait("@getHotelsSearchResult");
      cy.fixture("hotels/hotels_search").then((data) => {
        cy.get('[data-testid="hotels-table"]')
          .find("tbody")
          .find("tr")
          .should("have.length", data.result.hotels.length);
      });
      cy.url().should("include", "q=paris&page=1");
    });
  });
});
