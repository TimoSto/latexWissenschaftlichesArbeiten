
export function ClickOnCard(n) {
    cy.get('.tilesContainer').find('.v-card').eq(n).click();
}