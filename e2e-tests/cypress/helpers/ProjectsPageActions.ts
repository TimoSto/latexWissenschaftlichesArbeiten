
export function ClickOnProjectDelete() {
    cy.get('#projectOverviewPage').find('header').find('.v-btn').eq(1).click();
    cy.get('[title="Projekt löschen"]').click();
}
//TODO: den types-commentar aus den anderen dateien hier hin und dann auch ts?
export function ClickOnTableElement(t) {
    cy.get('#projectOverviewPage').should('be.visible').find('td').contains(t).click();
}

export function ClickOnNewType() {
    cy.get('#page-1').find('.v-btn[title="Neue Kategorie erstellen"]').click();
}

export function ClickOnNewEntry() {
    cy.get('#page-1').find('.v-btn[title="Neuen Eintrag erstellen"]').click();
}
