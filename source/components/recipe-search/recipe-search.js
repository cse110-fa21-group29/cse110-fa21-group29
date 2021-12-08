import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";
import { Database } from "/core/database/database.js";

class RecipeSearch extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-search/recipe-search.html";
    this.recipe = [];
  }

  /**
   * Initializes the search page.
   */
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

    // Click event handler for the filter icon button
    this.shadowRoot
      .getElementById("filter-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickFilter();
      });

    // Click event handler for the search button
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickSearch();
      });

    // Click event handler for the filter close button
    this.shadowRoot
      .getElementById("close-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        this.clickClose();
      });

    // Click event handler for the filter reset button
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

  /**
   * Display filters form when clicking on filter icon.
   */
  clickFilter() {
    this.shadowRoot.getElementById("filter-form").style.display = "initial";
    this.shadowRoot.getElementById("cover").style.display = "initial";
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

    // Number # of recipes per page
    const recipePerPage = 15;

    let paramArray = [];
    for (let p of queryString) {
      paramArray.push(p);
    }

    let searchRecipe = await database.searchByName(paramArray);
    this.recipe = searchRecipe;

    // Clear out recipe card grid before we append new cards
    this.shadowRoot.getElementById("recipe-card-grid").innerHTML = "";

    // Apply Pagination
    if (searchRecipe.length > recipePerPage) {
      // Round up (recipe length)/(amount of recipes per page)
      const pageCount = Math.ceil(searchRecipe.length / recipePerPage);
      const pagDiv = this.shadowRoot.getElementById("recipe-pagination");

      // Create left arrow icon for navigation
      const leftArrow = document.createElement("a");
      leftArrow.innerHTML = "&#8592;";
      leftArrow.classList.add("pagination-arrow");

      // If clicked on, click previous page anchor tag
      leftArrow.addEventListener("click", (event) => {
        const url = window.location.href;

        let currPageNum = "";

        const pageChunk = url.slice(url.indexOf("?page="), url.length);
        const equalIndex = pageChunk.indexOf("=");

        for (let i = equalIndex + 1; i < pageChunk.length; i++) {
          currPageNum = currPageNum + pageChunk[i];
        }

        currPageNum = parseInt(currPageNum, 10);

        // The page before page 1 DNE
        if (currPageNum === 1) {
          return;
        } else {
          let previousPage = currPageNum - 1;

          this.shadowRoot
            .getElementById(currPageNum)
            .classList.remove("active");

          this.shadowRoot.getElementById(previousPage).classList.add("active");
          this.shadowRoot.getElementById(previousPage).click();
        }
      });
      pagDiv.append(leftArrow);

      // Create and append an anchor tag for each pageCount to a div
      for (let i = 1; i <= pageCount; i++) {
        let anchorTag = document.createElement("a");

        // Set id to each tag according to their page #
        anchorTag.setAttribute("id", i);

        // Set tag text to current number
        anchorTag.innerHTML = i;

        // Styling Purposes
        anchorTag.classList.add("pagination-numbers");

        // If anchor is clicked, show new list of recipe cards;
        anchorTag.addEventListener("click", (event) => {
          const currAnchor = event.target;

          // Get the current page
          let currPage = currAnchor.innerHTML;

          // Get 1st recipe index displayed on curr page
          const recipeStart = (currPage - 1) * recipePerPage;

          // Get 2nd recipe index displayed on curr page
          const recipeEnd = recipeStart + recipePerPage;

          // Get recipe from start (inclusive) to end (exclusive)
          let pageRecipes = this.recipe.slice(recipeStart, recipeEnd);

          // Clear out recipe card grid before we append new cards
          this.shadowRoot.getElementById("recipe-card-grid").innerHTML = "";

          // Populate grid with all the recipes, starting at recipeStart, ending at recipeEnd
          for (const recipe of pageRecipes) {
            this.shadowRoot
              .getElementById("recipe-card-grid")
              .appendChild(this.createRecipeCard(recipe.recipe, recipe.indedx));
          }

          // Change url to have page set to the current page number
          const url = window.location.href;

          // Get page number before the clicked on page number
          let lastPageNum = "";

          const pageChunk = url.slice(url.indexOf("?page="), url.length);
          const equalIndex = pageChunk.indexOf("=");

          for (let i = equalIndex + 1; i < pageChunk.length; i++) {
            lastPageNum = lastPageNum + pageChunk[i];
          }

          // Remove the active class from the prev page number
          this.shadowRoot
            .getElementById(lastPageNum)
            .classList.remove("active");

          currAnchor.classList.add("active");

          // Gets the URL without ?page=, then adds it back with the current page number
          const newUrl =
            url.slice(0, url.indexOf("?page=")) + "?page=" + currPage;

          history.pushState({}, "", newUrl);
        });

        // Append the tag to paginationDiv
        pagDiv.append(anchorTag);
      }

      // Create right arrow icon for navigation
      const rightArrow = document.createElement("a");
      rightArrow.innerHTML = "&#8594;";
      rightArrow.classList.add("pagination-arrow");

      // If clicked on, click next page anchor tag
      rightArrow.addEventListener("click", (event) => {
        const url = window.location.href;

        let currPageNum = "";

        const pageChunk = url.slice(url.indexOf("?page="), url.length);
        const equalIndex = pageChunk.indexOf("=");

        for (let i = equalIndex + 1; i < pageChunk.length; i++) {
          currPageNum = currPageNum + pageChunk[i];
        }

        currPageNum = parseInt(currPageNum, 10);

        // The page after the last page DNE
        if (currPageNum === pageCount) {
          return;
        } else {
          let nextPage = currPageNum + 1;
          this.shadowRoot
            .getElementById(currPageNum)
            .classList.remove("active");

          this.shadowRoot.getElementById(nextPage).classList.add("active");

          this.shadowRoot.getElementById(nextPage).click();
        }
      });
      pagDiv.append(rightArrow);

      // Populate page initially with first recipePerPage recipes
      for (let i = 0; i < recipePerPage; i++) {
        /**
         * Closes filters form when clicking on "X" icon.
         */
        this.shadowRoot
          .getElementById("recipe-card-grid")
          .appendChild(
            this.createRecipeCard(searchRecipe[i].recipe, searchRecipe[i].index)
          );
      }

      // Set url to have page = 1 on initial load
      const url = window.location.href;

      // If url already has a page, then do not repeat page count
      if (url.includes("?page")) {
        // Get page number before the clicked on page number
        let lastPageNum = "";

        const pageChunk = url.slice(url.indexOf("?page="), url.length);
        const equalIndex = pageChunk.indexOf("=");

        for (let i = equalIndex + 1; i < pageChunk.length; i++) {
          lastPageNum = lastPageNum + pageChunk[i];
        }
        // Click the current page anchor again so its highlighted in pagination nav bar
        this.shadowRoot.getElementById(lastPageNum).click();
      } else {
        // Gets the URL without ?page=, then adds it back with the current page number
        const newUrl = url + "?page=" + 1;

        history.pushState({}, "", newUrl);

        this.shadowRoot.getElementById("1").classList.add("active");
      }
    } else {
      // For the case that pagination is not required
      for (const recipe of searchRecipe) {
        this.shadowRoot
          .getElementById("recipe-card-grid")
          .appendChild(this.createRecipeCard(recipe.recipe, recipe.index));
      }
    }
  }

  clickClose() {
    this.shadowRoot.getElementById("filter-form").style.display = "none";
    this.shadowRoot.getElementById("cover").style.display = "none";
  }

  /**
   * Resets filters form to blank fields (except all categories are true).
   */
  clickReset() {
    // Set all categories to true
    this.shadowRoot.getElementById("input-gluten-free").checked = true;
    this.shadowRoot.getElementById("input-healthy").checked = true;
    this.shadowRoot.getElementById("input-high-protein").checked = true;
    this.shadowRoot.getElementById("input-vegan").checked = true;
    this.shadowRoot.getElementById("input-vegetarian").checked = true;

    // Clear cost min/max fields
    this.shadowRoot.getElementById("input-cost-min").value = "";
    this.shadowRoot.getElementById("input-cost-max").value = "";

    // Clear sort radio buttons
    this.shadowRoot.getElementById("sort-cost-descending").checked = false;
    this.shadowRoot.getElementById("sort-cost-ascending").checked = false;
    this.shadowRoot.getElementById("sort-time-descending").checked = false;
    this.shadowRoot.getElementById("sort-time-ascending").checked = false;
  }

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
