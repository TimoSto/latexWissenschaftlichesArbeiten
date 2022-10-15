
export function AssertTopAppBarHasText(text) {
    cy.get('header:first').find('.v-toolbar__title').should('have.text', text)
}