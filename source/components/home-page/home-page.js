import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the homepage. */
class HomePage extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/home-page/home-page.html";
  }

  /**
   * Populates homepage recipe card with information from the database.
   *
   * @async
   */
  async setupElement() {
    for (let i = 1; i < 6; i++) {
      this.shadowRoot
        .getElementById("prev-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(true, i);
        });
      this.shadowRoot.getElementById("prev-button-" + i).style.visibility =
        "hidden";

      this.shadowRoot
        .getElementById("next-button-" + i)
        .addEventListener("click", () => {
          this.recipeScroll(false, i);
        });
    }

    // Get recipes from database
    const database = new Database();
    const recipes = await database.getRecipes();

    // Clear out recipe card grids before we append new cards
    for (let i = 1; i < 6; i++) {
      this.shadowRoot.getElementById("recipe-card-grid-" + i).innerHTML = "";
    }

    // Counters for recipe card populating
    let highProteinCount = 0;
    let healthyCount = 0;
    let veganCount = 0;
    let vegetarianCount = 0;
    let glutenFreeCount = 0;

    // Create 20 recipe cards that are populated with data from recipe subset arrays
    for (let i = 0; i < recipes.length; i++) {
      // Check if grid 1 has less than 20 recipe cards and if current recipe is high protein
      if (highProteinCount < 20 && recipes[i].categories.highProtein) {
        // Increment protein counter
        highProteinCount++;
        // Add high protein recipe card to grid 1
        this.shadowRoot
          .getElementById("recipe-card-grid-1")
          .append(this.createRecipeCard(recipes[i], i));
      }

      // Check if grid 2 has less than 20 recipe cards and if current recipe is healthy
      if (healthyCount < 20 && recipes[i].categories.healthy) {
        // Increment healthy counter
        healthyCount++;
        // Add high protein recipe card to grid 2
        this.shadowRoot
          .getElementById("recipe-card-grid-2")
          .append(this.createRecipeCard(recipes[i], i));
      }

      // Check if grid 3 has less than 20 recipe cards and if current recipe is vegan
      if (veganCount < 20 && recipes[i].categories.vegan) {
        // Increment vegan counter
        veganCount++;
        // Add high protein recipe card to grid 3
        this.shadowRoot
          .getElementById("recipe-card-grid-3")
          .append(this.createRecipeCard(recipes[i], i));
      }

      // Check if grid 4 has less than 20 recipe cards and if current recipe is vegetarian
      if (vegetarianCount < 20 && recipes[i].categories.vegetarian) {
        // Increment vegetarian counter
        vegetarianCount++;
        // Add high protein recipe card to grid 4
        this.shadowRoot
          .getElementById("recipe-card-grid-4")
          .append(this.createRecipeCard(recipes[i], i));
      }

      // Check if grid 5 has less than 20 recipe cards and if current recipe is gluten free
      if (glutenFreeCount < 20 && recipes[i].categories.glutenFree) {
        // Increment gluten free counter
        glutenFreeCount++;
        // Add high protein recipe card to grid 5
        this.shadowRoot
          .getElementById("recipe-card-grid-5")
          .append(this.createRecipeCard(recipes[i], i));
      }
    }
  }

  recipeScroll(scrollleft, i) {
    let recipegrid = this.shadowRoot.getElementById("recipe-card-grid-" + i);
    let prevbutton = this.shadowRoot.getElementById("prev-button-" + i);
    let nextbutton = this.shadowRoot.getElementById("next-button-" + i);
    if (scrollleft) {
      recipegrid.scrollLeft -= (recipegrid.clientWidth * 3) / 4;
      nextbutton.style.visibility = "visible";
      if (recipegrid.scrollLeft - (recipegrid.clientWidth * 3) / 4 < 5) {
        prevbutton.style.visibility = "hidden";
      }
    } else {
      recipegrid.scrollLeft += (recipegrid.clientWidth * 3) / 4;
      prevbutton.style.visibility = "visible";
      if (
        recipegrid.scrollLeft + (recipegrid.clientWidth * 3) / 4 >
        recipegrid.scrollWidth - recipegrid.clientWidth
      ) {
        nextbutton.style.visibility = "hidden";
      }
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

customElements.define("home-page", HomePage);
