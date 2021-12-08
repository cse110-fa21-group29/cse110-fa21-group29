import { Database } from "/core/database/database.js";
import { Storage } from "/core/storage/storage.js";
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
    this.shadowRoot
      .getElementById("cooking-mode-button")
      .addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "cooking-mode",
            params: [this.routeParams[0]],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);
      });

    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // If recipe does not exist, then route back to home page
    if (!recipe) {
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "home-page",
          params: [],
        },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(routerEvent);
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
        if (confirm("Are you sure you want to delete this recipe?")) {
          // Get recipe index in database from route param
          const index = this.routeParams[0];

          // Delete recipe in database
          database.deleteRecipe(index);

          // Delete recipe image
          const storage = new Storage();
          storage.deleteImage(index);

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
        }
      });

    // Add video embed to directions if video exists
    // Will not show by default (user must click "Switch to Video")
    if (recipe.metadata.video != undefined && recipe.metadata.video != "") {
      this.shadowRoot.getElementById("recipe-video").src =
        recipe.metadata.video;

      // Display video button
      this.shadowRoot.getElementById("direction-video-button").style.display =
        "block";

      // Event handler for video button
      this.shadowRoot
        .getElementById("direction-video-button")
        .addEventListener("click", () => {
          this.switchToVideo();
        });

      // Event handler for text button
      this.shadowRoot
        .getElementById("direction-text-button")
        .addEventListener("click", () => {
          this.switchToText();
        });
    }

    // This is the first row of the page, including the image and the author box
    this.shadowRoot.querySelector(".recipe-image").src = recipe.metadata.image;
    this.shadowRoot.querySelector(".recipe-image").alt = recipe.metadata.title;
    this.shadowRoot.querySelector(".dish-name").innerHTML =
      recipe.metadata.title;
    this.shadowRoot.querySelector(
      ".author-name"
    ).innerHTML = `By ${recipe.metadata.author}`;

    if (recipe.spoonacularSourceUrl) {
      this.shadowRoot.querySelector(".article-link").style.display = "block";
      this.shadowRoot.querySelector(".article-link").href =
        recipe.spoonacularSourceUrl;
    }

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
    if (!recipe.categories.vegan) {
      this.shadowRoot.querySelector("#vegan").style.display = "none";
    }
    if (!recipe.categories.vegetarian) {
      this.shadowRoot.querySelector("#vegetarian").style.display = "none";
    }
    if (!recipe.categories.glutenFree) {
      this.shadowRoot.querySelector("#gluten-free").style.display = "none";
    }
    if (!recipe.categories.highProtein) {
      this.shadowRoot.querySelector("#high-protein").style.display = "none";
    }
    if (!recipe.categories.healthy) {
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
      ingredients += "<li>" + recipe.ingredients[i] + "</li>";
    }

    this.shadowRoot.querySelector(".ingredients-list").innerHTML =
      "<ul>" + ingredients + "</ul>";

    // Direction box
    let directions = "";

    for (let i = 0; i < recipe.steps.length; i++) {
      directions += "<li>" + recipe.steps[i] + "</li>";
    }

    this.shadowRoot.querySelector(".direction-list").innerHTML =
      "<ol>" + directions + "</ol>";
  }

  /**
   * Switches from text directions to video directions
   */
  switchToVideo() {
    // Toggle buttons
    this.shadowRoot.getElementById("direction-video-button").style.display =
      "none";
    this.shadowRoot.getElementById("direction-text-button").style.display =
      "block";

    // Show video & hide text
    this.shadowRoot.querySelector(".direction-list").style.display = "none";
    this.shadowRoot.getElementById("recipe-video-container").style.display =
      "block";
  }

  /**
   * Switches from video directions to text directions
   */
  switchToText() {
    // Toggle buttons
    this.shadowRoot.getElementById("direction-video-button").style.display =
      "block";
    this.shadowRoot.getElementById("direction-text-button").style.display =
      "none";

    // Show video & hide text
    this.shadowRoot.querySelector(".direction-list").style.display = "block";
    this.shadowRoot.getElementById("recipe-video-container").style.display =
      "none";
  }
}

customElements.define("recipe-details", RecipeDetails);
