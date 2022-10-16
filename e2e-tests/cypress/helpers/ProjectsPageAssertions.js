
export function AssertPage1ContainsElements(n) {
    cy.get('.page1').find('div').find('*').should('have.length', n)
}

export function AssertPage1Contains(id) {
    cy.get('.page1').find(id).should('exist')
}

export function AssertOverviewTitleIs(t) {
    cy.get('.page1').find('header').find('.v-toolbar__title').should('have.text', t)
}
