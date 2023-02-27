export {};
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      logout(): Chainable<void>;
      goToHotels(): Chainable<void>;
    }
  }
}
