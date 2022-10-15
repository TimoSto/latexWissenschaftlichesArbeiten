
export function ClickHomeBtn() {
    cy.get('header:first').find('.v-btn[title="Startseite"]').click();
}