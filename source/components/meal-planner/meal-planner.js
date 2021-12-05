import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the meal planner. */
class MealPlanner extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/meal-planner/meal-planner.html";
  }

  /**
   * Sets up meal card functions
   */
  setupElement() {
    // Select all cells
    const mealCards = this.shadowRoot.querySelectorAll(".meal-card");

    // Add cell functions
    for (let i = 0; i < 21; i++) {
      // Add button image
      let mealcardimg = document.createElement("div");

      mealcardimg.className = "meal-card-add";
      mealCards[i].append(mealcardimg);

      // Bring up search sidebar when clicked
      mealcardimg.addEventListener("click", () => {
        this.shadowRoot.getElementById("search-part").style.display = "block";
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

      // mealCards[i].addEventListener("click", () => {
      //   // Function that handles meal card logic
      //   // this.createRecipeCard(mealCards[i]);
      //   this.shadowRoot.getElementById("search-part").style.display = "block";
      // });
    }

    // this.shadowRoot
    //   .getElementById("search-result")
    //   .append(document.createElement("meal-planner-recipe-card"));

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

  /**
   * Asks for user input of recipe link and checks if valid. If valid, create
   * recipe card and append to meal card.
   *
   * @async
   * @param {Object} mealCard - Meal card in planner to append to.
   */
  // async createRecipeCard(mealCard) {
  //   // Get user entry
  //   const prompt = window.prompt(
  //     "Enter recipe link (leave blank to clear cell)",
  //     ""
  //   );

  //   // Do not do anything if prompt canceled
  //   if (prompt === undefined) {
  //     return;
  //   }

  //   // Reset meal card if empty entry
  //   if (prompt === "") {
  //     mealCard.innerHTML = "";
  //     mealCard.style.backgroundImage =
  //       "url(/static/meal-planner/circle-plus.png)";
  //     return;
  //   }

  //   // Split input and grab last split
  //   const url = prompt.split("/");
  //   const index = parseInt(url[url.length - 1], 10);

  //   // Object to hold recipe if found
  //   let recipe = {};

  //   // Check if split contains "recipes" followed by number
  //   if (url[url.length - 2] === "recipes" && isNaN(index) === false) {
  //     // Try to get recipe from database
  //     const db = new Database();
  //     recipe = await db.getRecipe(index);

  //     // If recipe does not exist notify user
  //     if (recipe === undefined) {
  //       alert("Not a valid recipe link");
  //       return;
  //     }
  //   } else {
  //     alert("Not a valid recipe link");
  //     return;
  //   }

  //   // Generate recipe card
  //   const card = document.createElement("common-recipe-card");
  //   card.recipeData = recipe;

  //   // Clear out meal card then append
  //   mealCard.innerHTML = "";
  //   mealCard.style.backgroundImage = "none";
  //   mealCard.append(card);
  // }
}

customElements.define("meal-planner", MealPlanner);
