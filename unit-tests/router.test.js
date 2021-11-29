/**
 * @jest-environment jsdom
 */
const router = require("../source/core/routing/router.js");

/**
 * All navigateFromUrl Unit Tests
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
 * All getParamsFromUrl Unit Tests
 */
