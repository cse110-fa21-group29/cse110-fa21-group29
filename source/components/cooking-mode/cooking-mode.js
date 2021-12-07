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
    this.hideBackButton();

    // Populate first step
    this.shadowRoot.getElementById("direction").innerText = this.recipeSteps[0];

    // Populate image and video (if included)
    this.shadowRoot.getElementById("direction-img").alt = recipe.metadata.title;
    if (recipe.metadata.image !== undefined && recipe.metadata.image !== "") {
      this.shadowRoot.getElementById("direction-img").src =
        recipe.metadata.image;
    } else {
      this.shadowRoot.getElementById("direction-img").src =
        "/static/common/defaultimg.jpeg";
    }

    if (recipe.metadata.video !== undefined && recipe.metadata.video !== "") {
      this.shadowRoot.getElementById("direction-video").style.display = "block";
      this.shadowRoot.getElementById("direction-video").src =
        recipe.metadata.video;
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
   * Changes step on page to the next step.
   */
  nextStep() {
    if (++this.currentStep === this.recipeSteps.length) {
      this.hideNextButton();
    }
    this.showBackButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
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
    if (--this.currentStep === 1) {
      this.hideBackButton();
    }
    this.showNextButton();
    this.shadowRoot.getElementById("number").innerText = this.currentStep;
    this.shadowRoot.getElementById("direction").innerText =
      this.recipeSteps[this.currentStep - 1];
  }

  /**
   * Displays the prev step button.
   */
  showBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "visible";
  }

  /**
   * Hides the prev step button.
   */
  hideBackButton() {
    this.shadowRoot.getElementById("back-button").style.visibility = "hidden";
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
