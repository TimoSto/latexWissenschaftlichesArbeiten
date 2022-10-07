
Given('die App wurde mit dem Hash {string} aufgerufen', (hash) => {
    cy.visit('http://localhost:8080/' + hash, {
        onBeforeLoad (win) {

            // instead we need to define a property like this
            Object.defineProperty(win.navigator, 'language', {
                value: 'de'
            })
        }
    })
});

Then('wird die Startseite mit {int} Cards angezeigt', ()=> {
    cy.get('.v-card').should('have.length', 4)
});

Then('sind {int} btns in der toolbar', (n)=> {
    cy.get('main').find('header').find('.v-btn').should('have.length', n)
})

Then('existiert ein Projekt mit dem Namen {string}', (name) => {
    cy.get('nav').find('.v-list-item').contains(name).should('exist').should('have.length', 1)
})

When('zum Projekt {string} gewechselt wird', (name) => {
    cy.get('nav').find('.v-list-item').contains(name).click();
})

Then('ist der Titel des mittleren Bereiches {string}', (name) => {
    cy.get('main').find('#pages').find('header').contains(name).should('exist').should('be.visible')
})

When('auf das Element {string} geklickt wird', selector => {
    cy.get('body').find(selector).click();
})