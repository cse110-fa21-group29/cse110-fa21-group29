import { Database } from "/core/database/database.js";
import { Storage } from "/core/storage/storage.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

/** Class that provides functionality to the recipe details page. */
class RecipeDetails extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/recipe-details/recipe-details.html";
    this.totalTime = -1;
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
        if (this.shadowRoot.getElementById("timer").style.display === "") {
          this.shadowRoot.getElementById("timer").style.display = "flex";
        } else {
          this.shadowRoot.getElementById("timer").style.display = "";
        }
      });
    // Event handler for timer start button
    this.shadowRoot
      .getElementById("start-button")
      .addEventListener("click", () => {
        this.startCount();
      });

    // Event handler for t dimer pause button
    this.shadowRoot
      .getElementById("pause-button")
      .addEventListener("click", () => {
        this.stopCount();
      });

    // Event handler for timer reset button
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        this.resetCount();
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
    ).innerHTML = `by ${recipe.metadata.author}`;
    this.shadowRoot.querySelector(".article-link").href =
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
   * Function that activates when user hits start button on timer
   * Hides the time inputs and starts the timer
   *
   */
  startCount() {
    // Hide user inputs
    this.shadowRoot.getElementById("input-hours").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-minutes").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-seconds").style.visibility = "hidden";
    this.shadowRoot.getElementById("input-hours-label").style.visibility =
      "hidden";
    this.shadowRoot.getElementById("input-minutes-label").style.visibility =
      "hidden";
    this.shadowRoot.getElementById("input-seconds-label").style.visibility =
      "hidden";

    if (!this.timeron) {
      this.timeron = 1;
      this.startTimer();
    }
  }

  /**
   * Stops the timer
   */
  stopCount() {
    clearTimeout(this.temp);
    this.timeron = 0;
  }

  /**
   * Resets the timer back to user input
   */
  resetCount() {
    this.stopCount();
    this.count = 0;
    this.totalTime = -1;
    // Show user inputs again
    this.shadowRoot.getElementById("input-hours").style.visibility = "visible";
    this.shadowRoot.getElementById("input-minutes").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-seconds").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-hours-label").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-minutes-label").style.visibility =
      "visible";
    this.shadowRoot.getElementById("input-seconds-label").style.visibility =
      "visible";

    // Hide timer
    this.shadowRoot.getElementById("timer-display").style.visibility = "hidden";
  }

  /**
   * Display the initial starting time user inputted
   */
  startTimer() {
    if (this.totalTime === -1) {
      const hoursInput = Number(
        this.shadowRoot.getElementById("input-hours").value
      );
      const minutesInput = Number(
        this.shadowRoot.getElementById("input-minutes").value
      );
      const secondsInput = Number(
        this.shadowRoot.getElementById("input-seconds").value
      );
      if (hoursInput === 0 && minutesInput === 0 && secondsInput === 0) {
        this.shadowRoot.getElementById("timer-display").style.visibility =
          "visible";
        this.shadowRoot.getElementById("timer-display").innerText = "00:00:00";
        return;
      }
      this.totalTime = hoursInput * 3600 + minutesInput * 60 + secondsInput;
    }

    let timer = this.shadowRoot.getElementById("timer-display");
    timer.style.visibility = "visible";
    this.setTime();
    this.totalTime -= 1;
    this.temp = setInterval(() => this.updateTime(), 1000);
  }

  /**
   * Update timer text
   */
  setTime() {
    const timer = this.shadowRoot.getElementById("timer-display");
    const date = new Date(null);
    date.setSeconds(this.totalTime);
    timer.innerText = date.toISOString().substr(11, 8);
  }

  /**
   * Decrements the time by 1 every second
   * If timer reaches 0, play a sound and stop the interval
   */
  updateTime() {
    if (this.totalTime === 0) {
      // Play some sound
      const audio = new Audio("/static/hands-free/timer-done-noise.mp3");
      audio.play();
      // Clear interval
      clearInterval(this.temp);
    }

    this.setTime();
    this.totalTime -= 1;
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
    this.shadowRoot.getElementById("recipe-video").style.display = "block";
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
    this.shadowRoot.getElementById("recipe-video").style.display = "none";
  }
}

customElements.define("recipe-details", RecipeDetails);
