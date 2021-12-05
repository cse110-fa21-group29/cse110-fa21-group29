/**
 * Tests out the functionality of loading in web components and navigating to different pages
 */

describe('E2E Testing loading web components and navigating pages', () => {
    beforeAll(async () => {
        await page.goto('https://dev.yummyrecipesapp.com/');
    });

    /**
     * @summary Land Home Page
     * Test to see we land on home page
     */
    it('Land on home page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // get the home page
        const homePage = await page.$$('#content > home-page');

        expect(homePage.length).toBe(1);
    }, 7500);

    /**
     * @summary Recipe Details Page
     * Test to see if we go to recipe details page
     */
    it('Moving to recipe detail page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // get the shadow root of the home page
        const homePage = await page.waitForSelector('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        
        // click on a recipe card
        const recipe = await shadowRoot.$('common-recipe-card');
        recipe.click();

        // wait for the page to load then get the recipe-details page
        await new Promise((r) => setTimeout(r, 2000));

        const recipeDetailsPage = await page.$$('#content > recipe-details');

        expect(recipeDetailsPage.length).toBe(1);
    }, 7500);

    /**
     * @summary Hands-Free Mode Page
     * Test to see if we go to hands free page
     */
     it('Moving to hands-free mode page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // click on the hands-free mode button
        const recipeDetails = await page.$('#content > recipe-details');
        const shadowRoot = await recipeDetails.getProperty('shadowRoot');
        const homePageButton = await shadowRoot.$('#hands-free-button');
        homePageButton.click();

        // wait for the page to load then get the recipe-details page
        await new Promise((r) => setTimeout(r, 2000));

        const handsFreeModePage = await page.$$('#content > hands-free');

        expect(handsFreeModePage.length).toBe(1);
    }, 7500);
});