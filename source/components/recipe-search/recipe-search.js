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

    if (paramArray.length > 0) {
      this.populateForm();
      this.getSearchResults();
    }
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

  /**
   * Populates the query box and filters form based on URL parameters.
   */
  populateForm() {
    const paramString = window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(paramString);

    // Query
    if (searchParams.has("query")) {
      this.shadowRoot.getElementById("search-input").value =
        searchParams.get("query");
    }

    // Gluten free
    if (searchParams.get("glutenFree")) {
      this.shadowRoot.getElementById("input-gluten-free").checked = true;
    }

    // Healthy
    if (searchParams.get("healthy")) {
      this.shadowRoot.getElementById("input-healthy").checked = true;
    }

    // High protein
    if (searchParams.get("highProtein")) {
      this.shadowRoot.getElementById("input-high-protein").checked = true;
    }

    // Vegan
    if (searchParams.get("vegan")) {
      this.shadowRoot.getElementById("input-vegan").checked = true;
    }

    // Vegetarian
    if (searchParams.get("vegetarian")) {
      this.shadowRoot.getElementById("input-vegetarian").checked = true;
    }

    // Cost min
    if (searchParams.has("costmin")) {
      this.shadowRoot.getElementById("input-cost-min").value =
        searchParams.get("costmin");
    }

    // Cost max
    if (searchParams.has("costmax")) {
      this.shadowRoot.getElementById("input-cost-max").value =
        searchParams.get("costmax");
    }

    // Sort cost
    if (searchParams.has("sortcost")) {
      if (searchParams.get("sortcost") === "desc") {
        this.shadowRoot.getElementById("sort-cost-descending").checked = true;
      } else if (searchParams.get("sortcost") === "asc") {
        this.shadowRoot.getElementById("sort-cost-ascending").checked = true;
      }
    }

    // Sort time
    if (searchParams.has("sorttime")) {
      if (searchParams.get("sorttime") === "desc") {
        this.shadowRoot.getElementById("sort-time-descending").checked = true;
      } else if (searchParams.get("sorttime") === "asc") {
        this.shadowRoot.getElementById("sort-time-ascending").checked = true;
      }
    }
  }
  clickFilter() {
    this.shadowRoot.getElementById("filter-form").style.display = "initial";
  }

  /**
   * Set search URL parameters when clicking on search button.
   */
  clickSearch() {
    const searchParams = {};

    // Query
    if (this.shadowRoot.getElementById("search-input").value != "") {
      searchParams["query"] =
        this.shadowRoot.getElementById("search-input").value;
    }

    // Gluten free
    if (this.shadowRoot.getElementById("input-gluten-free").checked) {
      searchParams["glutenFree"] = true;
    }

    // Healthy
    if (this.shadowRoot.getElementById("input-healthy").checked) {
      searchParams["healthy"] = true;
    }

    // High protein
    if (this.shadowRoot.getElementById("input-high-protein").checked) {
      searchParams["highProtein"] = true;
    }

    // Vegan
    if (this.shadowRoot.getElementById("input-vegan").checked) {
      searchParams["vegan"] = true;
    }

    // Vegetarian
    if (this.shadowRoot.getElementById("input-vegetarian").checked) {
      searchParams["vegetarian"] = true;
    }

    // Cost min
    if (this.shadowRoot.getElementById("input-cost-min").value != "") {
      searchParams["costmin"] =
        this.shadowRoot.getElementById("input-cost-min").value;
    }

    // Cost max
    if (this.shadowRoot.getElementById("input-cost-max").value != "") {
      searchParams["costmax"] =
        this.shadowRoot.getElementById("input-cost-max").value;
    }

    // Sorting
    const sortSelectedElement = this.shadowRoot.querySelector(
      "input[name=sort-type]:checked"
    );
    if (sortSelectedElement) {
      const sortSelectedValue = sortSelectedElement.value;
      if (sortSelectedValue === "sort-time-descending") {
        searchParams["sorttime"] = "desc";
      } else if (sortSelectedValue === "sort-time-ascending") {
        searchParams["sorttime"] = "asc";
      } else if (sortSelectedValue === "sort-cost-descending") {
        searchParams["sortcost"] = "desc";
      } else if (sortSelectedValue === "sort-cost-ascending") {
        searchParams["sortcost"] = "asc";
      }
    }

    // Route to search page
    const routerEvent = new CustomEvent("router-navigate", {
      detail: {
        route: "recipe-search",
        params: [],
        searchParams: searchParams,
      },
      bubbles: true,
      composed: true,
    });

    document.dispatchEvent(routerEvent);
  }

  /**
   * Gets search results given URL parameters for filters and query.
   * @async
   */
  async getSearchResults() {
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
