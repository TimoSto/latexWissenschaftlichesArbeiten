
export function ClickOnProjectDelete() {
    cy.get('#projectOverviewPage').find('header').find('.v-btn[title="Projekt löschen"]').click();
}
//TODO: den types-commentar aus den anderen dateien hier hin und dann auch ts?
export function ClickOnTableElement(t) {
    cy.get('#projectOverviewPage').find('td').contains(t).click();
}
