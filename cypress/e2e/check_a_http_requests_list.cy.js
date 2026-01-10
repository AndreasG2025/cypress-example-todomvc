describe('Link-Check für mehrere Base-URLs', () => {

  const baseUrls = [
    'https://de.cwcloudpartner.com/de-release/webapps/#login',
    'https://coffee-cart.netlify.app/',
    'https://www.letskodeit.com/practice'
  ];

  baseUrls.forEach((baseUrl) => {

    it(`prüft alle <a>-Links auf Seite: ${baseUrl}`, () => {

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

          // Relative oder absolute URL korrekt auflösen
          const url = href.startsWith('http')
            ? href
            : new URL(href, baseUrl).href;

          cy.request({
            url,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302]);
          });

        });
      });
    });

  });
});
