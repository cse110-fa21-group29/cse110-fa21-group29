/**
 * @jest-environment jsdom
 */
const router = require("../../source/core/routing/router.js");

/**
 * All loadRoute - No Unit Tests (edits DOM)
 */

/**
 * All navigateFromUrl Unit - No Unit Tests (edits History API)
 */

/**
 * All getUrlFromRoute Unit Tests
 */

describe('Tests getUrlFromRoute from routing.js', () => {
  test("getUrlFromRoute: testing '#/' returns 'home-page'", () => {
    expect(router.getUrlFromRoute("home-page")).toBe("#/");
  });
  
  test("getUrlFromRoute: testing '#/' returns 'home-page' '[]'", () => {
    expect(router.getUrlFromRoute("home-page", [])).toBe("#/");
  });
});

/**
 * All getRoutefromUrl Unit Tests
 */

describe('Tests getRoutefromUrl from routing.js', () => {
  test("getRoutefromUrl: testing home-page '#/'", () => {
    expect(router.getRoutefromUrl("#/")).toBe("home-page");
  });
  
  test("getRoutefromUrl: testing home-page ''", () => {
    expect(router.getRoutefromUrl("")).toBe("home-page");
  });
  
  test("getRoutefromUrl: testing recipe-details '#/recipes/3'", () => {
    expect(router.getRoutefromUrl("#/recipes/3")).toBe("recipe-details");
  });
  
  test("getRoutefromUrl: testing recipe-contribute-add '#/recipes/contribute'", () => {
    expect(router.getRoutefromUrl("#/recipes/contribute")).toBe("recipe-contribute-add");
  });
  
  test("getRoutefromUrl: testing recipe-contribute-edit '#/recipes/3/edit'", () => {
    expect(router.getRoutefromUrl("#/recipes/3/edit")).toBe("recipe-contribute-edit");
  });
  
  test("getRoutefromUrl: testing meal-planner '#/recipes/meal-planner'", () => {
    expect(router.getRoutefromUrl("#/recipes/meal-planner")).toBe("meal-planner");
  });
  
  test("getRoutefromUrl: testing about-us '#/about-us'", () => {
    expect(router.getRoutefromUrl("#/about-us")).toBe("about-us");
  });
  
  test("getRoutefromUrl: testing hands-free '#/hands-free'", () => {
    expect(router.getRoutefromUrl("#/hands-free")).toBe("hands-free");
  });
  
  test("getRoutefromUrl: testing recipe-search '#/recipes/search'", () => {
    expect(router.getRoutefromUrl("#/recipes/search")).toBe("recipe-search");
  });
});

/**
 * All getParamsFromUrl Unit Tests
 */
