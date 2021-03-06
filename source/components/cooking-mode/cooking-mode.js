import { Database } from "/core/database/database.js";
import { YummyRecipesComponent } from "/components/core/yummy-recipes-component.js";

class CookingMode extends YummyRecipesComponent {
  constructor() {
    super();
    this.htmlPath = "components/cooking-mode/cooking-mode.html";
    this.totalTime = -1;
  }

  // Timer variables
  count = 0;
  temp;
  timeron = false;

  // Steps array and counter
  recipeSteps = [];
  currentStep = 1;

  // Next and Back button visibility
  nextButtonVisible = "visible";
  backButtonVisible = "none";

  /**
   * Setup function for the hands free page.
   * Gets the recipe steps, image, and video and loads them on the page.
   *
   * @async
   */
  async setupElement() {
    this.shadowRoot.getElementById("timer-display").style.visibility = "hidden";
    // Grab recipe from database based on routing parameter
    const database = new Database();
    let recipes = await database.getRecipes();
    let recipe = recipes[this.routeParams[0]];

    // If recipe is undefined, go back to home page
    if (!recipe) {
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

    // Store recipe steps as instance variable
    this.recipeSteps = recipe.steps;

    this.shadowRoot.getElementById("direction-recipe-title").innerText =
      recipe.metadata.title;

    // Event handler for timer start button
    this.shadowRoot
      .getElementById("start-pause-button")
      .addEventListener("click", () => {
        if (!this.timeron) {
          const formElement = this.shadowRoot.querySelector("#time-input-form");
          const isFormValid = formElement.checkValidity();
          formElement.reportValidity();
          if (!isFormValid) {
            return;
          }
        }
        const hoursInput = Number(
          this.shadowRoot.getElementById("input-hours").value
        );
        const minutesInput = Number(
          this.shadowRoot.getElementById("input-minutes").value
        );
        const secondsInput = Number(
          this.shadowRoot.getElementById("input-seconds").value
        );
        // Check if user entered anything
        if (hoursInput <= 0 && minutesInput <= 0 && secondsInput <= 0) {
          return;
        }
        if (
          this.shadowRoot.getElementById("start-pause-button").innerText ===
          "Start"
        ) {
          this.startCount();
        } else {
          this.stopCount();
        }
      });

    // Event handler for timer reset button
    this.shadowRoot
      .getElementById("reset-button")
      .addEventListener("click", () => {
        this.resetCount();
        this.clearTimerInputs();
      });

    // Event handler for hands free next step button
    this.shadowRoot
      .getElementById("next-button")
      .addEventListener("click", () => {
        this.nextStep();
      });

    // Event handler for hands free prev step button
    this.shadowRoot
      .getElementById("back-button")
      .addEventListener("click", () => {
        this.backStep();
      });

    // Populate first step
    this.shadowRoot.getElementById("directions").innerText =
      this.recipeSteps[0];

    // Populate image and video (if included)
    this.shadowRoot.getElementById("direction-img").alt = recipe.metadata.title;
    if (recipe.metadata.image && recipe.metadata.image !== "") {
      this.shadowRoot.getElementById("direction-img").src =
        recipe.metadata.image;
      this.recipeSteps.push(recipe.metadata.image);
    } else {
      this.shadowRoot.getElementById("direction-img").src =
        "/static/common/defaultimg.jpeg";
      this.recipeSteps.push("/static/common/defaultimg.jpeg");
    }

    // Hide back button (since we're on the first step) and
    // hide next button if less than 2 steps
    this.hideBackButton();
    if (this.recipeSteps.length < 2) {
      this.hideNextButton();
    }

    // Add video embed to directions if video exists
    // Will not show by default (user must click "Switch to Video")
    if (recipe.metadata.video && recipe.metadata.video !== "") {
      const recipeVideoElement = document.createElement("iframe");
      recipeVideoElement.setAttribute("id", "recipe-video");
      recipeVideoElement.setAttribute("allowfullscreen", "true");
      recipeVideoElement.setAttribute("src", recipe.metadata.video);
      this.shadowRoot
        .getElementById("recipe-video-container")
        .appendChild(recipeVideoElement);

      // Display video button and add justify-content: space-between to
      // first row flex container for correct spacing
      this.shadowRoot.querySelector(".direction-title").style.justifyContent =
        "space-between";
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
  }

  /**
   * Function that activates when user hits start button on timer
   * Hides the time inputs and starts the timer
   *
   */
  startCount() {
    // Hide user inputs
    this.shadowRoot.getElementById("time-input-container").style.display =
      "none";
    this.shadowRoot.getElementById("timer-display").style.display = "flex";
    this.shadowRoot.getElementById("start-pause-button").innerText = "Pause";

    if (!this.timeron) {
      this.timeron = true;
      this.startTimer();
    }
  }

  /**
   * Stops the timer
   */
  stopCount() {
    this.shadowRoot.getElementById("start-pause-button").innerText = "Start";
    clearTimeout(this.temp);
    this.timeron = false;
  }

  /**
   * Resets the timer back to user input
   */
  resetCount() {
    this.stopCount();
    this.count = 0;
    this.totalTime = -1;
    // Show user inputs again
    this.shadowRoot.getElementById("time-input-container").style.display =
      "flex";
    // Hide timer
    this.shadowRoot.getElementById("timer-display").style.display = "none";
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
      const audio = new Audio("/static/cooking-mode/timer-done-noise.mp3");
      audio.play();
      // Clear interval
      this.stopCount();
      // Clear inputs
      this.clearTimerInputs();
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
    this.shadowRoot.getElementById("direction-written").style.display = "none";
    this.shadowRoot.getElementById("recipe-video-container").style.display =
      "block";

    // Store the states of next and back buttons
    this.nextButtonVisible =
      this.shadowRoot.getElementById("next-button").style.visibility;
    this.backButtonVisible =
      this.shadowRoot.getElementById("back-button").style.display;

    // Hide both next and back buttons
    this.hideNextButton();
    this.hideBackButton();
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
    this.shadowRoot.getElementById("direction-written").style.display = "block";
    this.shadowRoot.getElementById("recipe-video-container").style.display =
      "none";

    // Set next and back button to their previous states
    this.shadowRoot.getElementById("next-button").style.visibility =
      this.nextButtonVisible;
    this.shadowRoot.getElementById("back-button").style.display =
      this.backButtonVisible;
  }

  /**
   * Changes step on page to the next step.
   */
  nextStep() {
    if (++this.currentStep === this.recipeSteps.length) {
      this.shadowRoot.getElementById("direction-text").style.display = "none";
      this.shadowRoot.getElementById("direction-image").style.display = "block";
      this.hideNextButton();
    }
    this.showBackButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("directions").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  /**
   * Clears all user inputs
   * Runs after hitting start
   */
  clearTimerInputs() {
    this.shadowRoot.getElementById("input-hours").value = "";
    this.shadowRoot.getElementById("input-minutes").value = "";
    this.shadowRoot.getElementById("input-seconds").value = "";
  }

  /**
   * Changes step on page to the previous step.
   */
  backStep() {
    if (this.currentStep === this.recipeSteps.length) {
      this.shadowRoot.getElementById("direction-text").style.display = "block";
      this.shadowRoot.getElementById("direction-image").style.display = "none";
    }

    if (--this.currentStep === 1) {
      this.hideBackButton();
    }

    this.showNextButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("directions").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  /**
   * Displays the prev step button.
   */
  showBackButton() {
    this.shadowRoot.getElementById("back-button").style.display = "block";
  }

  /**
   * Hides the prev step button.
   */
  hideBackButton() {
    this.shadowRoot.getElementById("back-button").style.display = "none";
  }

  /**
   * Displays the next step button.
   */
  showNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "visible";
  }

  /**
   * Hides the next step button.
   */
  hideNextButton() {
    this.shadowRoot.getElementById("next-button").style.visibility = "hidden";
  }
}

customElements.define("cooking-mode", CookingMode);
