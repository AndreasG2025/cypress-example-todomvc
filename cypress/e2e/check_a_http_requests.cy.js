describe('Link-Check für alle <a>-Elemente', () => {
  it('sollte alle Links per HTTP prüfen', () => {

    const baseUrl = 'https://de.cwcloudpartner.com/de-release/webapps/#login';

    cy.visit(baseUrl, { timeout: 30000 });

    cy.get('a').then(($links) => {
      const hrefs = [...$links]
        .map(link => link.getAttribute('href'))
        .filter(href =>
          href &&
          !href.startsWith('#') &&
          !href.startsWith('javascript') &&
          !href.startsWith('mailto') &&
          !href.startsWith('tel')
        );

      hrefs.forEach((href) => {

        // Absolute oder relative URL korrekt auflösen
        const url = href.startsWith('http')
          ? href
          : new URL(href, baseUrl).href;

        cy.request({
          url,
          failOnStatusCode: false   // wir prüfen selbst
        }).then((response) => {
          expect(response.status).to.be.oneOf([200, 301, 302]);
        });

      });
    });
  });
});
