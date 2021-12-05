/**
 * Test database functionality via e2e
 */

/**
 * check data on home-page
 */
describe('data on home-page', () => {
    beforeAll(async () => {
        await page.goto('https://dev.yummyrecipesapp.com/');
      });

    it('check if the recipe cards on home-page for high protein are correctly loaded', async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const numRecipes = await shadowRoot.$$eval(`#recipe-card-grid-1 > common-recipe-card`,(recipes) => {
            return recipes.length;
        });
        expect(numRecipes).toBe(20);
    }, 5000)

    it('check if the recipe cards on home-page for healthy are correctly loaded', async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const numRecipes = await shadowRoot.$$eval(`#recipe-card-grid-2 > common-recipe-card`,(recipes) => {
            return recipes.length;
        });
        expect(numRecipes).toBe(20);
    }, 5000)

    it('check if the recipe cards on home-page for vegan are correctly loaded', async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const numRecipes = await shadowRoot.$$eval(`#recipe-card-grid-3 > common-recipe-card`,(recipes) => {
            return recipes.length;
        });
        expect(numRecipes).toBe(20);
    }, 5000)

    it('check if the recipe cards on home-page for vegetarian are correctly loaded', async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const numRecipes = await shadowRoot.$$eval(`#recipe-card-grid-4 > common-recipe-card`,(recipes) => {
            return recipes.length;
        });
        expect(numRecipes).toBe(20);
    }, 5000)
 
    it('check if the recipe cards on home-page for gluten free are correctly loaded', async () => {
        await new Promise((r) => setTimeout(r, 2000));
        const homePage = await page.$('home-page');
        const shadowRoot = await homePage.getProperty('shadowRoot');
        const numRecipes = await shadowRoot.$$eval(`#recipe-card-grid-5 > common-recipe-card`,(recipes) => {
            return recipes.length;
        });
        expect(numRecipes).toBe(20);
    }, 5000)

})