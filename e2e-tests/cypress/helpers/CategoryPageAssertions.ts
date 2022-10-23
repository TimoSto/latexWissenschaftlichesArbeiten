/// <reference types="cypress" />

export function AssertBibModelIs(text: string) {
    cy.get('.edit-area').find('.v-expansion-panel').eq(1).find('p').should('have.html', text)
}

export function AssertInitialNameIs(text: string) {
    cy.get('.edit-area').find('td').contains('Bezeichnung').parent().find('td').eq(1).should('have.text', text);
}
