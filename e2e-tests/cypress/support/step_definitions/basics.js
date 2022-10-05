
Given('die App wurde mit dem Hash {string} aufgerufen', (hash) => {
    cy.visit('http://localhost:8080/' + hash)
})