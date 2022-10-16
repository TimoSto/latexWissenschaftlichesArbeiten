
export function ClickHomeBtn() {
    cy.get('header:first').find('.v-btn[title="Startseite"]').click();
}

export function ClickSidebarItem(n) {
    cy.get('nav').find('.v-list-item').eq(n).click();
}

export function ClickSidebarInfo() {
    cy.get('nav').find('.v-bottom-navigation').find('button').click();
}

export function ClickSidebarAdd() {
    cy.get('nav').find('.v-app-bar').find('button').click();
}

export function TypeInNew(v) {
    cy.get('#newDialog').should('be.visible').find('.v-text-field').find('input').type(v);
}

export function ClickOverlay() {
    cy.get('.v-overlay').click({force: true});
}
