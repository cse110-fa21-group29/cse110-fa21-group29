/**
 * @jest-environment jsdom
 */
const router = require("../../source/core/routing/router.js");

/**
 * All loadRoute (edits DOM)
 */

test('loadRoute: testing ', () => {
  // Set up our document body
  document.body.innerHTML =
    '<div id="content">' +
    '</div>';

  router.loadRoute("home-page", []);
  console.log(document.querySelector('div'))
});

/**
 * All navigateFromUrl Unit - No Unit Tests (edits History API)
 */

/**
 * All getUrlFromRoute Unit Tests
 */

describe('Tests getUrlFromRoute from routing.js', () => {
  test("getUrlFromRoute: testing 'home-page' returns '#/'", () => {
    expect(router.getUrlFromRoute("home-page")).toBe("#/");
  });
  
  test("getUrlFromRoute: testing 'home-page' '[]' returns '#/'", () => {
    expect(router.getUrlFromRoute("home-page", [])).toBe("#/");
  });

  test("getUrlFromRoute: testing 'recipe-details' '[3]' returns '#/recipes/3'", () => {
    expect(router.getUrlFromRoute('recipe-details', [3])).toBe("#/recipes/3");
  });

  test("getUrlFromRoute: testing 'recipe-contribute-add' '[]' returns '#/recipes/contribute'", () => {
    expect(router.getUrlFromRoute("recipe-contribute-add", [])).toBe("#/recipes/contribute");
  });

  test("getUrlFromRoute: testing 'recipe-contribute-edit' '[3]' returns '#/recipes/3/edit'", () => {
    expect(router.getUrlFromRoute("recipe-contribute-edit", [3])).toBe("#/recipes/3/edit");
  });

  test("getUrlFromRoute: testing 'meal-planner' '[]' returns '#/recipes/meal-planner'", () => {
    expect(router.getUrlFromRoute("meal-planner", [])).toBe("#/recipes/meal-planner");
  });

  test("getUrlFromRoute: testing 'about-us' '[]' returns '#/about-us'", () => {
    expect(router.getUrlFromRoute("about-us", [])).toBe("#/about-us");
  });

  test("getUrlFromRoute: testing 'hands-free' '[]' returns '#/hands-free'", () => {
    expect(router.getUrlFromRoute("hands-free", [])).toBe("#/hands-free");
  });

  test("getUrlFromRoute: testing 'recipe-search' '[]' returns '#/recipes/search'", () => {
    expect(router.getUrlFromRoute("recipe-search", [])).toBe("#/recipes/search");
  });
});

/**
 * All getRoutefromUrl Unit Tests
 */

describe('Tests getRoutefromUrl from routing.js', () => {
  test("getRoutefromUrl: testing '#/' returns 'home-page'", () => {
    expect(router.getRoutefromUrl("#/")).toBe("home-page");
  });
  
  test("getRoutefromUrl: testing '' returns 'home-page'", () => {
    expect(router.getRoutefromUrl("")).toBe("home-page");
  });
  
  test("getRoutefromUrl: testing '#/recipes/3' returns 'recipe-details'", () => {
    expect(router.getRoutefromUrl("#/recipes/3")).toBe("recipe-details");
  });
  
  test("getRoutefromUrl: testing '#/recipes/contribute' returns 'recipe-contribute-add'", () => {
    expect(router.getRoutefromUrl("#/recipes/contribute")).toBe("recipe-contribute-add");
  });
  
  test("getRoutefromUrl: testing '#/recipes/3/edit' returns 'recipe-contribute-edit'", () => {
    expect(router.getRoutefromUrl("#/recipes/3/edit")).toBe("recipe-contribute-edit");
  });
  
  test("getRoutefromUrl: testing '#/recipes/meal-planner' returns 'meal-planner'", () => {
    expect(router.getRoutefromUrl("#/recipes/meal-planner")).toBe("meal-planner");
  });
  
  test("getRoutefromUrl: testing '#/about-us' returns 'about-us'", () => {
    expect(router.getRoutefromUrl("#/about-us")).toBe("about-us");
  });
  
  test("getRoutefromUrl: testing '#/hands-free' returns 'hands-free'", () => {
    expect(router.getRoutefromUrl("#/hands-free")).toBe("hands-free");
  });
  
  test("getRoutefromUrl: testing '#/recipes/search' returns 'recipe-search'", () => {
    expect(router.getRoutefromUrl("#/recipes/search")).toBe("recipe-search");
  });
});

/**
 * All getParamsFromUrl Unit Tests
 */

describe('Tests getParamsFromUrl from routing.js', () => {
  test("getParamsFromUrl: testing '#/' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '' returns '[]'", () => {
    expect(router.getParamsFromUrl("")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '#/recipes/3' returns '['3']'", () => {
    expect(router.getParamsFromUrl("#/recipes/3")).toStrictEqual(['3']);
  });
  
  test("getParamsFromUrl: testing '#/recipes/contribute' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/recipes/contribute")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '#/recipes/3/edit' returns '['3']'", () => {
    expect(router.getParamsFromUrl("#/recipes/3/edit")).toStrictEqual(['3']);
  });
  
  test("getParamsFromUrl: testing '#/recipes/meal-planner' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/recipes/meal-planner")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '#/about-us' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/about-us")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '#/hands-free' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/hands-free")).toStrictEqual([]);
  });
  
  test("getParamsFromUrl: testing '#/recipes/search' returns '[]'", () => {
    expect(router.getParamsFromUrl("#/recipes/search")).toStrictEqual([]);
  });
});