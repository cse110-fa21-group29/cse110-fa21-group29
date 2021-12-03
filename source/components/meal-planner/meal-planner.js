import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class MealPlanner extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/meal-planner/meal-planner.html";
  }

  /**
   * Sets up meal card functions
   */
  setupElement() {
    const mealCards = this.shadowRoot.querySelectorAll(".meal-card");

    for (let i = 0; i < 21; i++) {
      mealCards[i].addEventListener("click", () => {
        // Function that handles meal card logic
        this.createRecipeCard(mealCards[i]);
      });
    }
  }

  /**
   * Asks for user input of recipe link and checks if valid. If valid, create
   * recipe card and append to meal card.
   *
   * @async
   * @param {Object} mealCard - Meal card in planner to append to.
   */
  async createRecipeCard(mealCard) {
    // Get user entry
    const prompt = window.prompt("Enter recipe link", "");

    // Do not do anything if prompt canceled
    if (prompt == undefined) {
      return;
    }

    // Reset meal card if empty entry
    if (prompt == "") {
      mealCard.innerHTML = "";
      mealCard.style.backgroundImage =
        "url(/static/meal-planner/circle-plus.png)";
      return;
    }

    // Split input and grab last split
    const url = prompt.split("/");
    const index = parseInt(url[url.length - 1], 10);

    // Object to hold recipe if found
    let recipe = {};

    // Check if split contains "recipes" followed by number
    if (url[url.length - 2] == "recipes" && isNaN(index) === false) {
      // Try to get recipe from database
      const db = new Database();
      recipe = await db.getRecipe(index);

      // If recipe does not exist notify user
      if (
        recipe &&
        Object.keys(recipe).length === 0 &&
        Object.getPrototypeOf(recipe) === Object.prototype
      ) {
        alert("Not a valid recipe link");
        return;
      }
    } else {
      alert("Not a valid recipe link");
      return;
    }

    // Generate recipe card
    const card = document.createElement("common-recipe-card");
    card.recipeData = recipe;

    // Clear out meal card then append
    mealCard.innerHTML = "";
    mealCard.style.backgroundImage = "none";
    mealCard.append(card);
  }
}

customElements.define("meal-planner", MealPlanner);
