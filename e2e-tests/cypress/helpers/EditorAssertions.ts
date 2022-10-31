
export function AssertEditorSaveBtnIsEnabled(enabled: boolean) {
    cy.get('.edit-area').find('.v-btn[title="Speichern"]').should(enabled ? 'be.enabled' : 'be.disabled')
}

export function AssertEditorIsNotShown() {
    cy.get('edit.area').should('not.exist');
}
