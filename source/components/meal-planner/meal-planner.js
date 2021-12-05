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

    // Route to homepage if failed
    if (indexes === undefined) {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "home-page",
          params: [],
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(routerEvent);
      return;
    }

    // Get all cells
    const mealCards = this.shadowRoot.querySelectorAll(".meal-card");

    // Append add buttons to each cell
    for (let i = 0; i < 21; i++) {
      // Add button for empty cells
      const addButton = document.createElement("div");

      addButton.className = "meal-card-add";

      // Append add button to cell
      mealCards[i].append(addButton);
    }

    // Add recipe cards as specified in query string "id" parameter
    for (let i = 0; i < 21; i++) {
      // Check if URL index is not -1
      if (indexes[i] !== -1) {
        // Attempt to get recipe from index
        const db = new Database();
        const recipe = await db.getRecipe(indexes[i]);

        // Check if recipe is not undefined
        if (recipe !== undefined) {
          // Clear out cell
          mealCards[i].innerHTML = "";

          // Append recipe card to cell
          this.addRecipeToCell(mealCards[i], indexes[i]);
        }
      }
    }

    // Add button functionality cells
    this.shadowRoot.querySelectorAll(".meal-card-add").forEach((element) => {
      // Add button click listener
      element.addEventListener("click", () => {
        // Bring up search sidebar when add button clicked
        this.shadowRoot.getElementById("search-part").style.display = "block";
      });
    });

    // Add functionality for each cell
    for (let i = 0; i < 21; i++) {
      // Click event to remove card and restore add button
      mealCards[i].addEventListener("click", () => {
        // Create new add button
        const addButton = document.createElement("div");

        addButton.className = "meal-card-add";
        mealCards[i].innerHTML = "";

        // Add button click listener
        addButton.addEventListener("click", () => {
          // Bring up search sidebar when add button clicked
          this.shadowRoot.getElementById("search-part").style.display = "block";
        });

        mealCards[i].append(addButton);

        // Update total nutrition
        this.updateNutrition();

        // Update URL
        this.setUrl(i, -1);
      });

      // Dragover listener
      mealCards[i].addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      // Drop listener
      mealCards[i].addEventListener("drop", (event) => {
        // Get recipe index from drag data
        const index = event.dataTransfer.getData("text/plain");

        // Add recipe card
        this.addRecipeToCell(mealCards[i], index);

        // Change URL
        this.setUrl(i, index);
      });
    }

    // Close sidebar when "x" clicked
    this.shadowRoot
      .getElementById("close-search")
      .addEventListener("click", () => {
        this.shadowRoot.getElementById("search-part").style.display = "none";
      });

    // Search button
    this.shadowRoot
      .getElementById("search-button")
      .addEventListener("click", (event) => {
        const query = this.shadowRoot.getElementById("search-input").value;
        this.search(query);
        event.preventDefault();
      });

    // Reload page when browser navigation buttons used
    window.onpopstate = function () {
      location.reload();
    };
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
   * Adds meal planner recipe card to cell.
   *
   * @async
   * @param {Object} mealCard - Cell to append card to.
   * @param {number} index - Index of recipe object in database.
   */
  async addRecipeToCell(mealCard, index) {
    // Get recipe from database
    const db = new Database();
    const recipe = await db.getRecipe(index);

    // Create meal planner recipe card
    const card = document.createElement("meal-planner-recipe-card");
    card.recipeData = recipe;
    card.recipeIndex = index;

    // Clear out any existing cards
    mealCard.innerHTML = "";
    mealCard.append(card);

    // Update total nutrition
    this.updateNutrition();
  }

  /**
   * Updates the nutrition row based on the recipe cards present.
   */
  updateNutrition() {
    // Grab all cells
    const calories = this.shadowRoot.querySelectorAll(".calories");
    const fat = this.shadowRoot.querySelectorAll(".fat");
    const plannerCells = this.shadowRoot.querySelectorAll(".meal-card");
    const protein = this.shadowRoot.querySelectorAll(".protein");

    // Iterate on column
    for (let i = 0; i < calories.length; i++) {
      let calorieCount = 0;
      let fatCount = 0;
      let proteinCount = 0;

      // Iterate on row
      for (let j = 0; j < 3; j++) {
        // Skip cell if there is no recipe
        if (plannerCells[7 * j + i].children[0].recipe === undefined) {
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
   * Adds meal planner recipe card to cell.
   *
   * @async
   * @param {Object} mealCard - Cell to append card to.
   * @param {number} index - Index of recipe object in database.
   * @returns {Array|undefined} Array of indexes or undefined if not all numbers.
   */
  getParams() {
    // Get params
    const paramString = window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(paramString);

    // Check if "ids" exists as a query string parameter
    if (searchParams.has("ids")) {
      const ids = searchParams.get("ids").split(",").map(Number);

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
    // Get params
    const paramString = window.location.href.split("?")[1];
    const searchParams = new URLSearchParams(paramString);

    // Replace id
    const ids = searchParams.get("ids").split(",");
    ids[paramIndex] = recipeIndex;

    const newIds = ids.join(",");

    // Get URL and remove query string
    const url = window.location.href;
    let newUrl = url.slice(0, url.indexOf("?"));
    newUrl += "?ids=" + newIds;

    // Push new URL
    history.pushState({}, "", newUrl);
  }
}

customElements.define("meal-planner", MealPlanner);
