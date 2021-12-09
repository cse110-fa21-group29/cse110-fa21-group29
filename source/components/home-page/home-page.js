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
      // grab prev button and add event listener to it
      const prevButton = this.shadowRoot.getElementById("prev-button-" + i);
      this.buttonEventListener(prevButton, i, true);

      this.shadowRoot.getElementById("prev-button-" + i).style.visibility =
        "hidden";

      // grab next button and add event listener to it
      const nextButton = this.shadowRoot.getElementById("next-button-" + i);
      this.buttonEventListener(nextButton, i, false);
    }

    // Get recipes from database
    const database = new Database();
    const recipes = await database.getRecipes();

    // Clear out recipe card grids before we append new cards
    for (let i = 1; i < 6; i++) {
      this.shadowRoot.getElementById("recipe-card-grid-" + i).innerHTML = "";
    }

    // Create an array of recipe object
    const recipeObjects = [];

    // Fill the array with recipes
    for (let i = 0; i < recipes.length; i++) {
      const recipeObject = {
        index: i,
        recipe: recipes[i],
      };
      recipeObjects.push(recipeObject);
    }

    /**
     * Counter array for each grid with each index being:
     * 0: highProtein, 1: healthy, 2: vegan, 3: vegetarian, 4: glutenFree
     */
    const gridCount = [0, 0, 0, 0, 0];

    // ID array to holds the randomly generated ID for the recipe card
    const idArray = [];

    // Create 20 recipe cards for each category grid populated with database info
    for (let i = 0; i < recipeObjects.length; i++) {
      // Generate a random ID
      let id = Math.floor(Math.random() * recipeObjects.length);

      // Check if the is already in the array, if so generate a new random ID
      while (idArray.includes(id)) {
        id = Math.floor(Math.random() * recipeObjects.length);
      }
      // If ID not in the array, push it to the array
      idArray.push(id);
      // Randomly generate recipe
      const randomItem = recipeObjects[id];

      // If recipe does not exist at index, then skip to prevent page from breaking
      if (!randomItem.recipe) {
        continue;
      }

      // Check if grid 1 has less than 20 recipe cards and if current recipe is high protein
      if (gridCount[0] < 20 && randomItem.recipe.categories.highProtein) {
        // Increment protein counter
        gridCount[0]++;
        // Add high protein recipe card to grid 1
        this.shadowRoot
          .getElementById("recipe-card-grid-1")
          .append(this.createRecipeCard(randomItem.recipe, randomItem.index));
      }

      // Check if grid 2 has less than 20 recipe cards and if current recipe is healthy
      if (gridCount[1] < 20 && randomItem.recipe.categories.healthy) {
        // Increment healthy counter
        gridCount[1]++;
        // Add high protein recipe card to grid 2
        this.shadowRoot
          .getElementById("recipe-card-grid-2")
          .append(this.createRecipeCard(randomItem.recipe, randomItem.index));
      }

      // Check if grid 3 has less than 20 recipe cards and if current recipe is vegan
      if (gridCount[2] < 20 && randomItem.recipe.categories.vegan) {
        // Increment vegan counter
        gridCount[2]++;
        // Add high protein recipe card to grid 3
        this.shadowRoot
          .getElementById("recipe-card-grid-3")
          .append(this.createRecipeCard(randomItem.recipe, randomItem.index));
      }

      // Check if grid 4 has less than 20 recipe cards and if current recipe is vegetarian
      if (gridCount[3] < 20 && randomItem.recipe.categories.vegetarian) {
        // Increment vegetarian counter
        gridCount[3]++;
        // Add high protein recipe card to grid 4
        this.shadowRoot
          .getElementById("recipe-card-grid-4")
          .append(this.createRecipeCard(randomItem.recipe, randomItem.index));
      }

      // Check if grid 5 has less than 20 recipe cards and if current recipe is gluten free
      if (gridCount[4] < 20 && randomItem.recipe.categories.glutenFree) {
        // Increment gluten free counter
        gridCount[4]++;
        // Add high protein recipe card to grid 5
        this.shadowRoot
          .getElementById("recipe-card-grid-5")
          .append(this.createRecipeCard(randomItem.recipe, randomItem.index));
      }

      // If every grid has been filled then break
      if (gridCount.every((val) => val === 20)) {
        break;
      }
    }
  }

  /**
   * Gets a button element and adds an eventListener to it
   * @param {Object} element - Next Button
   * @param {int} elementId - Next button id number
   * @param {boolean} buttonType - false for next, true for back
   */
  buttonEventListener(element, elementId, buttonType) {
    element.addEventListener("click", () => {
      this.recipeScroll(buttonType, elementId);
    });
  }

  /**
   * Hide the prev or next button if reach the end
   * @param {*} scrollleft - scrollleft or right
   * @param {*} i - button id
   */
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
