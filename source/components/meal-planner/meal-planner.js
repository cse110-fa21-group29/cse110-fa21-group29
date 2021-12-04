import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class MealPlanner extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/meal-planner/meal-planner.html";
  }

  /**
   * Sets up meal card functions
   *
   * @async
   */
  async setupElement() {
    const mealCards = this.shadowRoot.querySelectorAll(".meal-card");

    for (let i = 0; i < 21; i++) {
      let mealcardimg = document.createElement("div");

      mealcardimg.className = "meal-card-add";
      mealcardimg.addEventListener("click", () => {
        this.shadowRoot.getElementById("search-part").style.display = "block";
      });

      mealCards[i].append(mealcardimg);

      // mealCards[i].addEventListener("click", () => {
      //   // Function that handles meal card logic
      //   // this.createRecipeCard(mealCards[i]);
      //   this.shadowRoot.getElementById("search-part").style.display = "block";
      // });
    }

    // this.shadowRoot
    //   .getElementById("search-result")
    //   .append(document.createElement("meal-planner-recipe-card"));

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

  async search(query) {
    // Querry array
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

    // Generate recipe cards
    for (let i = 0; i < recipes.length; i++) {
      this.shadowRoot
        .getElementById("search-result")
        .appendChild(
          this.createRecipeCard(recipes[i].recipe, recipes[i].index)
        );
    }
  }

  /**
   * Creates recipe card with information and routing.
   *
   * @param {Object} recipe - Object that contains recipe data.
   * @param {number} index - Index of recipe card in database to set route.
   * @returns {Object} Generated recipe card.
   */
  createRecipeCard(recipe, index) {
    const card = document.createElement("meal-planner-recipe-card");
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
