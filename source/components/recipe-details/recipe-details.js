import { Database } from "../../core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the recipe details page. */
class RecipeDetails extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-details/recipe-details.html";
  }

  /**
   * Populates recipe details page with information from the database and adds
   * delete functionality.
   *
   * @async
   */
  async setupElement() {
    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // If recipe does not exist, then skip page setup.
    if (recipe == null) {
      return;
    }

    // Recipe edit button
    this.shadowRoot
      .querySelector("#edit-button")
      .addEventListener("click", () => {
        // Route to edit page
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "recipe-contribute-edit",
            params: [this.routeParams[0]],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);
      });

    // Recipe delete button
    this.shadowRoot
      .querySelector("#delete-button")
      .addEventListener("click", () => {
        // Delete recipe from button
        database.deleteRecipe(this.routeParams[0]);

        // Route to home-page
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "home-page",
            params: [],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);

        // Notify user that recipe was deleted
        alert("Recipe deleted");
      });

    // This is the first row of the page, including the image and the author box
    this.shadowRoot.querySelector(".recipe-image").src = recipe.metadata.image;
    this.shadowRoot.querySelector(".recipe-image").alt = recipe.metadata.title;
    this.shadowRoot.querySelector(".dish-name").innerHTML =
      recipe.metadata.title;
    this.shadowRoot.querySelector(".author-name").innerHTML =
      recipe.metadata.author;
    this.shadowRoot.querySelector(".recipe-url").innerHTML =
      recipe.spoonacularSourceUrl;

    // Description box
    this.shadowRoot.querySelector(".description").innerHTML =
      recipe.description;

    // Information box
    this.shadowRoot.querySelector("#cost").innerHTML =
      recipe.info.pricePerServings;
    this.shadowRoot.querySelector("#time").innerHTML =
      recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#servings").innerHTML =
      recipe.nutrients.totalServings;

    // Category box
    if (recipe.categories.vegan == false) {
      this.shadowRoot.querySelector("#vegan").style.display = "none";
    }
    if (recipe.categories.vegetarian == false) {
      this.shadowRoot.querySelector("#vegetarian").style.display = "none";
    }
    if (recipe.categories.glutenFree == false) {
      this.shadowRoot.querySelector("#gluten-free").style.display = "none";
    }
    if (recipe.categories.highProtein == false) {
      this.shadowRoot.querySelector("#high-protein").style.display = "none";
    }
    if (recipe.categories.healthy == false) {
      this.shadowRoot.querySelector("#healthy").style.display = "none";
    }

    // Nutrient box
    this.shadowRoot.querySelector("#calories").innerHTML =
      recipe.nutrients.calories;
    this.shadowRoot.querySelector("#fat").innerHTML = recipe.nutrients.fat;
    this.shadowRoot.querySelector("#protein").innerHTML =
      recipe.nutrients.protein;

    // Ingredients box
    let ingredients = "";

    for (let i = 0; i < recipe.ingredients.length; i++) {
      ingredients = ingredients + "<li>" + recipe.ingredients[i] + "</li>";
    }

    this.shadowRoot.querySelector(".ingredients-list").innerHTML =
      "<ul>" + ingredients + "</ul>";

    // Direction box
    this.shadowRoot.querySelector(".direction-list").innerHTML = recipe.steps;
  }
}

customElements.define("recipe-details", RecipeDetails);
