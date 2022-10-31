import {BaseURL} from "./Browser";

export function AssertTopAppBarHasText(text) {
    cy.get('header:first').find('.v-toolbar__title').should('have.text', text)
}

export function AssertNavIconIsDisabled() {
    cy.get('.v-app-bar__nav-icon').should('be.disabled')
}

export function AssertNavIconIsNotDisabled() {
    cy.get('.v-app-bar__nav-icon').should('not.be.disabled')
}

export function AssertSidebarClosed() {
    cy.get('.v-navigation-drawer').should('have.class', 'v-navigation-drawer--mini-variant')
}

export function AssertSidebarEmpty() {
    cy.get('.v-navigation-drawer__content').should('be.empty');
}

export function AssertSidebarNotEmpty() {
    cy.get('.v-navigation-drawer__content').should('not.be.empty');
}

export function AssertHomeBtnIsNotDisabled() {
    cy.get('header:first').find('.v-btn[title="Startseite"]').should('not.be.disabled')
}

export function AssertHomeBtnIsDisabled() {
    cy.get('header:first').find('.v-btn[title="Startseite"]').should('be.disabled')
}

export function AssertUrlHashIs(hash) {
    cy.url().then(url => {
        expect(url).to.eq(BaseURL + '/' + hash)
    })
}

export function AssertSidebarInfoBtnDisabled() {
    cy.get('nav').find('.v-bottom-navigation').find('button').should('be.disabled')
}

export function AssertSidebarInfoBtnNotDisabled() {
    cy.get('nav').find('.v-bottom-navigation').find('button').should('not.be.disabled')
}

export function AssertNewDialogIsOpen(title) {
    cy.get('#newDialog').should('be.visible').find('.v-card__title').should('have.text', title);
}

export function AssertNewDialogSaveEnabled(enabled) {
    cy.get('#newDialog').should('be.visible').find('.v-btn').contains('Speichern').parent().should(enabled ? 'not.be.disabled' : 'be.disabled');
}

export function AssertNewDialogValueIs(v) {
    cy.get('#newDialog').should('be.visible').find('.v-text-field').find('input').should('have.value', v);
}

export function AssertSidebarHasItems(n) {
    cy.get('nav').find('.v-list-item').should('have.length', n);
}

export function AssertInterruptDialogIsShown() {
    cy.get('#interruptDialog').should('be.visible');
}
