import { Database } from "/core/database/database.js";
import { Storage } from "/core/storage/storage.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the recipe details page. */
class RecipeDetails extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-details/recipe-details.html";
  }
  count = 0;
  timeoutID;
  timeron = 0;
  /**
   * Populates recipe details page with information from the database and adds
   * delete functionality.
   *
   * @async
   */
  async setupElement() {
    this.shadowRoot
      .getElementById("hands-free-button")
      .addEventListener("click", () => {
        const routerEvent = new CustomEvent("router-navigate", {
          detail: {
            route: "hands-free",
            params: [this.routeParams[0]],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(routerEvent);
      });
    this.shadowRoot
      .getElementById("timer-button")
      .addEventListener("click", () => {
        if (this.shadowRoot.getElementById("timer").style.display == "") {
          this.shadowRoot.getElementById("timer").style.display = "flex";
        } else {
          this.shadowRoot.getElementById("timer").style.display = "";
        }
      });
    this.shadowRoot
      .getElementById("start-button")
      .addEventListener("click", () => {
        if (!this.timeron) {
          this.timeron = 1;
          this.timedCount();
          this.shadowRoot.getElementById("start-button").innerHTML = "Stop";
        } else {
          this.shadowRoot.getElementById("start-button").innerHTML = "Start";
          clearTimeout(this.timeoutID);
          this.timeron = 0;
        }
      });
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        clearTimeout(this.timeoutID);
        this.timeron = 0;
        this.count = 0;
        this.setTime();
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

    // Display recipe video if the recipe has a link
    if (recipe.metadata.video != undefined && recipe.metadata.video != "") {
      this.shadowRoot.getElementById("recipe-video").style.display = "block";
      this.shadowRoot.getElementById("recipe-video").src =
        recipe.metadata.video;
    }

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
  /**
   * help function for timer
   */
  timedCount() {
    this.setTime();
    this.count = this.count + 1;
    this.timeoutID = setTimeout(this.timedCount.bind(this), 1000);
  }

  /**
   * set timer
   */
  setTime() {
    let hour = parseInt(this.count / 3600);
    let minute = parseInt(this.count / 60);
    let second = parseInt(this.count % 60);
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    this.shadowRoot.getElementById("timer-display").innerText =
      hour + ":" + minute + ":" + second;
  }
}

customElements.define("recipe-details", RecipeDetails);
