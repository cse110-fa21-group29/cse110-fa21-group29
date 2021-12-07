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
        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // get the home page
        const homePage = await page.$$('#content > home-page');

        expect(homePage.length).toBe(1);
    }, 7500);

    /**
     * @summary Recipe Details Page
     * Test to see if we go to recipe details page from home page
     */
    it('Moving to recipe detail page', async () => {
        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // click on a recipe card on the home page
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const recipe = await shadowRoot.$('common-recipe-card');
        recipe.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        const recipeDetailsPage = await page.$$('#content > recipe-details');

        expect(recipeDetailsPage.length).toBe(1);
    }, 7500);

    /**
     * @summary Existing Contribute Page
     * Test to see if we go to the existing contribute page
     */
     it('Moving to existing contribute page', async () => {
        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // click on the edit button
        const recipeDetails = await page.$('#content > recipe-details');
        const shadowRoot = await recipeDetails.getProperty('shadowRoot');
        const editButton = await shadowRoot.$('#edit-button');
        editButton.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // get the contribute page
        const contributePage = await page.$$('#content > recipe-contribute');

        expect(contributePage.length).toBe(1);
    }, 7500);

    /**
     * @summary Back Home Page
     * Test to see if we go back to the home page
     */
     it('Moving back to home page', async () => {
        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // click on the home page nav bar button
        const navBar = await page.$('body > header > common-nav-bar');
        const shadowRoot = await navBar.getProperty('shadowRoot');
        const homePageButton = await shadowRoot.$('#home-page-link');
        homePageButton.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load
        
        // get the home page
        const homePage = await page.$$('#content > home-page');

        expect(homePage.length).toBe(1);
    }, 7500);

    /**
     * @summary New Contribute Page
     * Test to see if we go to the new contribute page
     */
     it('Moving to new contribute page', async () => {
        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // click on the contribute nav bar button
        const navBar = await page.$('body > header > common-nav-bar');
        const shadowRoot = await navBar.getProperty('shadowRoot');
        const contributePageButton = await shadowRoot.$('#nav-bar > a:nth-child(4)');
        contributePageButton.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // get the contribute page
        const contributePage = await page.$$('#content > recipe-contribute');

        expect(contributePage.length).toBe(1);
    }, 7500);

    /**
     * @summary Search Page
     * Test to see if we go to the search page
     */
     it('Moving to search page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // click on the search nav bar button
        const navBar = await page.$('body > header > common-nav-bar');
        const shadowRoot = await navBar.getProperty('shadowRoot');
        const searchPageButton = await shadowRoot.$('#search-button');
        searchPageButton.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        // get the search page
        const searchPage = await page.$$('#content > recipe-search');

        expect(searchPage.length).toBe(1);
    }, 7500);

    /**
     * @summary Recipe Details Page
     * Test to see if we go to recipe details page from search page
     */
     it('Moving to recipe detail page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // click on a recipe card on search page
        const recipeSearch = await page.$('#content > recipe-search');
        const shadowRoot = await recipeSearch.getProperty('shadowRoot');
        const recipeCard = await shadowRoot.$('#recipe-card-grid > common-recipe-card:nth-child(1)');
        recipeCard.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        const recipeDetailsPage = await page.$$('#content > recipe-details');

        expect(recipeDetailsPage.length).toBe(1);
    }, 7500);

    /**
     * @summary Cooking-Mode Page
     * Test to see if we go to hands free page
     */
     it('Moving to cooking-mode page', async () => {
        await new Promise((r) => setTimeout(r, 2000));

        // click on the cooking-mode button
        const recipeDetails = await page.$('#content > recipe-details');
        const shadowRoot = await recipeDetails.getProperty('shadowRoot');
        const cookingModeButton = await shadowRoot.$('#cooking-mode-button');
        cookingModeButton.click();

        await new Promise((r) => setTimeout(r, 2000)); // wait for the page to load

        const cookingModePage = await page.$$('#content > cooking-mode');

        expect(cookingModePage.length).toBe(1);
    }, 7500);
});