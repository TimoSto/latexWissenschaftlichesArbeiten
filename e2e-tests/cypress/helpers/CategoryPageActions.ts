/// <reference types="cypress" />

export function TypeInField(label: string, text: string) {
    cy.get('.edit-area').find('td').contains(label).parent().find('input[type="string"]').type(text);
    cy.get('.edit-area').find('td').contains(label).click();
}

export function ClearField(label: string) {
    cy.get('.edit-area').find('td').contains(label).parent().find('input[type="string"]').clear();
    cy.get('.edit-area').find('td').contains(label).click();
}

export function TypeInNthFieldWithName(name: string, n: number, text: string) {
    cy.get('.edit-area').find(`input[name="${name}"]`).eq(n).type(text);
    cy.get('.edit-area').find(`input[name="${name}"]`).eq(n).parent().click();
}

export function ClearNthFieldWithName(name: string, n: number) {
    cy.get('.edit-area').find(`input[name="${name}"]`).eq(n).clear();
    cy.get('.edit-area').find(`input[name="${name}"]`).eq(n).parent().click();
}
