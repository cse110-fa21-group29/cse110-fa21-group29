import { Database } from "/core/database/database.js";
import { Storage } from "/core/storage/storage.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the recipe contribute page. */
class RecipeContribute extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-contribute/recipe-contribute.html";

    // Flag to determine if image was input in the form
    this.imageChanged = false;
  }

  /**
   * Sets up contribute page functionality depending on if creating or updating
   * recipe.
   *
   * @async
   */
  async setupElement() {
    // Set up page for adding recipe or editing recipe depending on route
    if (this.routeName === "recipe-contribute-add") {
      this.addRecipe();
    } else {
      this.editRecipe();
    }

    // Change event listener for file button
    this.shadowRoot
      .getElementById("submit-img")
      .addEventListener("change", (event) => {
        // Get selected file object
        const file = event.target.files[0];

        // Regex to check if valid image
        const validExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        // File was selected successfully and is valid image
        if (file != undefined && validExt.exec(file.name)) {
          // Preview image selected using button background
          const img = URL.createObjectURL(file);
          event.target.style.backgroundImage = "url(" + img + ")";

          // Image file was input into form so set flag to true
          this.imageChanged = true;
        } else {
          // Reset preview
          event.target.style.backgroundImage =
            "url('/static/common/defaultimg.jpeg')";

          // Set flag to false
          this.imageChanged = false;

          // If file was invalid instead of user hitting cancel
          if (file != undefined && !validExt.exec(file.name)) {
            alert("File must be .jpg, .jpeg, .png, or .gif");
          }
        }
      });

    /**
     * Video field handler to check if link is valid YouTube video or field
     * is empty. Regex from https://stackoverflow.com/a/9102270.
     */
    const videoUrlInput = this.shadowRoot.getElementById("input-video-url");

    videoUrlInput.addEventListener("input", () => {
      // Get form value
      const url = videoUrlInput.value;

      // If video field is blank then allow it and return
      if (url == "") {
        videoUrlInput.setCustomValidity("");
        return;
      }

      // Get regex
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      // If regex worked and video ID is 11 characters then link is valid
      if (match && match[2].length === 11) {
        videoUrlInput.setCustomValidity("");
      } else {
        videoUrlInput.setCustomValidity("Video link is not valid.");
      }
    });
  }

  /**
   * Sets up the page for adding a new recipe.
   *
   * @async
   */
  async addRecipe() {
    // Empty object that will get populated using form values
    const recipe = {
      metadata: {
        id: -1,
        title: "",
        author: "",
        image: "static/common/demorecipe.jpg",
        video: "",
      },
      info: {
        readyInMinutes: 0,
        pricePerServings: 0,
        weightWatcherSmartPoints: 0,
        healthScore: 100,
      },
      categories: {
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        highProtein: false,
        healthy: false,
      },
      nutrients: {
        totalServings: 0,
        calories: 0,
        protein: "",
        fat: "",
      },
      description: "",
      ingredients: [],
      steps: [],
      spoonacularSourceUrl: "",
    };

    // Assign saveRecipe function to submit button
    this.shadowRoot
      .querySelector("#submit-button")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // Display form validation
        const formElement = this.shadowRoot.querySelector("#contribute-form");
        const isFormValid = formElement.checkValidity();
        formElement.reportValidity();

        // Add recipe if form is valid
        if (isFormValid) {
          this.saveRecipe(recipe, true);
        }
      });

    // Add cancel button functionality
    this.shadowRoot
      .querySelector("#cancel-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm("Are you sure you want to cancel?")) {
          // Route to home page
          const routerEvent = new CustomEvent("router-navigate", {
            detail: {
              route: "home-page",
              params: [],
            },
            bubbles: true,
            composed: true,
          });

          document.dispatchEvent(routerEvent);
        }
      });
  }

  /**
   * Sets up the page for editing an existing recipe.
   *
   * @async
   */
  async editRecipe() {
    // Get recipe from database
    const db = new Database();
    const recipes = await db.getRecipes();
    const recipe = recipes[this.routeParams[0]];

    // Display current recipe image
    this.shadowRoot.getElementById("submit-img").style.backgroundImage =
      "url(" + recipe.metadata.image + ")";

    // Pre-populate form with nutrients
    this.shadowRoot.querySelector("#input-number-of-servings").value =
      recipe.nutrients.totalServings;
    this.shadowRoot.querySelector("#input-colories").value =
      recipe.nutrients.calories;
    this.shadowRoot.querySelector("#input-protein").value =
      recipe.nutrients.protein.slice(0, -1);
    this.shadowRoot.querySelector("#input-fat").value =
      recipe.nutrients.fat.slice(0, -1);

    // Pre-populate form with categories
    this.shadowRoot.querySelector("#input-vegan").checked =
      recipe.categories.vegan;
    this.shadowRoot.querySelector("#input-vegetarian").checked =
      recipe.categories.vegetarian;
    this.shadowRoot.querySelector("#input-gluten-free").checked =
      recipe.categories.glutenFree;
    this.shadowRoot.querySelector("#input-healthy").checked =
      recipe.categories.healthy;
    this.shadowRoot.querySelector("#input-high-protein").checked =
      recipe.categories.highProtein;

    // Pre-populate form with general information
    this.shadowRoot.querySelector("#input-recipe-title").value =
      recipe.metadata.title;
    this.shadowRoot.querySelector("#input-author").value =
      recipe.metadata.author;
    if (recipe.metadata.video != undefined) {
      this.shadowRoot.querySelector("#input-video-url").value =
        recipe.metadata.video;
    }
    this.shadowRoot.querySelector("#input-time").value =
      recipe.info.readyInMinutes;
    this.shadowRoot.querySelector("#input-cost").value =
      recipe.info.pricePerServings;

    // Pre-populate form with description
    this.shadowRoot.querySelector("#input-description").innerText =
      recipe.description;

    // Pre-populate form with ingredients
    const ingredients = recipe.ingredients.join("\n");
    this.shadowRoot.querySelector("#input-ingredient").innerHTML = ingredients;

    // Pre-populate form with directions
    const steps = recipe.steps.join("\n");
    this.shadowRoot.querySelector("#input-direction").innerHTML = steps;

    // Update edited recipe in database on submit button click
    this.shadowRoot
      .querySelector("#submit-button")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // Display form validation
        const formElement = this.shadowRoot.querySelector("#contribute-form");
        const isFormValid = formElement.checkValidity();
        formElement.reportValidity();

        // Update recipe if form is valid
        if (isFormValid) {
          this.saveRecipe(recipe, false);
        }
      });

    // Add cancel button functionality
    this.shadowRoot
      .querySelector("#cancel-button")
      .addEventListener("click", (event) => {
        event.preventDefault();
        if (confirm("Are you sure you want to cancel?")) {
          // Route to recipe details page
          const routerEvent = new CustomEvent("router-navigate", {
            detail: {
              route: "recipe-details",
              params: [this.routeParams[0]],
            },
            bubbles: true,
            composed: true,
          });

          document.dispatchEvent(routerEvent);
        }
      });
  }

  /**
   * Grabs form values, updates recipe object, then pushes object to database.
   * The add parameter should be true if you are adding a new recipe or false
   * if you are updating an existing recipe.
   *
   * @param {Object} recipe - an object that contains the recipe data
   * @param {boolean} add - toggles between creating and updating recipe
   */
  async saveRecipe(recipe, add) {
    // Image
    const storage = new Storage();
    let file = {};
    if (this.imageChanged) {
      file = this.shadowRoot.getElementById("submit-img").files[0];
    }

    // Nutrients
    recipe.nutrients.totalServings = this.shadowRoot.querySelector(
      "#input-number-of-servings"
    ).value;
    recipe.nutrients.calories =
      this.shadowRoot.querySelector("#input-colories").value;
    recipe.nutrients.protein =
      this.shadowRoot.querySelector("#input-protein").value + "g";
    recipe.nutrients.fat =
      this.shadowRoot.querySelector("#input-fat").value + "g";

    // Categories
    recipe.categories.vegan =
      this.shadowRoot.querySelector("#input-vegan").checked;
    recipe.categories.vegetarian =
      this.shadowRoot.querySelector("#input-vegetarian").checked;
    recipe.categories.glutenFree =
      this.shadowRoot.querySelector("#input-gluten-free").checked;
    recipe.categories.highProtein = this.shadowRoot.querySelector(
      "#input-high-protein"
    ).checked;
    recipe.categories.healthy =
      this.shadowRoot.querySelector("#input-healthy").checked;

    // Recipe General Information
    recipe.metadata.title = this.shadowRoot.querySelector(
      "#input-recipe-title"
    ).value;
    recipe.metadata.author =
      this.shadowRoot.querySelector("#input-author").value;
    recipe.metadata.video = this.getVideoEmbedURL(
      this.shadowRoot.querySelector("#input-video-url").value
    );
    recipe.info.readyInMinutes =
      this.shadowRoot.querySelector("#input-time").value;
    recipe.info.pricePerServings =
      this.shadowRoot.querySelector("#input-cost").value;

    // Description
    recipe.description =
      this.shadowRoot.querySelector("#input-description").value;

    // Ingredients
    const ingredients = this.shadowRoot
      .querySelector("#input-ingredient")
      .value.split("\n");
    recipe.ingredients = ingredients;

    // Directions
    const steps = this.shadowRoot
      .querySelector("#input-direction")
      .value.split("\n");
    recipe.steps = steps;

    // Call database functions based on if add or edit function is specified
    const db = new Database();

    if (add == true) {
      // Push recipe to database and grab index of the new recipe
      const index = await db.pushRecipe(recipe);

      // Upload recipe image if applicable
      if (this.imageChanged) {
        // Upload file named after index in database
        const imageUrl = await storage.uploadImage(file, index);

        // Set image url in recipe
        await db.writeData(imageUrl, index, "metadata/image");
      }

      // Route to new recipe page
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "recipe-details",
          params: [index],
        },
        bubbles: true,
        composed: true,
      });

      document.dispatchEvent(routerEvent);
    } else {
      // Get recipe index in database from route param
      const index = this.routeParams[0];

      // Push edited recipe to database
      await db.updateRecipe(recipe, index);

      // Upload recipe image if image updated
      if (this.imageChanged) {
        // Upload file named after index in database
        const imageUrl = await storage.uploadImage(file, index);

        // Set image url in recipe
        await db.writeData(imageUrl, index, "metadata/image");
      }

      // Route to edited recipe page
      const routerEvent = new CustomEvent("router-navigate", {
        detail: {
          route: "recipe-details",
          params: [index],
        },
        bubbles: true,
        composed: true,
      });

      document.dispatchEvent(routerEvent);
    }
  }

  /**
   * Converts a valid YouTube video link into a valid embed link.
   * Regex from https://stackoverflow.com/a/9102270.
   *
   * @param {string} url - A string that represents a YouTube video link.
   * @returns {string} Returns YouTube embed link or empty string if not a valid video URL.
   */
  getVideoEmbedURL(url) {
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return "https://www.youtube.com/embed/" + match[2];
    } else {
      return "";
    }
  }
}

customElements.define("recipe-contribute", RecipeContribute);
