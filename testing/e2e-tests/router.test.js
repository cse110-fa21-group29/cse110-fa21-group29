/**
 * Tests out the functionality of loading in web components and navigating to different pages
 */

describe('E2E Testing loading web components and navigating pages', () => {
    beforeAll(async () => {
        await page.goto('https://dev.yummyrecipesapp.com/');
    });

    it('Check we land on home page', async () => {
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const protein = await shadowRoot.$('#recipe-card-section-1');
        
        console.log(protein);
    }, 2500);
});
