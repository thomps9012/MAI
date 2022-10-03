export { }
describe("Mobile Nav", () => {
    beforeEach(() => {
        cy.viewport(796, 628)
        cy.visit('/');
    });
    it("tests nav hidden on page load", () => {
        cy.get('.mobile-nav-hide').should("not.be.visible")
    })
    it("tests nav show on menu click", () => {
        cy.get('nav').contains('Menu').click()
        cy.get('.mobile-nav-show').should('not.be.hidden')
    })
    context("Sign In", () => {
        beforeEach(() => {
            cy.get('footer').contains('Sign In').click()
            cy.url().should("contain", "/sign_in")
        })
        it("tests sign in with username", () => {
            cy.get('.username').type('test_user_7')
            cy.get('.pw').type('password123!')
            cy.get('.button').click()
        })
        it("tests sign in with email", () => {
            cy.get('.email').type('cmo@norainc.org')
            cy.get('.pw').type('password123!')
            cy.get('.button').click()
        })
        it("tests sign in with both email and username", () => {
            cy.get('.username').type('test_user_7')
            cy.get('.email').type('cmo@norainc.org')
            cy.get('.pw').type('password123!')
            cy.get('.button').click()
        })
    })
    it("tests user sign up", () => {
        cy.get('footer').contains('Sign Up').click()
        cy.url().should("contain", "/sign_up")
    })
});