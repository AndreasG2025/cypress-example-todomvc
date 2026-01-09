describe('Navigation Links Test', () => {
    it('should check all navigation links', () => {
      // Besuche die Startseite der Website
      cy.visit('https://coffee-cart.netlify.app/');
  
      // Finde alle Navigationslinks
      cy.get('nav a').each(($link) => {
        // Extrahiere die URL des Links
        const url = $link.prop('href');
        
        // Überprüfe, ob der Link korrekt funktioniert
        cy.request(url).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });
