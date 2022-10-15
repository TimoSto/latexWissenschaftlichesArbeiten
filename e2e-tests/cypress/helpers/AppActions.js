
export function ClickHomeBtn() {
    cy.get('header:first').find('.v-btn[title="Startseite"]').click();
}

export function ClickSidebarItem(n) {
    cy.get('nav').find('.v-list-item').eq(n).click();
}

export function ClickSidebarInfo() {
    cy.get('nav').find('.v-bottom-navigation').find('button').click();
}
