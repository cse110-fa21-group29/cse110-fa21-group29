/**
 * Tests out the functionality of loading in web components and navigating to different pages
 */

describe('E2E Testing loading web components and navigating pages', () => {
    beforeAll(async () => {
        await page.goto('https://dev.yummyrecipesapp.com/');
    });

    it('Check we land on home page', async () => {
        const homePage = await page.$$('#content > home-page');
        expect(homePage.length).toBe(1);
    }, 2500);
});
