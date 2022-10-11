export {};
context("Administrative Sign In", () => {
  cy.visit("/sign_in");
  cy.get("").type("");
  cy.get("").type("");
  cy.get("").contains("").click();
  beforeEach(() => {
    cy.visit("/admin/interviews");
    describe("Checks for All Interview Results Rendering", () => {});
    describe("Gather's Details for a Specific Interview", () => {});
  });
});
