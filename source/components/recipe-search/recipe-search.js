import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";
import { Database } from "/core/database/database.js";

/** Class that provides functionality to the search page. */
class RecipeSearch extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-search/recipe-search.html";
    this.searchResultRecipes = [];
  }

  /**
   * Initializes the search page.
   */
  async setupElement() {
    if (Object.keys(this.routeUrlParams).length > 0) {
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
    // Query
    if (this.routeUrlParams.query) {
      this.shadowRoot.getElementById("search-input").value =
        this.routeUrlParams.query;
    }

    // Gluten free
    if (this.routeUrlParams.glutenFree) {
      this.shadowRoot.getElementById("input-gluten-free").checked = true;
    }

    // Healthy
    if (this.routeUrlParams.healthy) {
      this.shadowRoot.getElementById("input-healthy").checked = true;
    }

    // High protein
    if (this.routeUrlParams.highProtein) {
      this.shadowRoot.getElementById("input-high-protein").checked = true;
    }

    // Vegan
    if (this.routeUrlParams.vegan) {
      this.shadowRoot.getElementById("input-vegan").checked = true;
    }

    // Vegetarian
    if (this.routeUrlParams.vegetarian) {
      this.shadowRoot.getElementById("input-vegetarian").checked = true;
    }

    // Cost min
    if (this.routeUrlParams.costmin) {
      this.shadowRoot.getElementById("input-cost-min").value =
        this.routeUrlParams.costmin;
    }

    // Cost max
    if (this.routeUrlParams.costmax) {
      this.shadowRoot.getElementById("input-cost-max").value =
        this.routeUrlParams.costmax;
    }

    // Sort cost
    if (this.routeUrlParams.sortcost) {
      if (this.routeUrlParams.sortcost === "desc") {
        this.shadowRoot.getElementById("sort-cost-descending").checked = true;
      } else if (this.routeUrlParams.sortcost === "asc") {
        this.shadowRoot.getElementById("sort-cost-ascending").checked = true;
      }
    }

    // Sort time
    if (this.routeUrlParams.sorttime) {
      if (this.routeUrlParams.sorttime === "desc") {
        this.shadowRoot.getElementById("sort-time-descending").checked = true;
      } else if (this.routeUrlParams.sorttime === "asc") {
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
    // Begin with empty query
    const searchParams = {
      query: "",
    };

    // Query
    if (this.shadowRoot.getElementById("search-input").value != "") {
      searchParams.query = this.shadowRoot.getElementById("search-input").value;
    }

    // Gluten free
    if (this.shadowRoot.getElementById("input-gluten-free").checked) {
      searchParams.glutenFree = true;
    }

    // Healthy
    if (this.shadowRoot.getElementById("input-healthy").checked) {
      searchParams.healthy = true;
    }

    // High protein
    if (this.shadowRoot.getElementById("input-high-protein").checked) {
      searchParams.highProtein = true;
    }

    // Vegan
    if (this.shadowRoot.getElementById("input-vegan").checked) {
      searchParams.vegan = true;
    }

    // Vegetarian
    if (this.shadowRoot.getElementById("input-vegetarian").checked) {
      searchParams.vegetarian = true;
    }

    // Cost min
    if (this.shadowRoot.getElementById("input-cost-min").value != "") {
      searchParams.costmin =
        this.shadowRoot.getElementById("input-cost-min").value;
    }

    // Cost max
    if (this.shadowRoot.getElementById("input-cost-max").value != "") {
      searchParams.costmax =
        this.shadowRoot.getElementById("input-cost-max").value;
    }

    // Sorting
    const sortSelectedElement = this.shadowRoot.querySelector(
      "input[name=sort-type]:checked"
    );
    if (sortSelectedElement) {
      const sortSelectedValue = sortSelectedElement.value;
      if (sortSelectedValue === "sort-time-descending") {
        searchParams.sorttime = "desc";
      } else if (sortSelectedValue === "sort-time-ascending") {
        searchParams.sorttime = "asc";
      } else if (sortSelectedValue === "sort-cost-descending") {
        searchParams.sortcost = "desc";
      } else if (sortSelectedValue === "sort-cost-ascending") {
        searchParams.sortcost = "asc";
      }
    }

    // Route to search page
    const routerEvent = new CustomEvent("router-navigate", {
      detail: {
        route: "recipe-search",
        params: [],
        urlParams: searchParams,
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

    // Number # of recipes per page
    const recipePerPage = 15;

    this.searchResultRecipes = await database.searchByName(
      Object.entries(this.routeUrlParams)
    );

    // Clear out recipe card grid before we append new cards
    this.shadowRoot.getElementById("recipe-card-grid").innerHTML = "";

    // Apply Pagination
    if (this.searchResultRecipes.length > recipePerPage) {
      // Round up (recipe length)/(amount of recipes per page)
      const pageCount = Math.ceil(
        this.searchResultRecipes.length / recipePerPage
      );
      const pagDiv = this.shadowRoot.getElementById("recipe-pagination");

      // Create left arrow icon for navigation
      const leftArrow = document.createElement("a");
      leftArrow.innerHTML = "&#8592;";
      leftArrow.classList.add("pagination-arrow");

      // If clicked on, click previous page anchor tag
      leftArrow.addEventListener("click", (event) => {
        const currPageNum = parseInt(this.routeUrlParams.page, 10);

        // The page before page 1 DNE
        if (currPageNum === 1) {
          return;
        } else {
          const previousPage = currPageNum - 1;

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
          const currPage = currAnchor.innerHTML;

          // Get 1st recipe index displayed on curr page
          const recipeStart = (currPage - 1) * recipePerPage;

          // Get 2nd recipe index displayed on curr page
          const recipeEnd = recipeStart + recipePerPage;

          // Get recipe from start (inclusive) to end (exclusive)
          let pageRecipes = this.searchResultRecipes.slice(
            recipeStart,
            recipeEnd
          );

          // Clear out recipe card grid before we append new cards
          this.shadowRoot.getElementById("recipe-card-grid").innerHTML = "";

          // Populate grid with all the recipes, starting at recipeStart, ending at recipeEnd
          for (const recipe of pageRecipes) {
            this.shadowRoot
              .getElementById("recipe-card-grid")
              .appendChild(this.createRecipeCard(recipe.recipe, recipe.index));
          }

          // Get page number before the clicked on page number
          const lastPageNum = this.routeUrlParams.page;

          // Remove the active class from the prev page number
          this.shadowRoot
            .getElementById(lastPageNum)
            .classList.remove("active");

          currAnchor.classList.add("active");

          // Gets the URL without ?page=, then adds it back with the current page number
          this.routeUrlParams.page = currPage;

          // Route to search page without reloading
          const routerEvent = new CustomEvent("router-navigate", {
            detail: {
              route: "recipe-search",
              params: [],
              urlParams: this.routeUrlParams,
              preventLoad: true,
            },
            bubbles: true,
            composed: true,
          });

          document.dispatchEvent(routerEvent);
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
        const currPageNum = parseInt(this.routeUrlParams.page, 10);

        // The page after the last page DNE
        if (currPageNum === pageCount) {
          return;
        } else {
          const nextPage = currPageNum + 1;
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
        this.shadowRoot
          .getElementById("recipe-card-grid")
          .appendChild(
            this.createRecipeCard(
              this.searchResultRecipes[i].recipe,
              this.searchResultRecipes[i].index
            )
          );
      }

      // If url already has a page, then do not repeat page count
      if (this.routeUrlParams.page) {
        // Get current page num
        const currPageNum = this.routeUrlParams.page;

        // Click the current page anchor again so its highlighted in pagination nav bar
        this.shadowRoot.getElementById(currPageNum).click();
      } else {
        // Add page=1 to url params if no page exists in the url
        this.routeUrlParams.page = 1;

        // Replace current state without reloading
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-search",
            params: [],
            urlParams: this.routeUrlParams,
            preventLoad: true,
            replaceState: true,
          },
          bubbles: true,
          composed: true,
        });

        document.dispatchEvent(routerEvent);

        this.shadowRoot.getElementById("1").classList.add("active");
      }
    } else {
      // For the case that pagination is not required
      for (const recipe of this.searchResultRecipes) {
        this.shadowRoot
          .getElementById("recipe-card-grid")
          .appendChild(this.createRecipeCard(recipe.recipe, recipe.index));
      }
    }
  }

  /**Closes the filter */
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
