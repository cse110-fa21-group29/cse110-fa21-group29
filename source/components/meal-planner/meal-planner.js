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
   */
  setupElement() {
    // Select all cells
    const mealCards = this.shadowRoot.querySelectorAll(".meal-card");

    // Add cell functions
    for (let i = 0; i < 21; i++) {
      // Append add button to cell
      const addButton = document.createElement("div");

      addButton.className = "meal-card-add";
      mealCards[i].append(addButton);

      // Bring up search sidebar when add button clicked
      addButton.addEventListener("click", () => {
        this.shadowRoot.getElementById("search-part").style.display = "block";
      });

      // Click event to remove card and restore add button
      mealCards[i].addEventListener("click", () => {
        mealCards[i].innerHTML = "";
        mealCards[i].append(addButton);
      });

      // Dragover listener
      mealCards[i].addEventListener("dragover", (event) => {
        event.preventDefault();
      });

      // Drop listener
      mealCards[i].addEventListener("drop", (event) => {
        const index = event.dataTransfer.getData("text/plain");
        this.addRecipeToCell(mealCards[i], index);
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
  }
}

customElements.define("meal-planner", MealPlanner);
