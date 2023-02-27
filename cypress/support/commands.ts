import ActionTypes from "../../src/utils/actionTypes";
import { baseURL } from "../../src/config";
/// <reference types="cypress" />

Cypress.Commands.add("login", () => {
  cy.fixture("admin").then((admin) => {
    cy.session((admin.email, admin.password), () => {
      cy.request({
        method: "POST",
        url: `${baseURL}/auth/signin?scope=admin`,
        body: { username: admin.email, password: admin.password },
      }).then((response) => {
        expect(response.status).to.eq(200);

        const user = response.body.result.user;
        cy.clock();

        cy.window().then((win) => {
          if ((win as any).store) {
            (win as any).store.dispatch({
              type: ActionTypes.LOGIN_SUCCESS,
              payload: { user },
            });
          }
        });
        cy.tick(1000); // Wait for the store to update
        cy.clock().then((clock) => clock.restore());
      });
    });
  });
});

Cypress.Commands.add("logout", () => {
  cy.request({
    method: "POST",
    url: `${baseURL}/auth/signout`,
  }).then((response) => {
    expect(response.status).to.eq(200);

    cy.clock();

    cy.window().then((win) => {
      if ((win as any).store) {
        (win as any).store.dispatch({
          type: ActionTypes.LOGOUT_SUCCESS,
        });
      }
    });
    cy.tick(1000); // Wait for the store to update
    cy.clock().then((clock) => {
      clock.restore();
      cy.visit("/login");
    });
  });
});

Cypress.Commands.add("goToHotels", () => {
  cy.intercept("GET", `${baseURL}/administrators/hotels?q=&page=1`, {
    fixture: "hotels/hotels.json",
  }).as("getHotels");
  cy.login();
  cy.visit("/hotels");
  //wait for the hotels response
  cy.wait("@getHotels");
});
