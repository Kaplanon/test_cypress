describe('Checking Products on [Matching Engine] website Test', () => {

    // Step 1: Visit the website
    it('Visits the Matching Engine website and navigates to the Repertoire Management Module', () => {
        // Visit the target website
        cy.visit('https://www.matchingengine.com/');

        cy.get('#burger').then(($burger) => {
            if ($burger.length) {
                // If the element exists, click on it
                cy.wrap($burger).click();
            } else {
                // Log a message if the element doesn't exist
                cy.log('Burger element not found');
            }
        });

        // Step 2: Expand 'Modules' in the header section
        cy.get('a.navbar-link')
            .contains('Modules') // Find the 'Modules' text and click to expand the dropdown
            .click();

        // Step 3: Click 'Repertoire Management Module' from the menu
        cy.contains('Repertoire Management Module') // Find the specific module in the dropdown
            .click();

        // Step 4: Scroll to the ‘Additional Features’ section
        cy.contains('Additional Features') // Ensure 'Additional Features' section is present
            .scrollIntoView();

        // Step 5: Click 'Products Supported'
        cy.contains('a', 'Products Supported') // Find the 'Products Supported' section link/button
            .click();


        // Step 6: Assert the list of supported products under the heading
        cy.contains('div', 'There are several types of Product Supported:') // Locate the heading text
            .should('be.visible') // Assert that the heading is visible
            .find('li')
            .then(($lis) => {
                const actualProducts = $lis.toArray().map(li => Cypress.$(li).text().trim());
                const expectedProducts = ['Cue Sheet / AV Work',
                    'Recording',
                    'Bundle',
                    'Advertisement']
                for (const product of expectedProducts) {
                    const containsProduct = actualProducts.some(text => text.includes(product));
                    if (!containsProduct) {
                        const message = `The Product '${product}' was not found in expected products: [${expectedProducts.join(',')}]`;
                        cy.log(message);
                        // Assert that the substring is present in the array with a failure message
                        expect(containsProduct, message).to.be.true;
                    }
                }
                cy.log(`All products were found`);

            });
    });

});