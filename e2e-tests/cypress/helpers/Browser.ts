
export let BaseURL = Cypress.env('systemBaseUri') ? Cypress.env('systemBaseUri') : 'http://localhost:8080';

export function VisitUrl(url) {
    cy.visit(BaseURL + url, {
        onBeforeLoad (win) {
            // DOES NOT WORK
            // Uncaught TypeError: Cannot assign to read only property
            // 'language' of object '[object Navigator]'
            // win.navigator.language = 'Klingon'

            // instead we need to define a property like this
            Object.defineProperty(win.navigator, 'language', {
                value: 'de'
            })
        }
    });
}
