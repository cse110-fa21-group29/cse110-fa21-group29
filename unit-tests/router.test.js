/**
 * @jest-environment jsdom
 */
const router = require("../source/core/routing/router.js");

/**
 * All loadRoute Unit Tests (no return)
 */

/**
 * All navigateFromUrl Unit Tests (no return)
 */

/**
 * All getUrlFromRoute Unit Tests
 */

/**
 * All getRoutefromUrl Unit Tests
 */

test("getRoutefromUrl: testing home-page", () => {
  expect(router.getRoutefromUrl("")).toBe("home-page");
});

/**
 * All getParamsFromUrl Unit Tests (no return)
 */
