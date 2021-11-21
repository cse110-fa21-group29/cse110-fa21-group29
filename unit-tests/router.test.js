/**
 * @jest-environment jsdom
 */
const router = require("../source/core/routing/router.js");

test("getRoutefromUrl: testing home-page", () => {
  expect(router.getRoutefromUrl("")).toBe("home-page");
});
