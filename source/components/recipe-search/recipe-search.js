import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";
import { Database } from "/core/database/database.js";

class RecipeSearch extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-search/recipe-search.html";
  }

  async setupElement() {
    let paramString = window.location.href.split("?")[1];
    let queryString = new URLSearchParams(paramString);
    let paramArray = [];
    for (let p of queryString) {
      paramArray.push(p);
    }
    console.log(paramArray);

    this.shadowRoot
      .getElementById("filter-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickFilter();
      });
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickSearch();
      });
    this.shadowRoot
      .getElementById("close-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickClose();
      });
    this.shadowRoot
      .getElementById("submit-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickSubmit();
      });
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickReset();
      });
  }

  // put button actions here, for search and submit button, they both have submit action now, for clear button,
  // it has a clear action, feel free to change them by change input type to button
  clickFilter() {
    this.shadowRoot.getElementById("filter-form").style.display = "initial";
  }

  async clickSearch() {
    const database = new Database();

    let paramString = window.location.href.split("?")[1];
    let queryString = new URLSearchParams(paramString);

    let paramArray = [];
    for (let p of queryString) {
      paramArray.push(p);
    }

    let searchRecipe = await database.searchByName(paramArray);

    // Clear out recipe card grid before we append new cards
    this.shadowRoot.getElementById("recipe-card-grid").innerHTML = "";

    for (const recipe of searchRecipe) {
      this.shadowRoot
        .getElementById("recipe-card-grid")
        .appendChild(this.createRecipeCard(recipe.recipe, recipe.index));
    }
  }
  clickClose() {
    this.shadowRoot.getElementById("filter-form").style.display = "none";
  }
  clickSubmit() {}
  clickReset() {}

  /**
   * Creates recipe card with information and routing.
   *
   * @param {Object} recipe - Object that contains recipe data.
   * @param {number} index - Index of recipe card in database to set route.
   * @returns {Object} Generated recipe card.
   */
  createRecipeCard(recipe, index) {
    const card = document.createElement("common-recipe-card");
    card.recipeData = recipe;
    card.addEventListener("click", () => {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "recipe-details",
          params: [index],
        },
        bubbles: true,
        composed: true,
      });
      card.dispatchEvent(routerEvent);
    });
    return card;
  }
}

customElements.define("recipe-search", RecipeSearch);
