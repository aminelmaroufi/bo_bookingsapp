import ActionTypes from "../../src/utils/actionTypes";
import { baseURL } from "../../src/config";
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: `${baseURL}/auth/signin?scope=admin`,
    body: { username: "admin@admin.com", password: "Azerty123@@" },
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
