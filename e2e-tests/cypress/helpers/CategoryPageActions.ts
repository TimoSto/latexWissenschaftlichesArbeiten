/// <reference types="cypress" />

export function TypeInField(label: string, text: string) {
    cy.get('.edit-area').find('td').contains(label).parent().find('input[type="string"]').type(text);
    cy.get('.edit-area').find('td').contains(label).click();
}

export function ClearField(label: string) {
    cy.get('.edit-area').find('td').contains(label).parent().find('input[type="string"]').clear();
    cy.get('.edit-area').find('td').contains(label).click();
}
