import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the meal planner. */
class MealPlanner extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/meal-planner/meal-planner.html";
  }

  /**
   * Sets up meal planner functions
   *
   * @async
   */
  async setupElement() {
    // Get recipe indexes from URL
    const indexes = this.getParams();

    // Route to empty meal planner if failed
    if (!indexes) {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "meal-planner",
          params: [],
          urlParams: {
            ids: "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1",
          },
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(routerEvent);
      return;
    }

    // Database instance
    const db = new Database();

    // Get all cells
    const plannerCells = this.shadowRoot.querySelectorAll(".planner-cell");

    // Append add buttons to each cell
    plannerCells.forEach((element) => {
      // Add button for empty cells
      const addButton = document.createElement("div");

      addButton.className = "planner-cell-add";

      // Append add button to cell
      element.append(addButton);
    });

    // Loading progress
    let loadProgress = 0;

    // Array to hold recipes from query string
    const recipes = [];

    // Get all recipes as specified in query string "ids" parameter
    for (let i = 0; i < 21; i++) {
      // Check if URL index is not -1
      if (indexes[i] !== -1) {
        // Attempt to get recipe from index
        const recipe = await db.getRecipe(indexes[i]);

        // Check if recipe is not undefined
        if (recipe) {
          recipes[i] = recipe;
        }
      }

      // Update loading message progress
      loadProgress += 4;
      this.shadowRoot.getElementById("load-progress").innerHTML = loadProgress;
    }

    // Add query string recipe cards
    for (let i = 0; i < 21; i++) {
      // Check if recipe array index is undefined
      if (recipes[i]) {
        // Append recipe card to cell
        this.addRecipeToCell(plannerCells[i], recipes[i]);
      }
    }

    // Add button functionality cells
    this.shadowRoot.querySelectorAll(".planner-cell-add").forEach((element) => {
      // Add button click listener
      element.addEventListener("click", () => {
        // Bring up search sidebar when add button clicked
        this.shadowRoot.getElementById("search-sidebar").style.display =
          "block";
      });
    });

    // Add functionality for each cell
    for (let i = 0; i < 21; i++) {
      // Click event to remove card and restore add button
      this.addButtonToCell(plannerCells[i], i);

      // Dragover listener
      plannerCells[i].addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      // Drop function
      this.drop(plannerCells[i], i);
    }

    // Finished loading meal planner so hide message
    this.shadowRoot.getElementById("load-progress").innerHTML = 100;
    this.shadowRoot.getElementById("load-message").style.display = "none";

    // Close sidebar when "x" clicked
    this.shadowRoot
      .getElementById("close-search")
      .addEventListener("click", () => {
        this.shadowRoot.getElementById("search-sidebar").style.display = "none";
      });

    // Search button
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", (event) => {
        const query = this.shadowRoot.getElementById("search-input").value;
        this.search(query);
        event.preventDefault();
      });

    // Put URL in sharing text box
    this.shadowRoot.getElementById("link-field").value = window.location.href;

    // Copy link to clipboard button
    this.shadowRoot
      .getElementById("copy-link-image")
      .addEventListener("click", () => {
        navigator.clipboard.writeText(window.location.href);
        // Display message
        this.shadowRoot.getElementById("copy-message").style.display = "inline";
      });
  }

  /**
   * Sets up search sidebar functionality.
   *
   * @async
   * @param {string} query - User input to pass to database search.
   */
  async search(query) {
    // Array used in database search
    const arr = [
      ["query", query],
      ["glutenFree", "true"],
      ["healthy", "true"],
      ["highProtein", "true"],
      ["vegan", "true"],
      ["vegetarian", "true"],
    ];

    // Search recipe in database
    const db = new Database();
    const recipes = await db.searchByName(arr);

    // Clear cards from any prior queries
    this.shadowRoot.getElementById("search-result").innerHTML = "";

    // Generate sidebar recipe cards
    for (let i = 0; i < recipes.length; i++) {
      const card = document.createElement("sidebar-recipe-card");
      card.recipeData = recipes[i].recipe;
      card.recipeIndex = recipes[i].index;

      // Append card to sidebar
      this.shadowRoot.getElementById("search-result").appendChild(card);
    }
  }

  /**
   * Adds click handler to cell which clears the cell, appends add button, and
   * updates the URL.
   *
   * @param {Object} plannerCell - Cell to operate on.
   * @param {Object} plannerCellIndex - Index of cell to operate on.
   */
  addButtonToCell(plannerCell, plannerCellIndex) {
    plannerCell.addEventListener("click", () => {
      // Create new add button
      const addButton = document.createElement("div");

      addButton.className = "planner-cell-add";
      plannerCell.innerHTML = "";

      // Add button click listener
      addButton.addEventListener("click", () => {
        // Bring up search sidebar when add button clicked
        this.shadowRoot.getElementById("search-sidebar").style.display =
          "block";
      });

      plannerCell.append(addButton);

      // Update total nutrition
      this.updateNutrition();

      // Update URL
      this.setUrl(plannerCellIndex, -1);

      // Update sharing text box
      this.shadowRoot.getElementById("link-field").value = window.location.href;
    });
  }

  /**
   * Adds meal planner recipe card to cell using recipe object.
   *
   * @param {Object} plannerCell - Cell to append card to.
   * @param {Object} recipe - Recipe object.
   */
  addRecipeToCell(plannerCell, recipe) {
    // Create meal planner recipe card
    const card = document.createElement("meal-planner-recipe-card");
    card.recipeData = recipe;

    // Clear out any existing cards
    plannerCell.innerHTML = "";
    plannerCell.append(card);

    // Update total nutrition
    this.updateNutrition();
  }

  /**
   * Adds meal planner recipe card to cell using recipe index.
   *
   * @async
   * @param {Object} plannerCell - Cell to append card to.
   * @param {number} index - Index of recipe object in database.
   */
  async addRecipeToCellWithDB(plannerCell, index) {
    // Get recipe from database
    const db = new Database();
    const recipe = await db.getRecipe(index);

    this.addRecipeToCell(plannerCell, recipe);
  }

  /**
   * Adds drop handler to cell which clears the cell, adds new recipe card,
   * and updates the URL.
   *
   * @param {Object} plannerCell - Cell to operate on.
   * @param {number} plannerCellIndex - Index of cell to operate on.
   */
  drop(plannerCell, plannerCellIndex) {
    // Drop listener
    plannerCell.addEventListener("drop", (event) => {
      // Get recipe index from drag data
      const index = event.dataTransfer.getData("text/plain");

      // Add recipe card
      this.addRecipeToCellWithDB(plannerCell, index);

      // Change URL
      this.setUrl(plannerCellIndex, index);

      // Firefox is special so it needs this line
      event.preventDefault();
    });
  }

  /**
   * Updates the nutrition row based on the recipe cards present.
   */
  updateNutrition() {
    // Grab all cells
    const calories = this.shadowRoot.querySelectorAll(".calories");
    const fat = this.shadowRoot.querySelectorAll(".fat");
    const plannerCells = this.shadowRoot.querySelectorAll(".planner-cell");
    const protein = this.shadowRoot.querySelectorAll(".protein");

    // Iterate on column
    for (let i = 0; i < calories.length; i++) {
      let calorieCount = 0;
      let fatCount = 0;
      let proteinCount = 0;

      // Iterate on row
      for (let j = 0; j < 3; j++) {
        // Skip cell if there is no recipe
        if (
          !plannerCells[7 * j + i].children[0] ||
          !plannerCells[7 * j + i].children[0].recipe
        ) {
          continue;
        }

        // Get recipe nutrition of current cell
        const recipeNutrients =
          plannerCells[7 * j + i].children[0].recipe.nutrients;

        // Add to column nutrition
        calorieCount += parseInt(recipeNutrients.calories, 10);
        fatCount += parseInt(recipeNutrients.fat, 10);
        proteinCount += parseInt(recipeNutrients.protein, 10);
      }

      // Update column nutrition
      calories[i].innerHTML = calorieCount;
      fat[i].innerHTML = fatCount;
      protein[i].innerHTML = proteinCount;
    }
  }

  /**
   * Get list of recipe ids in order of cell index from query string "ids"
   * parameter.
   *
   * @returns {Array|undefined} Array of recipe ids or undefined if failed.
   */
  getParams() {
    // Check if "ids" exists as a query string parameter
    if (this.routeUrlParams.ids) {
      const ids = this.routeUrlParams.ids.split(",").map(Number);

      // Check if there are exactly 21 numbers
      if (ids.length === 21 && ids.every((val) => !isNaN(val))) {
        return ids;
      }
    }

    return undefined;
  }

  /**
   * Replaces URL with modified "ids" query string parameter.
   *
   * @param {number} paramIndex - The id in the parameter to replace.
   * @param {number} recipeIndex - The replacement value of the id.
   */
  setUrl(paramIndex, recipeIndex) {
    // Replace id
    const ids = this.routeUrlParams.ids.split(",");
    ids[paramIndex] = recipeIndex;

    this.routeUrlParams.ids = ids.join(",");

    // Push new URL
    const routerEvent = new CustomEvent("router-navigate", {
      detail: {
        route: "meal-planner",
        params: [],
        urlParams: this.routeUrlParams,
        preventLoad: true,
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(routerEvent);

    // Update sharing text box
    this.shadowRoot.getElementById("link-field").value = window.location.href;

    // Hide copy message
    this.shadowRoot.getElementById("copy-message").style.display = "none";
    return;
  }
}

customElements.define("meal-planner", MealPlanner);
