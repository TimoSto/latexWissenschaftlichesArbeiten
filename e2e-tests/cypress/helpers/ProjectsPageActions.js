
export function ClickOnProjectDelete() {
    cy.get('#projectOverviewPage').find('header').find('.v-btn[title="Projekt löschen"]').click();
}
