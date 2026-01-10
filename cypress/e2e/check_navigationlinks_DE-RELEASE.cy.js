describe('Navigation Links Test', () => {
  it('should check all navigation links', () => {

    // Seite mit Timeout laden
    cy.visit('https://de.cwcloudpartner.com/de-release/webapps/#login', {
      timeout: 30000
    });

    // Warten bis Navigation sichtbar ist
    cy.get('nav', { timeout: 30000 }).should('be.visible');

    // Alle Links durchklicken
    cy.get('nav a').each(($link) => {
      const text = $link.text().trim();

      cy.wrap($link).click({ force: true });

      // Warten bis die neue Seite aufgebaut ist
      cy.get('body', { timeout: 30000 }).should('be.visible');

      // Optional: prüfen, ob URL sich geändert hat
      cy.location('href').should('include', '#');

      cy.go('back');

      // Wieder warten, bis Navigation sichtbar ist
      cy.get('nav', { timeout: 30000 }).should('be.visible');
    });
  });
});
