/**
 * Tests out the functionality of loading in web components and navigating to different pages
 */

describe('E2E Testing loading web components and navigating pages', () => {
    beforeAll(async () => {
        await page.goto('https://dev.yummyrecipesapp.com/');
        await new Promise((r) => setTimeout(r, 2000));
    });

    /**
     * Test to see we land on home page
     */
    it('Check we land on home page', async () => {
        // get the home page
        const homePage = await page.$$('#content > home-page');

        expect(homePage.length).toBe(1);
    }, 2500);

    /**
     * Test to see if we go to recipe-details page
     */
    it('Check if we move to recipe-detail page', async () => {
        // get the shadow root of the home page
        let homePage = await page.waitForSelector('home-page');
        let shadowRoot = await homePage.getProperty('shadowRoot');
        
        // click on a recipe card
        let recipe = await shadowRoot.$('common-recipe-card');
        recipe.click();

        // wait for the page to load then get the recipe-details page
        await new Promise((r) => setTimeout(r, 1000));
        let recipeDetailsPage = await page.$$('recipe-details');

        expect(recipeDetailsPage.length).toBe(1);
    }, 2500);
});