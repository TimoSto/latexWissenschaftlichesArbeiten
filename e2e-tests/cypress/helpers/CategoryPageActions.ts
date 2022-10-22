/// <reference types="cypress" />

export function TypeInNameField(text: string) {
    cy.get('.edit-area').find('td').contains('Neue Bezeichnung').parent().find('input[type="string"]').type(text);
}
