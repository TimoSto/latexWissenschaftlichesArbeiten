
export function AssertPage1ContainsElements(n) {
    cy.get('.page1').find('div').find('*').should('have.length', n)
}

export function AssertPage1Contains(id) {
    cy.get('.page1').find(id).should('exist')
}
