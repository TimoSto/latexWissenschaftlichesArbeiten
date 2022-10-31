
export function AssertPage1ContainsElements(n) {
    cy.get('#page-1').find('div').find('*').should('have.length', n)
}

export function AssertPage1Contains(id) {
    cy.get('#page-1').find(id).should('exist')
}

export function AssertOverviewTitleIs(t) {
    cy.get('#page-1').find('header').find('.v-toolbar__title').should('have.text', t)
}

export function AssertBibModelForTypeIs(type, model) {
    cy.get('#page-1').find('td').contains(type).parent().find('td').eq(2).should('have.html', model)
}

export function AssertCitaviCategoryForTypeIs(type: string, citavi: string) {
    cy.get('#page-1').find('td').contains(type).parent().find('td').eq(1).should('have.text', citavi)
}

export function AssertCategoryForEntryIs(entry: string, category: string) {
    cy.get('#page-1').find('td').contains(entry).parent().find('td').eq(1).should('have.text', category)
}

export function EditAreaIsVisible() {
    cy.get('.edit-area').should('be.visible');
}
