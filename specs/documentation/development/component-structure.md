# CSE 110 - Red Pandas - Component Structure

[Back to Table of Contents](README.md)

## Overview
This document will cover the file/folder structure of a component, along with how to add a new component.

### Topics covered
* Component structure
* Adding a new component

## Component structure
A _component_ is a section of the page. It is NOT a full HTML page, but instead a WebComponent that gets injected into the `index.html` file via the router (see [router explanation](router-explanation.md)).

Each component has the following structure (for example, let's use the recipe details component):
* `components/recipe-details/`
  * `components/recipe-details/recipe-details.html`
  * `components/recipe-details/recipe-details.css`
  * `components/recipe-details/recipe-details.js`

## Adding a new component
To add a new component to the site, follow the steps below (for example, let's create the meal planner component):
1. Make a new empty folder called `components/meal-planner/`.
2. Copy the files from the component template (`components/TEMPLATE/`) into your folder and rename them to `meal-planner.html`, `meal-planner.css`, `meal-planner.js`.
3. Inside the `.html` file, rename the CSS `<link>` tag at the top of the page to correctly point to your component's CSS file (i.e. `/components/meal-planner/meal-planner.css`).
   * All HTML for the component will be included in this file.
   * IMPORTANT: Please do NOT include `<html>, <head>, <body>` tags inside the HTML. _This is a section of the HTML, not the entire page._
4. Inside the `.css` file, please insert all _component-specific CSS_.
   * Global styling should be placed in `source/styles.css`.
5. Place all static files (i.e. images, etc) in the `static/meal-planner/` folder.
   * Reference these files via _absolute URLs_, like `/static/meal-planner/myimg.jpg`.
6. Inside the `.js` file, rename `component-name` and `ComponentName` to your component (i.e. `meal-planner` and `MealPlanner`).
   * The starter JS in this file creates a web component, ensures that your HTML is loaded correctly, and registers the component.
   * **If you want to run some JS immediately after the component has loaded:** Please place your code inside the `setupElement()` function.
   * **If you want to define a helper function for any reason:** Please define it INSIDE OF THE CLASS, and do not include `function`.
     * When calling the function, use `this.functionName()`.
   * **If you want to select anything in the DOM:** Use `this.shadowRoot.getElementById()` instead of `document.getElementById()`. Using `document` will not work here.
     * If you want to select on a class, element name, type, etc. (anything besides ID), please use `this.shadowRoot.querySelector()` or `this.shadowRoot.querySelectorAll()`. For some reason `this.shadowRoot` does not have any methods besides `getElementById()`.
7. Add a route in the `routePatterns` const at the top of the `core/routing/router.js` file.
  * The key is the name of the route (a unique string describing it).
  * The value is an object with the component name and the URL.
  * Please begin the URL with `#/` and put `_` anywhere a parameter in the URL occurs.
  * Example:
    ```javascript
    const routePatterns = [
      ...
      "meal-planner": {
        component: "meal-planner",
        url: "#/recipes/meal-planner",
      },
    ];
    ```
8. Lastly, please add your component's JS file in the `source/index.html`.
  * You'll see a bunch of `<script>` tags under the comment `<!-- Component JS -->`, so copy one of them and change the path to your component's JS file.
