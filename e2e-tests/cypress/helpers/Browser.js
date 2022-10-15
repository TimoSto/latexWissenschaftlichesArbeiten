
export let BaseURL = 'http://localhost:8080';

export function VisitUrl(url) {
    cy.visit(BaseURL + url);
}
