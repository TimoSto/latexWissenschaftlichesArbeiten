
export function AssertPage1ContainsElements(n) {
    cy.get('.page1').find('div').find('*').should('have.length', n)
}