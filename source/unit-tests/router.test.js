/**
 * @jest-environment jsdom
 */
const router = require("../core/routing/router.js");

test("getRoutefromUrl: testing home-page", () => {
  expect(router.getRoutefromUrl("")).toBe("home-page");
});
